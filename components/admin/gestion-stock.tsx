"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Package, Pencil, AlertTriangle, Plus, Trash2 } from "lucide-react"
import type { Producto } from "@/lib/mock-data"
import { categorias } from "@/lib/mock-data"

interface GestionStockProps {
  productos: Producto[]
  actualizarProducto: (producto: Producto) => void
  agregarProducto: (producto: Producto) => void
  eliminarProducto: (id: number) => void
}

export function GestionStock({ productos, actualizarProducto, agregarProducto, eliminarProducto }: GestionStockProps) {
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [esNuevo, setEsNuevo] = useState(false)

  const productosStockBajo = productos.filter(p => p.stock < 10)

  const abrirEditar = (producto: Producto) => {
    setProductoEditando({ ...producto })
    setEsNuevo(false)
    setMostrarModal(true)
  }

  const abrirNuevo = () => {
    setProductoEditando({
      id: Math.max(...productos.map(p => p.id)) + 1,
      nombre: "",
      categoria: "Blusas",
      precio: 0,
      stock: 0,
      imagen: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=300&h=300&fit=crop",
      tallas: ["S", "M", "L"],
      enOferta: false,
      descripcion: ""
    })
    setEsNuevo(true)
    setMostrarModal(true)
  }

  const guardarCambios = () => {
    if (productoEditando) {
      if (esNuevo) {
        agregarProducto(productoEditando)
      } else {
        actualizarProducto(productoEditando)
      }
      setMostrarModal(false)
      setProductoEditando(null)
    }
  }

  const handleEliminar = (id: number) => {
    if (confirm("¿Estás segura de eliminar este producto?")) {
      eliminarProducto(id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Alertas de stock bajo */}
      {productosStockBajo.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-700 flex items-center gap-2 text-base">
              <AlertTriangle className="w-5 h-5" />
              Alertas de Stock Bajo ({productosStockBajo.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {productosStockBajo.map(p => (
                <Badge key={p.id} variant="outline" className="bg-background">
                  {p.nombre}: {p.stock} unidades
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Panel de productos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Gestión de Productos
          </CardTitle>
          <Button onClick={abrirNuevo} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Agregar Producto
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Producto</th>
                  <th className="text-left py-3 px-2">Categoría</th>
                  <th className="text-right py-3 px-2">Precio</th>
                  <th className="text-center py-3 px-2">Oferta</th>
                  <th className="text-center py-3 px-2">Stock</th>
                  <th className="text-center py-3 px-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(producto => (
                  <tr key={producto.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={producto.imagen || "/placeholder.svg"}
                          alt={producto.nombre}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <span className="font-medium">{producto.nombre}</span>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {producto.descripcion}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant="outline">{producto.categoria}</Badge>
                    </td>
                    <td className="py-3 px-2 text-right">
                      {producto.enOferta && producto.precioOferta ? (
                        <div>
                          <span className="line-through text-muted-foreground text-xs">
                            ${producto.precio.toLocaleString("es-CL")}
                          </span>
                          <br />
                          <span className="text-green-600 font-medium">
                            ${producto.precioOferta.toLocaleString("es-CL")}
                          </span>
                        </div>
                      ) : (
                        <span>${producto.precio.toLocaleString("es-CL")}</span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center">
                      {producto.enOferta ? (
                        <Badge className="bg-green-100 text-green-700">Sí</Badge>
                      ) : (
                        <Badge variant="secondary">No</Badge>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Badge variant={producto.stock < 10 ? "destructive" : "secondary"}>
                        {producto.stock}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex justify-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => abrirEditar(producto)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => handleEliminar(producto.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de edición */}
      <Dialog open={mostrarModal} onOpenChange={setMostrarModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {esNuevo ? "Agregar Producto" : "Editar Producto"}
            </DialogTitle>
          </DialogHeader>
          
          {productoEditando && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre del Producto</Label>
                <Input
                  id="nombre"
                  value={productoEditando.nombre}
                  onChange={(e) => setProductoEditando({
                    ...productoEditando,
                    nombre: e.target.value
                  })}
                  placeholder="Ej: Blusa Floral Primavera"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Input
                  id="descripcion"
                  value={productoEditando.descripcion}
                  onChange={(e) => setProductoEditando({
                    ...productoEditando,
                    descripcion: e.target.value
                  })}
                  placeholder="Breve descripción del producto"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select
                    value={productoEditando.categoria}
                    onValueChange={(value) => setProductoEditando({
                      ...productoEditando,
                      categoria: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.filter(c => c !== "Todas").map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={productoEditando.stock}
                    onChange={(e) => setProductoEditando({
                      ...productoEditando,
                      stock: parseInt(e.target.value) || 0
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="precio">Precio Normal ($)</Label>
                  <Input
                    id="precio"
                    type="number"
                    min="0"
                    value={productoEditando.precio}
                    onChange={(e) => setProductoEditando({
                      ...productoEditando,
                      precio: parseInt(e.target.value) || 0
                    })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="precioOferta">Precio Oferta ($)</Label>
                  <Input
                    id="precioOferta"
                    type="number"
                    min="0"
                    value={productoEditando.precioOferta || ""}
                    onChange={(e) => setProductoEditando({
                      ...productoEditando,
                      precioOferta: parseInt(e.target.value) || undefined
                    })}
                    disabled={!productoEditando.enOferta}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    id="enOferta"
                    checked={productoEditando.enOferta}
                    onCheckedChange={(checked) => setProductoEditando({
                      ...productoEditando,
                      enOferta: checked
                    })}
                  />
                  <Label htmlFor="enOferta">Producto en Oferta</Label>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="imagen">URL de Imagen</Label>
                <Input
                  id="imagen"
                  value={productoEditando.imagen}
                  onChange={(e) => setProductoEditando({
                    ...productoEditando,
                    imagen: e.target.value
                  })}
                  placeholder="https://..."
                />
                {productoEditando.imagen && (
                  <img 
                    src={productoEditando.imagen || "/placeholder.svg"} 
                    alt="Preview" 
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tallas">Tallas (separadas por coma)</Label>
                <Input
                  id="tallas"
                  value={productoEditando.tallas.join(", ")}
                  onChange={(e) => setProductoEditando({
                    ...productoEditando,
                    tallas: e.target.value.split(",").map(t => t.trim()).filter(t => t)
                  })}
                  placeholder="XS, S, M, L, XL"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setMostrarModal(false)}>
              Cancelar
            </Button>
            <Button onClick={guardarCambios}>
              {esNuevo ? "Agregar" : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
