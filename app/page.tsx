"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Store,
  ShoppingCart,
  Package,
  User,
  Shield,
  Crown,
  LogOut,
  ShoppingBag,
  ClipboardList,
  Truck,
  BarChart3,
  LogIn,
  MessageCircle,
} from "lucide-react"
import {
  productosIniciales,
  pedidosIniciales,
  type Producto,
  type ItemCarrito,
  type Pedido,
  type Usuario,
} from "@/lib/mock-data"

// Componentes
import { Catalogo } from "@/components/cliente/catalogo"
import { Carrito } from "@/components/cliente/carrito"
import { Sugerencias } from "@/components/cliente/sugerencias"
import { PerfilCliente } from "@/components/cliente/perfil-cliente"
import { Chatbot } from "@/components/cliente/chatbot"
import { GestionStock } from "@/components/admin/gestion-stock"
import { ListaDespacho } from "@/components/admin/lista-despacho"
import { GestionPedidos } from "@/components/admin/gestion-pedidos"
import { DashboardIngresos } from "@/components/dueno/dashboard-ingresos"
import { Login } from "@/components/auth/login"

import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

type Vista = "cliente" | "admin" | "dueño"
type SubVista = "catalogo" | "carrito" | "perfil" | "chatbot" | "stock" | "despacho" | "pedidos" | "dashboard"

