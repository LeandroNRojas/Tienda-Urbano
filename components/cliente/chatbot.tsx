"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, MessageCircle, HelpCircle, Package } from "lucide-react"
import type { Pedido } from "@/lib/mock-data"

interface ChatMessage {
  id: string
  type: "usuario" | "bot"
  mensaje: string
  timestamp: Date
}

interface ChatbotProps {
  pedidos: Pedido[]
}

export function Chatbot({ pedidos }: ChatbotProps) {
  const [mensajes, setMensajes] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      mensaje: "¡Hola! Bienvenido al soporte de Tienda Urbano. ¿Cómo puedo ayudarte hoy?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [busquedaPedido, setBusquedaPedido] = useState("")
  const [pedidoEncontrado, setPedidoEncontrado] = useState<Pedido | null>(null)

  const preguntasFrecuentes = [
    {
      pregunta: "¿Cuál es el tiempo de entrega?",
      respuesta: "Nuestros tiempos de entrega son de 3-5 días hábiles para la región metropolitana.",
    },
    {
      pregunta: "¿Puedo devolver un producto?",
      respuesta: "Sí, aceptamos devoluciones dentro de 14 días de la compra en perfecto estado.",
    },
    {
      pregunta: "¿Qué métodos de pago aceptan?",
      respuesta: "Aceptamos tarjetas de crédito, débito y transferencia bancaria.",
    },
    {
      pregunta: "¿Hay descuentos para compras al por mayor?",
      respuesta: "Sí, contáctanos para consultar nuestros precios especiales para compras en volumen.",
    },
    {
      pregunta: "¿Cómo cambio mi contraseña?",
      respuesta: "Ve a tu perfil, haz clic en 'Seguridad' y selecciona 'Cambiar contraseña'.",
    },
    {
      pregunta: "¿Cuál es tu horario de atención?",
      respuesta: "Estamos disponibles de lunes a viernes de 9:00 a 18:00 horas.",
    },
  ]

  const enviarMensaje = () => {
    if (!input.trim()) return

    // Agregar mensaje del usuario
    const nuevoMensaje: ChatMessage = {
      id: Date.now().toString(),
      type: "usuario",
      mensaje: input,
      timestamp: new Date(),
    }

    setMensajes((prev) => [...prev, nuevoMensaje])

    // Simular respuesta del bot
    setTimeout(() => {
      let respuesta = ""

      const inputLower = input.toLowerCase()

      if (
        inputLower.includes("entrega") ||
        inputLower.includes("tiempo") ||
        inputLower.includes("cuánto tarda")
      ) {
        respuesta = preguntasFrecuentes[0].respuesta
      } else if (
        inputLower.includes("devolver") ||
        inputLower.includes("devolución") ||
        inputLower.includes("cambio")
      ) {
        respuesta = preguntasFrecuentes[1].respuesta
      } else if (
        inputLower.includes("pago") ||
        inputLower.includes("método") ||
        inputLower.includes("tarjeta")
      ) {
        respuesta = preguntasFrecuentes[2].respuesta
      } else if (
        inputLower.includes("descuento") ||
        inputLower.includes("mayor")
      ) {
        respuesta = preguntasFrecuentes[3].respuesta
      } else if (
        inputLower.includes("contraseña") ||
        inputLower.includes("seguridad")
      ) {
        respuesta = preguntasFrecuentes[4].respuesta
      } else if (
        inputLower.includes("horario") ||
        inputLower.includes("atención") ||
        inputLower.includes("disponible")
      ) {
        respuesta = preguntasFrecuentes[5].respuesta
      } else {
        respuesta =
          "Entiendo tu pregunta. Por el momento, puedo ayudarte con preguntas frecuentes o consultar el estado de tu pedido. ¿Hay algo específico en lo que pueda asistirte?"
      }

      const respuestaBot: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        mensaje: respuesta,
        timestamp: new Date(),
      }

      setMensajes((prev) => [...prev, respuestaBot])
    }, 500)

    setInput("")
  }

  const handlePreguntaFrecuente = (respuesta: string) => {
    // Agregar respuesta como mensaje del bot
    const nuevoMensaje: ChatMessage = {
      id: Date.now().toString(),
      type: "bot",
      mensaje: respuesta,
      timestamp: new Date(),
    }

    setMensajes((prev) => [...prev, nuevoMensaje])
  }

  const buscarPedido = () => {
    if (!busquedaPedido.trim()) {
      setPedidoEncontrado(null)
      return
    }

    const pedido = pedidos.find(
      (p) =>
        p.id.toString() === busquedaPedido ||
        p.cliente.toLowerCase().includes(busquedaPedido.toLowerCase())
    )

    if (pedido) {
      setPedidoEncontrado(pedido)
    } else {
      setPedidoEncontrado(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="gap-2">
            <MessageCircle className="w-4 h-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="preguntas" className="gap-2">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="pedidos" className="gap-2">
            <Package className="w-4 h-4" />
            Mis Pedidos
          </TabsTrigger>
        </TabsList>

        {/* TAB: CHAT */}
        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Soporte en Vivo</CardTitle>
              <CardDescription>
                Realiza preguntas sobre nuestros productos y servicios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Ventana de conversación */}
              <ScrollArea className="h-80 border rounded-lg p-4 bg-muted/30">
                <div className="space-y-4">
                  {mensajes.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.type === "usuario" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.type === "usuario"
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-muted text-foreground rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{msg.mensaje}</p>
                        <span className="text-xs opacity-70">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input de mensaje */}
              <div className="flex gap-2">
                <Input
                  placeholder="Escribe tu pregunta..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && enviarMensaje()}
                />
                <Button onClick={enviarMensaje} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: PREGUNTAS FRECUENTES */}
        <TabsContent value="preguntas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
              <CardDescription>
                Respuestas rápidas a tus dudas más comunes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {preguntasFrecuentes.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handlePreguntaFrecuente(faq.respuesta)}
                  >
                    <p className="font-medium text-sm mb-2">{faq.pregunta}</p>
                    <p className="text-sm text-muted-foreground">
                      {faq.respuesta}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={() => handlePreguntaFrecuente(faq.respuesta)}
                    >
                      Ver en chat
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: SEGUIMIENTO DE PEDIDOS */}
        <TabsContent value="pedidos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seguimiento de Pedidos</CardTitle>
              <CardDescription>
                Busca tus pedidos por número o nombre
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Buscador */}
              <div className="flex gap-2">
                <Input
                  placeholder="Buscar por ID de pedido o nombre..."
                  value={busquedaPedido}
                  onChange={(e) => setBusquedaPedido(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && buscarPedido()}
                />
                <Button onClick={buscarPedido}>Buscar</Button>
              </div>

              {/* Resultados */}
              {pedidoEncontrado ? (
                <Card className="border-primary bg-primary/5">
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">Pedido #{pedidoEncontrado.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {pedidoEncontrado.cliente}
                        </p>
                      </div>
                      <Badge
                        variant={
                          pedidoEncontrado.estado === "Entregado"
                            ? "default"
                            : pedidoEncontrado.estado === "En despacho"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {pedidoEncontrado.estado}
                      </Badge>
                    </div>

                    <div className="space-y-2 border-t pt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fecha:</span>
                        <span>{pedidoEncontrado.fecha}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Dirección:</span>
                        <span>{pedidoEncontrado.direccion}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold">
                        <span>Total:</span>
                        <span>${pedidoEncontrado.total.toLocaleString("es-CL")}</span>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <p className="font-medium text-sm mb-2">Productos:</p>
                      <div className="space-y-1">
                        {pedidoEncontrado.productos.map((item, idx) => (
                          <p key={idx} className="text-sm text-muted-foreground">
                            • {item.producto.nombre} (Talla: {item.talla}) x
                            {item.cantidad}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : busquedaPedido ? (
                <div className="p-4 border border-destructive/50 bg-destructive/10 rounded-lg text-center">
                  <p className="text-sm text-destructive">
                    No se encontró ningún pedido con los criterios de búsqueda.
                  </p>
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Ingresa un número de pedido o nombre para buscar</p>
                </div>
              )}

              {/* Listado de todos los pedidos */}
              {!busquedaPedido && pedidos.length > 0 && (
                <div className="space-y-2 mt-6 border-t pt-6">
                  <p className="font-medium text-sm">Todos tus pedidos:</p>
                  <div className="space-y-2">
                    {pedidos.map((pedido) => (
                      <div
                        key={pedido.id}
                        className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setBusquedaPedido(pedido.id.toString())}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sm">
                              Pedido #{pedido.id}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {pedido.fecha}
                            </p>
                          </div>
                          <Badge variant="outline">{pedido.estado}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
