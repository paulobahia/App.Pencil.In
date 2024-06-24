import { Home, SchedulingConfirmation, Services } from '@/pages'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

export const Routers = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/scheduling-confirmation" element={<SchedulingConfirmation />} />
    </Route>
  )
)
