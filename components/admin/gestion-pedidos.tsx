"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, User, MapPin } from "lucide-react"
import type { Pedido } from "@/lib/mock-data"

interface GestionPedidosProps {
  pedidos: Pedido[]
  actualizarEstado: (id: number, estado: Pedido["estado"]) => void
}

export function GestionPedidos({ pedidos, actualizarEstado }: GestionPedidosProps) {
  const estados: Pedido["estado"][] = ["En preparación", "En despacho", "Entregado"]

  const getEstadoColor = (estado: Pedido["estado"]) => {
    switch (estado) {
      case "En preparación": return "bg-amber-100 text-amber-800"
      case "En despacho": return "bg-blue-100 text-blue-800"
      case "Entregado": return "bg-green-100 text-green-800"
    }
  }

  const contarPorEstado = (estado: Pedido["estado"]) => 
    pedidos.filter(p => p.estado === estado).length

  return (
    <div className="space-y-6">
      {/* Resumen de estados */}
      <div className="grid grid-cols-3 gap-4">
        {estados.map(estado => (
          <Card key={estado} className="text-center">
            <CardContent className="p-4">
              <Badge className={`${getEstadoColor(estado)} mb-2`}>{estado}</Badge>
              <p className="text-2xl font-bold">{contarPorEstado(estado)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* HU: Selector para cambiar estado de pedidos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Gestión de Estados de Pedidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pedidos.map(pedido => (
              <div key={pedido.id} className="border rounded-lg p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">#{pedido.id}</span>
                      <Badge variant="outline">{pedido.fecha}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{pedido.cliente}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{pedido.direccion}</span>
                    </div>
                    <p className="font-medium">Total: ${pedido.total.toLocaleString()}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="text-sm font-medium">Cambiar estado:</p>
                    <Select
                      value={pedido.estado}
                      onValueChange={(value) => actualizarEstado(pedido.id, value as Pedido["estado"])}
                    >
                      <SelectTrigger className="w-44">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {estados.map(estado => (
                          <SelectItem key={estado} value={estado}>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                estado === "En preparación" ? "bg-amber-500" :
                                estado === "En despacho" ? "bg-blue-500" : "bg-green-500"
                              }`} />
                              {estado}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Productos:</p>
                  <div className="flex flex-wrap gap-2">
                    {pedido.productos.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {item.producto.nombre} ({item.talla}) x{item.cantidad}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
