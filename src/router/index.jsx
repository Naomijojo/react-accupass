import { createBrowserRouter } from "react-router-dom";
import Layout from '@/components/Layout'
import { Home, Event, NotFound, Search, Ticket, Cart, Step2, Step3 } from '@/pages';

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
        path:"/ticket/:id",
        element: < Ticket />
      },
      {
        path:"/cart",
        element: < Cart />
      },
      {
        path:"/cart/step2",
        element: < Step2 />
      },
      {
        path:"/cart/step3",
        element: < Step3 />
      },
      {
        path: "*",
        element: <NotFound />
      }  
    ]
  }
]) 

export default router