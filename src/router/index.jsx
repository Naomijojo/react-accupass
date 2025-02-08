import { createBrowserRouter } from "react-router-dom";
import Layout from '@/components/Layout'
import { Home, Event, NotFound } from '@/pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        path: "/",
        element: <Home /> 
      },
      {
        path: "/event/:id", 
        element: <Event /> 
      },
      {
        path: "*",
        element: <NotFound />
      }  
    ]
  }
]) 

export default router