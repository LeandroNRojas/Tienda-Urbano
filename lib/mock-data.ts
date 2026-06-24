// Datos Mock para Tienda Urbano MVP - Ropa de Mujer

export interface Producto {
  id: number
  nombre: string
  categoria: string
  precio: number
  precioOferta?: number
  stock: number
  imagen: string
  tallas: string[]
  enOferta: boolean
  descripcion: string
}

export interface ItemCarrito {
  producto: Producto
  cantidad: number
  talla: string
}

export interface Pedido {
  id: number
  cliente: string
  productos: ItemCarrito[]
  total: number
  estado: "En preparación" | "En despacho" | "Entregado"
  fecha: string
  direccion: string
}

export interface Usuario {
  id: number
  email: string
  nombre: string
  password: string
  rol: "cliente" | "admin" | "dueño"
}

export const productosIniciales: Producto[] = [
  {
    id: 1,
    nombre: "Blusa Floral Primavera",
    categoria: "Blusas",
    precio: 18990,
    stock: 25,
    imagen: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=300&h=300&fit=crop",
    tallas: ["XS", "S", "M", "L"],
    enOferta: false,
    descripcion: "Blusa elegante con estampado floral para la temporada"
  },
  {
    id: 2,
    nombre: "Jeans Mom Fit Celeste",
    categoria: "Jeans",
    precio: 34990,
    precioOferta: 26990,
    stock: 15,
    imagen: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop",
    tallas: ["36", "38", "40", "42", "44"],
    enOferta: true,
    descripcion: "Jeans tiro alto estilo mom fit, muy cómodos"
  },
  {
    id: 3,
    nombre: "Vestido Midi Negro",
    categoria: "Vestidos",
    precio: 42990,
    stock: 10,
    imagen: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop",
    tallas: ["XS", "S", "M", "L", "XL"],
    enOferta: false,
    descripcion: "Vestido elegante negro perfecto para ocasiones especiales"
  },

  {
    id: 5,
    nombre: "Polera Crop Top Blanca",
    categoria: "Poleras",
    precio: 12990,
    stock: 30,
    imagen: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&h=300&fit=crop",
    tallas: ["XS", "S", "M", "L"],
    enOferta: false,
    descripcion: "Polera crop top básica blanca, perfecta para el verano"
  },
  {
    id: 6,
    nombre: "Pantalón Palazzo Beige",
    categoria: "Pantalones",
    precio: 36990,
    precioOferta: 28990,
    stock: 12,
    imagen: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop",
    tallas: ["36", "38", "40", "42"],
    enOferta: true,
    descripcion: "Pantalón palazzo fluido en tono beige, muy elegante"
  },
  {
    id: 7,
    nombre: "Blazer Oversize Gris",
    categoria: "Chaquetas",
    precio: 54990,
    stock: 7,
    imagen: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop",
    tallas: ["S", "M", "L"],
    enOferta: false,
    descripcion: "Blazer oversize en gris, perfecto para looks formales"
  },
  {
    id: 8,
    nombre: "Sweater Tejido Rosado",
    categoria: "Sweaters",
    precio: 32990,
    stock: 14,
    imagen: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop",
    tallas: ["S", "M", "L", "XL"],
    enOferta: false,
    descripcion: "Sweater de punto grueso en tono rosado, muy abrigador"
  },
  {
    id: 9,
    nombre: "Vestido Floral Verano",
    categoria: "Vestidos",
    precio: 38990,
    precioOferta: 29990,
    stock: 9,
    imagen: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop",
    tallas: ["XS", "S", "M", "L"],
    enOferta: true,
    descripcion: "Vestido floral ligero ideal para días de verano"
  },
  {
    id: 10,
    nombre: "Top Satinado Champagne",
    categoria: "Blusas",
    precio: 24990,
    stock: 18,
    imagen: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=300&h=300&fit=crop",
    tallas: ["XS", "S", "M", "L"],
    enOferta: false,
    descripcion: "Top satinado elegante en tono champagne"
  },
  {
    id: 11,
    nombre: "Shorts Denim Azul",
    categoria: "Shorts",
    precio: 22990,
    stock: 20,
    imagen: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=300&fit=crop",
    tallas: ["36", "38", "40", "42"],
    enOferta: false,
    descripcion: "Shorts de mezclilla clásicos, perfectos para el calor"
  },
  {
    id: 12,
    nombre: "Cardigan Largo Café",
    categoria: "Sweaters",
    precio: 39990,
    precioOferta: 31990,
    stock: 11,
    imagen: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
    tallas: ["S", "M", "L"],
    enOferta: true,
    descripcion: "Cardigan largo en tono café, muy versátil"
  }
]

export const pedidosIniciales: Pedido[] = [
  {
    id: 1001,
    cliente: "Valentina Soto",
    productos: [
      { producto: productosIniciales[0], cantidad: 2, talla: "M" },
      { producto: productosIniciales[1], cantidad: 1, talla: "38" }
    ],
    total: 64970,
    estado: "En preparación",
    fecha: "2026-01-18",
    direccion: "Av. Providencia 1234, Santiago"
  },
  {
    id: 1002,
    cliente: "Camila Fernández",
    productos: [
      { producto: productosIniciales[2], cantidad: 1, talla: "S" }
    ],
    total: 42990,
    estado: "En despacho",
    fecha: "2026-01-17",
    direccion: "Calle Los Leones 567, Providencia"
  },
  {
    id: 1003,
    cliente: "Francisca López",
    productos: [
      { producto: productosIniciales[4], cantidad: 1, talla: "38" },
      { producto: productosIniciales[8], cantidad: 2, talla: "S" }
    ],
    total: 78970,
    estado: "Entregado",
    fecha: "2026-01-16",
    direccion: "Pasaje El Sol 89, Ñuñoa"
  },
  {
    id: 1004,
    cliente: "Isabella Muñoz",
    productos: [
      { producto: productosIniciales[4], cantidad: 3, talla: "M" }
    ],
    total: 38970,
    estado: "En preparación",
    fecha: "2026-01-18",
    direccion: "Av. Vicuña Mackenna 2345, La Florida"
  },
  {
    id: 1005,
    cliente: "Antonia Rojas",
    productos: [
      { producto: productosIniciales[7], cantidad: 1, talla: "L" },
      { producto: productosIniciales[8], cantidad: 1, talla: "S" }
    ],
    total: 62980,
    estado: "En despacho",
    fecha: "2026-01-17",
    direccion: "Calle Nueva York 123, Las Condes"
  }
]

export const ventasMensuales = [
  { mes: "Ago", ingresos: 1250000 },
  { mes: "Sep", ingresos: 1480000 },
  { mes: "Oct", ingresos: 1320000 },
  { mes: "Nov", ingresos: 1890000 },
  { mes: "Dic", ingresos: 2450000 },
  { mes: "Ene", ingresos: 1650000 }
]

export const categorias = ["Todas", "Blusas", "Jeans", "Vestidos", "Faldas", "Poleras", "Pantalones", "Chaquetas", "Sweaters", "Shorts"]

export const usuariosMock: Usuario[] = [
  { id: 1, email: "cliente@tienda.cl", nombre: "María González", password: "123456", rol: "cliente" },
  { id: 2, email: "admin@tienda.cl", nombre: "Carlos Admin", password: "123456", rol: "admin" },
  { id: 3, email: "dueno@tienda.cl", nombre: "Roberto Dueño", password: "123456", rol: "dueño" }
]
