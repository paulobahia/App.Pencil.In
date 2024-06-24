import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'
import { RouterProvider } from 'react-router-dom'
import { Routers } from './routes'
import { Toaster } from "./components/ui/sonner"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={Routers} />
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  </React.StrictMode>,
)
