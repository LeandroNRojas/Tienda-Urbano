"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  MapPin,
  Calendar,
  ShoppingBag
} from "lucide-react"
import type { Pedido, Usuario } from "@/lib/mock-data"

interface PerfilClienteProps {
  usuario: Usuario | null
  pedidos: Pedido[]
}

export function PerfilCliente({ usuario, pedidos }: PerfilClienteProps) {
  // Filtrar pedidos del cliente (en demo mostramos todos como si fueran del cliente logueado)
  const misPedidos = pedidos

  const getEstadoIcon = (estado: Pedido["estado"]) => {
    switch (estado) {
      case "En preparación":
        return <Clock className="w-4 h-4" />
      case "En despacho":
        return <Truck className="w-4 h-4" />
      case "Entregado":
        return <CheckCircle className="w-4 h-4" />
    }
  }

  const getEstadoColor = (estado: Pedido["estado"]) => {
    switch (estado) {
      case "En preparación":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "En despacho":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Entregado":
        return "bg-green-100 text-green-800 border-green-300"
    }
  }

  const pedidosActivos = misPedidos.filter(p => p.estado !== "Entregado")
  const pedidosEntregados = misPedidos.filter(p => p.estado === "Entregado")

  const totalCompras = misPedidos.reduce((total, pedido) => total + pedido.total, 0);

  return (
    <div className="space-y-6">
      {/* Info del usuario */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Mi Perfil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{usuario?.nombre || "María González"}</h2>
              <p className="text-muted-foreground">{usuario?.email || "maria@email.com"}</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold">{misPedidos.length}</p>
              <p className="text-sm text-muted-foreground">Pedidos totales</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold">{pedidosActivos.length}</p>
              <p className="text-sm text-muted-foreground">En curso</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pedidos activos */}
      {pedidosActivos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Pedidos en Curso ({pedidosActivos.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pedidosActivos.map((pedido) => (
              <div key={pedido.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Pedido #{pedido.id}</span>
                    <Badge className={`gap-1 ${getEstadoColor(pedido.estado)}`}>
                      {getEstadoIcon(pedido.estado)}
                      {pedido.estado}
                    </Badge>
                  </div>
                  <span className="font-bold text-lg">${pedido.total.toLocaleString("es-CL")}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {pedido.fecha}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {pedido.direccion}
                  </span>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Productos:</p>
                  {pedido.productos.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <img 
                        src={item.producto.imagen || "/placeholder.svg"} 
                        alt={item.producto.nombre}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.producto.nombre}</p>
                        <p className="text-muted-foreground">Talla: {item.talla} | Cantidad: {item.cantidad}</p>
                      </div>
                      <span className="font-medium">
                        ${((item.producto.precioOferta || item.producto.precio) * item.cantidad).toLocaleString("es-CL")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Barra de progreso del estado */}
                <div className="pt-2">
                  <div className="flex justify-between mb-2">
                    <div className={`flex flex-col items-center ${pedido.estado === "En preparación" || pedido.estado === "En despacho" || pedido.estado === "Entregado" ? "text-primary" : "text-muted-foreground"}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${pedido.estado === "En preparación" || pedido.estado === "En despacho" || pedido.estado === "Entregado" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <span className="text-xs mt-1">Preparación</span>
                    </div>
                    <div className={`flex flex-col items-center ${pedido.estado === "En despacho" || pedido.estado === "Entregado" ? "text-primary" : "text-muted-foreground"}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${pedido.estado === "En despacho" || pedido.estado === "Entregado" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <Truck className="w-4 h-4" />
                      </div>
                      <span className="text-xs mt-1">Despacho</span>
                    </div>
                    <div className={`flex flex-col items-center ${pedido.estado === "Entregado" ? "text-primary" : "text-muted-foreground"}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${pedido.estado === "Entregado" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-xs mt-1">Entregado</span>
                    </div>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ 
                        width: pedido.estado === "En preparación" ? "33%" : 
                               pedido.estado === "En despacho" ? "66%" : "100%" 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Historial de compras */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Historial de Compras ({pedidosEntregados.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pedidosEntregados.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No tienes compras completadas aún
            </p>
          ) : (
            <div className="space-y-3">
              {pedidosEntregados.map((pedido) => (
                <div key={pedido.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Pedido #{pedido.id}</span>
                      <Badge className="gap-1 bg-green-100 text-green-800 border-green-300">
                        <CheckCircle className="w-3 h-3" />
                        Entregado
                      </Badge>
                    </div>
                    <span className="font-bold">${pedido.total.toLocaleString("es-CL")}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {pedido.fecha}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {pedido.productos.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1 text-sm">
                        <img 
                          src={item.producto.imagen || "/placeholder.svg"} 
                          alt={item.producto.nombre}
                          className="w-6 h-6 object-cover rounded-full"
                        />
                        <span>{item.producto.nombre} x{item.cantidad}</span>
                      </div>
                    ))}
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
