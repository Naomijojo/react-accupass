import { createBrowserRouter } from "react-router-dom";
import Layout from '@/components/Layout'
import { Home, Event, NotFound, Search, Ticket, Cart, Step2, Step3, Step4  } from '@/pages';

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
        path:"/cart/:id",
        element: < Cart />
      },
      {
        path:"/cart/:id/step2",
        element: < Step2 />
      },
      {
        path:"/cart/:id/step3",
        element: < Step3 />
      },
      {
        path:"/cart/:id/step4",
        element: < Step4 />
      },
      {
        path: "*",
        element: <NotFound />
      }  
    ]
  }
]) 

export default router