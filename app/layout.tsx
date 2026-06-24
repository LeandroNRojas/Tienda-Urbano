import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Fuente principal: Inter con pesos 300 (delgada), 400 (regular), 700 (bold)
const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'Tiendas Urbano',
  description: 'Sistema de Gestión de Tienda de Ropa',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
