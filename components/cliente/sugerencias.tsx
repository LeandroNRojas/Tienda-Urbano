"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ShoppingCart } from "lucide-react"
import type { Producto, ItemCarrito } from "@/lib/mock-data"

interface SugerenciasProps {
  productos: Producto[]
  historialCarrito: ItemCarrito[]
  agregarAlCarrito: (item: ItemCarrito) => void
}

export function Sugerencias({ productos, historialCarrito, agregarAlCarrito }: SugerenciasProps) {
  // HU: Sugerencias para ti - Algoritmo simple basado en categorías del historial
  const categoriasCompradas = [...new Set(historialCarrito.map(item => item.producto.categoria))]
  
  let sugeridos: Producto[] = []
  
  if (categoriasCompradas.length > 0) {
    // Sugiere productos de categorías similares que no estén en el carrito
    const idsEnCarrito = historialCarrito.map(item => item.producto.id)
    sugeridos = productos
      .filter(p => categoriasCompradas.includes(p.categoria) && !idsEnCarrito.includes(p.id))
      .slice(0, 4)
  }
  
  // Si no hay suficientes, agrega productos populares (con oferta o stock alto)
  if (sugeridos.length < 4) {
    const populares = productos
      .filter(p => !sugeridos.some(s => s.id === p.id))
      .sort((a, b) => (b.enOferta ? 1 : 0) - (a.enOferta ? 1 : 0) || b.stock - a.stock)
      .slice(0, 4 - sugeridos.length)
    sugeridos = [...sugeridos, ...populares]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Sugerencias para Ti
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {categoriasCompradas.length > 0 
            ? "Basado en tus productos seleccionados" 
            : "Productos destacados que te pueden interesar"}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sugeridos.map(producto => (
            <div key={producto.id} className="border rounded-lg p-3 space-y-2">
              <img
                src={producto.imagen || "/placeholder.svg"}
                alt={producto.nombre}
                className="w-full h-24 object-cover rounded"
              />
              <div>
                <p className="text-sm font-medium truncate">{producto.nombre}</p>
                <p className="text-xs text-muted-foreground">{producto.categoria}</p>
                {producto.enOferta ? (
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-rose-600 text-sm">
                      ${producto.precioOferta?.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      ${producto.precio.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <span className="font-bold text-sm">${producto.precio.toLocaleString()}</span>
                )}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs bg-transparent"
                onClick={() => agregarAlCarrito({
                  producto,
                  cantidad: 1,
                  talla: producto.tallas[0]
                })}
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Agregar
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
