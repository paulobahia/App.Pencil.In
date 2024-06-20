import { Home, Services } from '@/pages'
import { createBrowserRouter } from 'react-router-dom'

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/services",
    element: <Services />,
  }
])