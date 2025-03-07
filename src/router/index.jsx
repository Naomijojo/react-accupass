import { createBrowserRouter } from "react-router-dom";
import Layout from '@/components/Layout'
import { Home, Event, NotFound, Search, Ticket, Cart, Step2  } from '@/pages';

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
        path:"/ticket",
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
      // {
      //   path:"/cart/step3",
      //   element: < Step3 />
      // },
      // {
      //   path:"/cart/step4",
      //   element: < Step4 />
      // },
      {
        path: "*",
        element: <NotFound />
      }  
    ]
  }
]) 

export default router