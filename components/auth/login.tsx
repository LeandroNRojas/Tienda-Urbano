"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Store, LogIn, AlertCircle, UserPlus, X } from "lucide-react"
import { usuariosMock, type Usuario } from "@/lib/mock-data"

interface LoginProps {
  onLogin: (usuario: Usuario) => void
  onSkip: () => void
}

export function Login({ onLogin, onSkip }: LoginProps) {
  const [tab, setTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [usuariosTemporales, setUsuariosTemporales] = useState<Usuario[]>([])

  // Cargar usuarios temporales del localStorage
  useEffect(() => {
    const stored = localStorage.getItem("usuariosTemporales")
    if (stored) {
      setUsuariosTemporales(JSON.parse(stored))
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Combinar usuarios mock + temporales
    const todosLosUsuarios = [...usuariosMock, ...usuariosTemporales]
    
    const usuario = todosLosUsuarios.find(
      u => u.email === email && u.password === password
    )

    if (usuario) {
      onLogin(usuario)
    } else {
      setError("Credenciales incorrectas")
    }
  }

  const handleRegistro = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validaciones
    if (!nombre.trim()) {
      setError("El nombre es requerido")
      return
    }
    if (!email.includes("@")) {
      setError("Email inválido")
      return
    }
    if (password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres")
      return
    }

    // Verificar si el email ya existe
    const emailExiste = [...usuariosMock, ...usuariosTemporales].some(u => u.email === email)
    if (emailExiste) {
      setError("El email ya está registrado")
      return
    }

    // Crear nuevo usuario
    const nuevoUsuario: Usuario = {
      id: Math.max(0, ...usuariosMock.map(u => u.id), ...usuariosTemporales.map(u => u.id)) + 1,
      email,
      nombre,
      password,
      rol: "cliente" // Los nuevos registros son clientes
    }

    // Guardar en localStorage
    const nuevosTemporales = [...usuariosTemporales, nuevoUsuario]
    setUsuariosTemporales(nuevosTemporales)
    localStorage.setItem("usuariosTemporales", JSON.stringify(nuevosTemporales))

    // Limpiar formulario
    setSuccess(`¡Cuenta creada! Ya puedes iniciar sesión con ${email}`)
    setNombre("")
    setEmail("")
    setPassword("")
    
    // Cambiar a pestaña de login después de 1.5 segundos
    setTimeout(() => {
      setTab("login")
    }, 1500)
  }

  const loginRapido = (rol: "cliente" | "admin" | "dueño") => {
    const usuario = usuariosMock.find(u => u.rol === rol)
    if (usuario) {
      onLogin(usuario)
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-full max-w-[480px] py-2">
        <button
          type="button"
          onClick={onSkip}
          className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground"
          aria-label="Cerrar inicio de sesión"
        >
          <X className="h-4 w-4" />
        </button>

        <Card className="w-full overflow-hidden rounded-2xl border border-border/70 bg-background shadow-[0_20px_45px_-15px_rgba(15,23,42,0.35)]">
          <CardHeader className="border-b px-5 py-4 text-center">
            <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-border/80 bg-white/90 p-2 shadow-sm sm:h-28 sm:w-28">
              <img
                src="/LogoTU.png"
                alt="Logo de Tienda Urbano"
                className="h-full w-full object-contain"
              />
            </div>
            <CardTitle className="text-xl">Tienda Urbano</CardTitle>
            <CardDescription className="text-sm">MVP - Ingeniería de Requisitos</CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <Tabs value={tab} onValueChange={setTab} className="flex h-full flex-col">
              <TabsList className="grid w-full grid-cols-2 rounded-none border-b bg-muted/20 p-2 px-3">
                <TabsTrigger value="login" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Iniciar Sesión
                </TabsTrigger>
                <TabsTrigger value="registro" className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Registrarse
                </TabsTrigger>
              </TabsList>

              <div className="min-h-0 flex-1 overflow-hidden">
                <ScrollArea className="h-full w-full">
                  <div className="p-4 pb-6">
                    {/* TAB: LOGIN */}
                    <TabsContent value="login" className="mt-0 space-y-4">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="usuario@tienda.cl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Contraseña</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>

                        {error && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        <Button type="submit" className="w-full">
                          <LogIn className="mr-2 h-4 w-4" />
                          Iniciar Sesión
                        </Button>
                      </form>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">
                            Acceso rápido para demo
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => loginRapido("cliente")}
                          className="text-xs"
                        >
                          Cliente
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => loginRapido("admin")}
                          className="text-xs"
                        >
                          Admin
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => loginRapido("dueño")}
                          className="text-xs"
                        >
                          Dueño
                        </Button>
                      </div>
                    </TabsContent>

                    {/* TAB: REGISTRO */}
                    <TabsContent value="registro" className="mt-0 space-y-4">
                      <form onSubmit={handleRegistro} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre Completo</Label>
                          <Input
                            id="nombre"
                            type="text"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email-registro">Email</Label>
                          <Input
                            id="email-registro"
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password-registro">Contraseña</Label>
                          <Input
                            id="password-registro"
                            type="password"
                            placeholder="••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <p className="text-xs text-muted-foreground">Mínimo 4 caracteres</p>
                        </div>

                        {error && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        {success && (
                          <Alert className="border-green-200 bg-green-50">
                            <AlertDescription className="text-green-800">{success}</AlertDescription>
                          </Alert>
                        )}

                        <Button type="submit" className="w-full">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Crear Cuenta
                        </Button>
                      </form>

                      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800">
                        <p className="mb-1 font-medium">ℹ️ Registro Temporal</p>
                        <p>Los registros se almacenan solo en esta sesión del navegador. Al recargar se perderán.</p>
                      </div>
                    </TabsContent>
                  </div>
                </ScrollArea>
              </div>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 border-t bg-background/80 px-5 py-4">
            <div className="space-y-1 text-center text-xs text-muted-foreground">
              <p className="font-medium">Credenciales de prueba (predefinidas):</p>
              <p>cliente@tienda.cl | admin@tienda.cl | dueno@tienda.cl</p>
              <p>Contraseña: 123456</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onSkip} className="text-xs">
              Continuar sin login (modo invitado)
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
