"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Package, MapPin, Calendar } from "lucide-react"
import type { Pedido } from "@/lib/mock-data"

interface ListaDespachoProps {
  pedidos: Pedido[]
}

export function ListaDespacho({ pedidos }: ListaDespachoProps) {
  // HU: Lista de despacho diaria - filtrar pedidos del día que necesitan despacho
  const hoy = new Date().toISOString().split('T')[0]
  
  const pedidosHoy = pedidos.filter(p => 
    p.estado === "En preparación" || p.estado === "En despacho"
  )

  const enPreparacion = pedidosHoy.filter(p => p.estado === "En preparación")
  const enDespacho = pedidosHoy.filter(p => p.estado === "En despacho")

  const getEstadoColor = (estado: Pedido["estado"]) => {
    switch (estado) {
      case "En preparación": return "bg-amber-100 text-amber-800 border-amber-300"
      case "En despacho": return "bg-blue-100 text-blue-800 border-blue-300"
      case "Entregado": return "bg-green-100 text-green-800 border-green-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Package className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{enPreparacion.length}</p>
              <p className="text-sm text-muted-foreground">En preparación</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{enDespacho.length}</p>
              <p className="text-sm text-muted-foreground">En despacho</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <Calendar className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-bold">{hoy}</p>
              <p className="text-sm text-muted-foreground">Fecha actual</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Despacho */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Lista de Despacho Diaria
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pedidosHoy.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay pedidos pendientes de despacho
            </div>
          ) : (
            <div className="space-y-4">
              {pedidosHoy.map(pedido => (
                <div key={pedido.id} className="border rounded-lg p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">Pedido #{pedido.id}</span>
                        <Badge className={getEstadoColor(pedido.estado)}>
                          {pedido.estado}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{pedido.cliente}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${pedido.total.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{pedido.fecha}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{pedido.direccion}</span>
                  </div>

                  <div className="bg-muted/50 rounded p-2">
                    <p className="text-xs font-medium mb-1">Productos:</p>
                    <ul className="text-xs space-y-1">
                      {pedido.productos.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{item.producto.nombre} (Talla: {item.talla})</span>
                          <span>x{item.cantidad}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
