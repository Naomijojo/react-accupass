import { createBrowserRouter } from "react-router-dom";
import { Home, Event } from '@/pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/event/:id",
    element: <Event />
  },
  {
    path:
  }
]) 

export default router