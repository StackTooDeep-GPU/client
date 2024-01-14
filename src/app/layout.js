import {Inter} from "next/font/google"
import "./globals.css"
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter"
import {Providers} from "./provider"

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Tektur&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
