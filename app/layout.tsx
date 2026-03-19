import {Sofia_Sans_Condensed,Spline_Sans_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import LenisSmoothScroll from "@/lib/Lenis"

const sofia = Sofia_Sans_Condensed({ subsets: ["latin"], variable: "--font-sans" })

const spline = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        spline.variable,
        "font-sans",
        sofia.variable
      )}
    >
      <body>
        <ThemeProvider>
          <LenisSmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
