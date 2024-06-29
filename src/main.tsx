import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'
import { RouterProvider } from 'react-router-dom'
import { Routers } from './routes'
import { Toaster } from "./components/ui/sonner"
import { BookingProvider, NotificationProvider } from './context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BookingProvider>
        <NotificationProvider>
          <RouterProvider router={Routers} />
        </NotificationProvider>
      </BookingProvider>
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  </React.StrictMode>,
)