export default function TiendaUrbano() {
  // Estado de autenticación
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [mostrarLogin, setMostrarLogin] = useState(false)

  // Estado de la aplicación
  const [vistaActual, setVistaActual] = useState<Vista>("cliente")
  const [subVista, setSubVista] = useState<SubVista>("catalogo")

  // Datos mock con estado
  const [productos, setProductos] = useState<Producto[]>(productosIniciales)
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciales)

  // Bloquear scroll cuando el login está abierto
  /*useEffect(() => {
    if (mostrarLogin) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mostrarLogin])*/

  // Handlers de autenticación
  const handleLogin = (user: Usuario) => {
    setUsuario(user)
    setMostrarLogin(false)
    setVistaActual(user.rol === "cliente" ? "cliente" : user.rol === "admin" ? "admin" : "dueño")
  }

  const handleLogout = () => {
    setUsuario(null)
    setVistaActual("cliente")
    setSubVista("catalogo")
  }

  // Handlers del carrito
  const agregarAlCarrito = (item: ItemCarrito) => {
    setCarrito((prev) => {
      const existente = prev.findIndex(
        (i) => i.producto.id === item.producto.id && i.talla === item.talla
      )
      if (existente >= 0) {
        const nuevo = [...prev]
        nuevo[existente].cantidad += item.cantidad
        return nuevo
      }
      return [...prev, item]
    })
  }

  const actualizarCantidadCarrito = (index: number, cantidad: number) => {
    setCarrito((prev) => {
      const nuevo = [...prev]
      nuevo[index].cantidad = cantidad
      return nuevo
    })
  }

  const eliminarDelCarrito = (index: number) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index))
  }

  const vaciarCarrito = () => setCarrito([])

  // Handler de pedidos
  const agregarPedido = (pedido: Pedido) => {
    setPedidos((prev) => [pedido, ...prev])
  }

  // Handlers admin
  const actualizarProducto = (producto: Producto) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === producto.id ? producto : p))
    )
  }

  const agregarProducto = (producto: Producto) => {
    setProductos((prev) => [...prev, producto])
  }

  const eliminarProducto = (id: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== id))
  }

  const actualizarEstadoPedido = (id: number, estado: Pedido["estado"]) => {
    setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, estado } : p)))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border bg-background/80 p-1.5 shadow-sm sm:h-16 sm:w-16">
                <img
                  src="/LogoTU.png"
                  alt="Logo de Tienda Urbano"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h1 className="font-bold text-lg">Tiendas Urbano</h1>
                <p className="text-xs text-muted-foreground">Prototipo Funcional - Vistas</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {vistaActual === "cliente" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubVista("carrito")}
                  className="relative"
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Carrito
                  {carrito.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {carrito.length}
                    </Badge>
                  )}
                </Button>
              )}

              {usuario ? (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    {usuario.rol === "cliente" && <User className="w-3 h-3" />}
                    {usuario.rol === "admin" && <Shield className="w-3 h-3" />}
                    {usuario.rol === "dueño" && <Crown className="w-3 h-3" />}
                    {usuario.nombre}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setMostrarLogin(true)}>
                  <LogIn className="w-4 h-4 mr-1" />
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal de Login con Sistema de Registro */}
      {mostrarLogin && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
          <Login 
            onLogin={handleLogin} 
            onSkip={() => setMostrarLogin(false)}
          />
        </div>
      )}

      {/* Selector de Vista (para defensa) */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Vista:</span>
            <Tabs value={vistaActual} onValueChange={(v) => {
              setVistaActual(v as Vista)
              if (v === "cliente") setSubVista("catalogo")
              if (v === "admin") setSubVista("stock")
              if (v === "dueño") setSubVista("dashboard")
            }}>
              <TabsList>
                <TabsTrigger value="cliente" className="gap-1">
                  <User className="w-3 h-3" />
                  Cliente
                </TabsTrigger>
                <TabsTrigger value="admin" className="gap-1">
                  <Shield className="w-3 h-3" />
                  Admin
                </TabsTrigger>
                <TabsTrigger value="dueño" className="gap-1">
                  <Crown className="w-3 h-3" />
                  Dueño
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Navegación secundaria */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex gap-2 overflow-x-auto">
            {vistaActual === "cliente" && (
              <>
                <Button
                  variant={subVista === "catalogo" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSubVista("catalogo")}
                >
                  <ShoppingBag className="w-4 h-4 mr-1" />
                  Catálogo
                </Button>
                <Button
                  variant={subVista === "carrito" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSubVista("carrito")}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Carrito ({carrito.length})
                </Button>
                <Button
                  variant={subVista === "perfil" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSubVista("perfil")}
                >
                  <User className="w-4 h-4 mr-1" />
                  Mi Perfil
                </Button>
              </>
            )}

            {vistaActual === "admin" && (
              <>
                <Button
                  variant={subVista === "stock" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSubVista("stock")}
                >
                  <Package className="w-4 h-4 mr-1" />
                  Stock
                </Button>
                <Button
                  variant={subVista === "despacho" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSubVista("despacho")}
                >
                  <Truck className="w-4 h-4 mr-1" />
                  Despacho
                </Button>
                <Button
                  variant={subVista === "pedidos" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSubVista("pedidos")}
                >
                  <ClipboardList className="w-4 h-4 mr-1" />
                  Pedidos
                </Button>
              </>
            )}

            {vistaActual === "dueño" && (
              <Button
                variant={subVista === "dashboard" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSubVista("dashboard")}
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-6">
        {/* VISTA CLIENTE */}
        {vistaActual === "cliente" && (
          <>
            {subVista === "catalogo" && (
              <div className="space-y-6">
                <Catalogo productos={productos} agregarAlCarrito={agregarAlCarrito} />
                <Sugerencias
                  productos={productos}
                  historialCarrito={carrito}
                  agregarAlCarrito={agregarAlCarrito}
                />
              </div>
            )}
            {subVista === "carrito" && (
              <Carrito
                items={carrito}
                actualizarCantidad={actualizarCantidadCarrito}
                eliminarItem={eliminarDelCarrito}
                vaciarCarrito={vaciarCarrito}
                agregarPedido={agregarPedido}
              />
            )}
            {subVista === "perfil" && (
              <PerfilCliente usuario={usuario} pedidos={pedidos} />
            )}
          </>
        )}

        {/* VISTA ADMIN */}
        {vistaActual === "admin" && (
          <>
            {subVista === "stock" && (
              <GestionStock 
                productos={productos} 
                actualizarProducto={actualizarProducto}
                agregarProducto={agregarProducto}
                eliminarProducto={eliminarProducto}
              />
            )}
            {subVista === "despacho" && <ListaDespacho pedidos={pedidos} />}
            {subVista === "pedidos" && (
              <GestionPedidos pedidos={pedidos} actualizarEstado={actualizarEstadoPedido} />
            )}
          </>
        )}

        {/* VISTA DUEÑO */}
        {vistaActual === "dueño" && subVista === "dashboard" && (
          <DashboardIngresos pedidos={pedidos} />
        )}
      </main>

      {/* BOTON FLOTANTE DE CHATBOT */}
        <div className="fixed bottom-6 right-6 z-[60]">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full h-14 w-14 shadow-lg" size="icon">
              <MessageCircle className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="flex h-[80vh] max-h-[90vh] flex-col overflow-hidden rounded-2xl border bg-background p-0 shadow-2xl sm:max-w-[500px]">
            {/* Lector de pantalla oculto */}
            <VisuallyHidden.Root>
              <DialogTitle>Chat de soporte Tienda Urbano</DialogTitle>
            </VisuallyHidden.Root>
            {/* Clase para asegurar que Chatbot llene el espacio */}
          <div className="h-full flex-1 overflow-hidden">
            <Chatbot pedidos={pedidos} />
          </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
