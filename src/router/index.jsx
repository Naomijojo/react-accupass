import { createBrowserRouter } from "react-router-dom";
import Layout from '@/components/Layout'
import { Home, Event, NotFound, Search } from '@/pages';

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
        path:"/search",
        element: < Search />
      },
      {
        path: "*",
        element: <NotFound />
      }  
    ]
  }
]) 

export default router