import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'
import { Routers } from './routes'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={Routers} />
    </ThemeProvider>
  </React.StrictMode>,
)
