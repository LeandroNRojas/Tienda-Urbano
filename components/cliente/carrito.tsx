"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, Minus, CreditCard, CheckCircle, FileText } from "lucide-react"
import type { ItemCarrito, Pedido } from "@/lib/mock-data"
import { jsPDF } from "jspdf"

interface CarritoProps {
  items: ItemCarrito[]
  actualizarCantidad: (index: number, cantidad: number) => void
  eliminarItem: (index: number) => void
  vaciarCarrito: () => void
  agregarPedido: (pedido: Pedido) => void
}

export function Carrito({ items, actualizarCantidad, eliminarItem, vaciarCarrito, agregarPedido }: CarritoProps) {
  const [paso, setPaso] = useState<"carrito" | "pago" | "confirmacion">("carrito")
  const [datosCliente, setDatosCliente] = useState({
    nombre: "",
    direccion: "",
    email: ""
  })
  const [ultimoPedido, setUltimoPedido] = useState<Pedido | null>(null)

  const subtotal = items.reduce((acc, item) => {
    const precio = item.producto.precioOferta || item.producto.precio
    return acc + precio * item.cantidad
  }, 0)

  const envio = subtotal > 50000 ? 0 : 3990
  const total = subtotal + envio

  // HU: Simulación Pago Webpay
  const procesarPago = () => {
    const nuevoPedido: Pedido = {
      id: Math.floor(Math.random() * 9000) + 1000,
      cliente: datosCliente.nombre,
      productos: [...items],
      total: total,
      estado: "En preparación",
      fecha: new Date().toISOString().split('T')[0],
      direccion: datosCliente.direccion
    }
    setUltimoPedido(nuevoPedido)
    agregarPedido(nuevoPedido)
    setPaso("confirmacion")
    vaciarCarrito()
  }

  // HU: Generar Boleta PDF
  const generarBoleta = () => {
    if (!ultimoPedido) return

    const doc = new jsPDF()
    
    // Encabezado
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("TIENDA URBANO", 105, 20, { align: "center" })
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text("Boleta Electrónica", 105, 28, { align: "center" })
    
    // Línea separadora
    doc.line(20, 35, 190, 35)
    
    // Datos del pedido
    doc.setFontSize(10)
    doc.text(`N° Pedido: ${ultimoPedido.id}`, 20, 45)
    doc.text(`Fecha: ${ultimoPedido.fecha}`, 20, 52)
    doc.text(`Cliente: ${ultimoPedido.cliente}`, 20, 59)
    doc.text(`Dirección: ${ultimoPedido.direccion}`, 20, 66)
    
    // Encabezado tabla
    doc.line(20, 75, 190, 75)
    doc.setFont("helvetica", "bold")
    doc.text("Producto", 20, 82)
    doc.text("Talla", 100, 82)
    doc.text("Cant.", 125, 82)
    doc.text("Precio", 150, 82)
    doc.text("Total", 175, 82)
    doc.line(20, 85, 190, 85)
    
    // Productos
    doc.setFont("helvetica", "normal")
    let y = 92
    for (const item of ultimoPedido.productos) {
      const precio = item.producto.precioOferta || item.producto.precio
      const totalItem = precio * item.cantidad
      
      doc.text(item.producto.nombre.substring(0, 25), 20, y)
      doc.text(item.talla, 100, y)
      doc.text(item.cantidad.toString(), 125, y)
      doc.text(`$${precio.toLocaleString()}`, 150, y)
      doc.text(`$${totalItem.toLocaleString()}`, 175, y)
      y += 8
    }
    
    // Totales
    doc.line(20, y + 2, 190, y + 2)
    y += 12
    doc.text(`Subtotal: $${(ultimoPedido.total - (ultimoPedido.total > 50000 ? 0 : 3990)).toLocaleString()}`, 140, y)
    y += 7
    doc.text(`Envío: ${ultimoPedido.total > 50000 ? "GRATIS" : "$3.990"}`, 140, y)
    y += 7
    doc.setFont("helvetica", "bold")
    doc.text(`TOTAL: $${ultimoPedido.total.toLocaleString()}`, 140, y)
    
    // Pie de página
    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.text("Gracias por su compra en Tienda Urbano", 105, 280, { align: "center" })
    doc.text("Este documento es una boleta electrónica válida", 105, 285, { align: "center" })
    
    doc.save(`boleta_${ultimoPedido.id}.pdf`)
  }

  if (items.length === 0 && paso === "carrito") {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground mb-4">Tu carrito está vacío</div>
          <p className="text-sm text-muted-foreground">Agrega productos desde el catálogo</p>
        </CardContent>
      </Card>
    )
  }

  // HU: Confirmación de compra
  if (paso === "confirmacion" && ultimoPedido) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2" />
          <CardTitle className="text-green-700">¡Compra Exitosa!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">N° de Pedido</p>
            <p className="text-2xl font-bold">{ultimoPedido.id}</p>
          </div>
          <div className="text-sm space-y-1">
            <p><strong>Total pagado:</strong> ${ultimoPedido.total.toLocaleString()}</p>
            <p><strong>Dirección de envío:</strong> {ultimoPedido.direccion}</p>
            <p><strong>Estado:</strong> {ultimoPedido.estado}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={generarBoleta} className="w-full">
            <FileText className="w-4 h-4 mr-2" />
            Descargar Boleta PDF
          </Button>
          <Button variant="outline" onClick={() => setPaso("carrito")} className="w-full">
            Seguir Comprando
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // HU: Simulación Webpay
  if (paso === "pago") {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Pago Webpay (Simulación)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Simulación de pasarela de pago</p>
            <p className="text-xs text-blue-600 mt-1">En producción, aquí se redirigiría a Webpay</p>
          </div>
          <div className="space-y-3">
            <div>
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                value={datosCliente.nombre}
                onChange={(e) => setDatosCliente(prev => ({ ...prev, nombre: e.target.value }))}
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={datosCliente.email}
                onChange={(e) => setDatosCliente(prev => ({ ...prev, email: e.target.value }))}
                placeholder="juan@email.com"
              />
            </div>
            <div>
              <Label htmlFor="direccion">Dirección de envío</Label>
              <Input
                id="direccion"
                value={datosCliente.direccion}
                onChange={(e) => setDatosCliente(prev => ({ ...prev, direccion: e.target.value }))}
                placeholder="Av. Principal 123, Santiago"
              />
            </div>
            <div className="border rounded-lg p-3 bg-muted/50">
              <Label>Tarjeta de crédito (demo)</Label>
              <Input placeholder="4111 1111 1111 1111" className="mt-1" disabled />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Input placeholder="MM/AA" disabled />
                <Input placeholder="CVV" disabled />
              </div>
            </div>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total a pagar:</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" onClick={() => setPaso("carrito")} className="flex-1">
            Volver
          </Button>
          <Button
            onClick={procesarPago}
            className="flex-1 bg-green-600 hover:bg-green-700"
            disabled={!datosCliente.nombre || !datosCliente.direccion || !datosCliente.email}
          >
            Pagar ${total.toLocaleString()}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // HU: Carrito de Compras
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Carrito de Compras ({items.length} productos)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={`${item.producto.id}-${item.talla}`} className="flex gap-3 p-3 border rounded-lg">
            <img
              src={item.producto.imagen || "/placeholder.svg"}
              alt={item.producto.nombre}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium text-sm">{item.producto.nombre}</h4>
              <p className="text-xs text-muted-foreground">Talla: {item.talla}</p>
              <p className="font-bold text-sm">
                ${(item.producto.precioOferta || item.producto.precio).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col items-end justify-between">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-destructive"
                onClick={() => eliminarItem(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 bg-transparent"
                  onClick={() => actualizarCantidad(index, item.cantidad - 1)}
                  disabled={item.cantidad <= 1}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-6 text-center text-sm">{item.cantidad}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 bg-transparent"
                  onClick={() => actualizarCantidad(index, item.cantidad + 1)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Envío:</span>
            <span>{envio === 0 ? "GRATIS" : `$${envio.toLocaleString()}`}</span>
          </div>
          {subtotal < 50000 && (
            <p className="text-xs text-muted-foreground">Envío gratis en compras sobre $50.000</p>
          )}
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setPaso("pago")} className="w-full" size="lg">
          <CreditCard className="w-4 h-4 mr-2" />
          Proceder al Pago
        </Button>
      </CardFooter>
    </Card>
  )
}
