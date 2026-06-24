"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search, Tag } from "lucide-react"
import type { Producto, ItemCarrito } from "@/lib/mock-data"
import { categorias } from "@/lib/mock-data"

interface CatalogoProps {
  productos: Producto[]
  agregarAlCarrito: (item: ItemCarrito) => void
}

export function Catalogo({ productos, agregarAlCarrito }: CatalogoProps) {
  const [busqueda, setBusqueda] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas")
  const [ordenPrecio, setOrdenPrecio] = useState("ninguno")
  const [soloOfertas, setSoloOfertas] = useState(false)
  const [tallasSeleccionadas, setTallasSeleccionadas] = useState<Record<number, string>>({})

  // HU: Buscador con filtros
  const productosFiltrados = productos
    .filter(p => {
      const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      const coincideCategoria = categoriaFiltro === "Todas" || p.categoria === categoriaFiltro
      const coincideOferta = !soloOfertas || p.enOferta
      return coincideBusqueda && coincideCategoria && coincideOferta
    })
    .sort((a, b) => {
      if (ordenPrecio === "menor") return (a.precioOferta || a.precio) - (b.precioOferta || b.precio)
      if (ordenPrecio === "mayor") return (b.precioOferta || b.precio) - (a.precioOferta || a.precio)
      return 0
    })

  // HU: Ofertas destacadas
  const ofertas = productos.filter(p => p.enOferta)

  const handleAgregar = (producto: Producto) => {
    const talla = tallasSeleccionadas[producto.id] || producto.tallas[0]
    agregarAlCarrito({ producto, cantidad: 1, talla })
  }

  return (
    <div className="space-y-6">
      {/* HU: Ofertas Destacadas */}
      {ofertas.length > 0 && (
        <div className="bg-gradient-to-r from-rose-50 to-orange-50 p-4 rounded-lg border border-rose-200">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-rose-700">
            <Tag className="w-5 h-5" />
            Ofertas Destacadas
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {ofertas.map(p => (
              <div key={p.id} className="flex-shrink-0 bg-background p-3 rounded-lg border shadow-sm w-48">
                <img src={p.imagen || "/placeholder.svg"} alt={p.nombre} className="w-full h-24 object-cover rounded mb-2" />
                <p className="text-sm font-medium truncate">{p.nombre}</p>
                <div className="flex items-center gap-2">
                  <span className="text-rose-600 font-bold">${p.precioOferta?.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground line-through">${p.precio.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HU: Buscador con Filtros */}
      <div className="bg-muted/50 p-4 rounded-lg space-y-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Buscador con Filtros</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
            <SelectTrigger>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              {categorias.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={ordenPrecio} onValueChange={setOrdenPrecio}>
            <SelectTrigger>
              <SelectValue placeholder="Ordenar precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ninguno">Sin ordenar</SelectItem>
              <SelectItem value="menor">Menor precio</SelectItem>
              <SelectItem value="mayor">Mayor precio</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={soloOfertas ? "default" : "outline"}
            onClick={() => setSoloOfertas(!soloOfertas)}
            className="w-full"
          >
            {soloOfertas ? "Ver Todo" : "Solo Ofertas"}
          </Button>
        </div>
      </div>

      {/* HU: Catálogo de Ropa */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Catálogo ({productosFiltrados.length} productos)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productosFiltrados.map(producto => (
            <Card key={producto.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={producto.imagen || "/placeholder.svg"}
                  alt={producto.nombre}
                  className="w-full h-40 object-cover"
                />
                {producto.enOferta && (
                  <Badge className="absolute top-2 right-2 bg-rose-500">Oferta</Badge>
                )}
                {producto.stock < 5 && (
                  <Badge variant="secondary" className="absolute top-2 left-2">Últimas unidades</Badge>
                )}
              </div>
              <CardContent className="p-3">
                <h4 className="font-medium text-sm truncate">{producto.nombre}</h4>
                <p className="text-xs text-muted-foreground">{producto.categoria}</p>
                <div className="mt-1">
                  {producto.enOferta ? (
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-rose-600">${producto.precioOferta?.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground line-through">${producto.precio.toLocaleString()}</span>
                    </div>
                  ) : (
                    <span className="font-bold">${producto.precio.toLocaleString()}</span>
                  )}
                </div>
                <Select
                  value={tallasSeleccionadas[producto.id] || producto.tallas[0]}
                  onValueChange={(val) => setTallasSeleccionadas(prev => ({ ...prev, [producto.id]: val }))}
                >
                  <SelectTrigger className="mt-2 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {producto.tallas.map(talla => (
                      <SelectItem key={talla} value={talla}>{talla}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
              <CardFooter className="p-3 pt-0">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => handleAgregar(producto)}
                  disabled={producto.stock === 0}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Agregar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
