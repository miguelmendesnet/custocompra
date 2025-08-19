import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Calculadora do Custo de Vida - Quanto Custa Realmente?",
  description:
    "Calcule o verdadeiro custo das suas compras em horas, dias e anos de trabalho. Perceba o que o seu dinheiro realmente significa.",
  generator: "v0.app",
  metadataBase: new URL("https://custocompra.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://custocompra.com/",
    siteName: "CustoCompra",
    title: "Calculadora do Custo de Vida - Quanto Custa Realmente?",
    description:
      "Calcule o verdadeiro custo das suas compras em horas, dias e anos de trabalho. Perceba o que o seu dinheiro realmente significa.",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "CustoCompra - Calculadora do Custo de Vida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@custocompra",
    creator: "@custocompra",
    title: "Calculadora do Custo de Vida - Quanto Custa Realmente?",
    description:
      "Calcule o verdadeiro custo das suas compras em horas, dias e anos de trabalho. Perceba o que o seu dinheiro realmente significa.",
    images: [
      {
        url: "/placeholder.jpg",
        alt: "CustoCompra - Calculadora do Custo de Vida",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-PT" className={`${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
