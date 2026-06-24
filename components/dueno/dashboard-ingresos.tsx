"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, ShoppingBag, Package, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { Pedido } from "@/lib/mock-data"
import { ventasMensuales } from "@/lib/mock-data"

interface DashboardIngresosProps {
  pedidos: Pedido[]
}

export function DashboardIngresos({ pedidos }: DashboardIngresosProps) {
  // Calcular métricas
  const ingresosTotales = pedidos.reduce((acc, p) => acc + p.total, 0)
  const pedidosEntregados = pedidos.filter(p => p.estado === "Entregado").length
  const pedidosPendientes = pedidos.filter(p => p.estado !== "Entregado").length
  const ticketPromedio = pedidos.length > 0 ? Math.round(ingresosTotales / pedidos.length) : 0

  // Comparación con mes anterior (simulado)
  const cambioIngresos = 12.5 // porcentaje positivo
  const cambioPedidos = -3.2 // porcentaje negativo

  return (
    <div className="space-y-6">
      {/* KPIs principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ingresos Totales</p>
                <p className="text-2xl font-bold">${ingresosTotales.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+{cambioIngresos}%</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pedidos</p>
                <p className="text-2xl font-bold">{pedidos.length}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowDownRight className="w-3 h-3 text-red-600" />
                  <span className="text-xs text-red-600">{cambioPedidos}%</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ticket Promedio</p>
                <p className="text-2xl font-bold">${ticketPromedio.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold">{pedidosPendientes}</p>
                <p className="text-xs text-muted-foreground">{pedidosEntregados} entregados</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <Package className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* HU: Gráfico simple de ingresos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Ingresos Mensuales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ventasMensuales}>
                <XAxis 
                  dataKey="mes" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Ingresos']}
                  contentStyle={{ 
                    backgroundColor: 'var(--background)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="ingresos" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de estados */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Pedidos por Estado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full" />
                <span>En preparación</span>
              </div>
              <Badge className="bg-amber-100 text-amber-800">
                {pedidos.filter(p => p.estado === "En preparación").length} pedidos
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span>En despacho</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                {pedidos.filter(p => p.estado === "En despacho").length} pedidos
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>Entregados</span>
              </div>
              <Badge className="bg-green-100 text-green-800">
                {pedidos.filter(p => p.estado === "Entregado").length} pedidos
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
