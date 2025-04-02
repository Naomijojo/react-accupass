import { createBrowserRouter } from "react-router-dom";
import Layout from '@/components/Layout'
import { Home, Event, NotFound, Search, Ticket, FillOrder, Payment, GetTicket, Map} from '@/pages';

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
        element: <Search />
      },
      {
        path:"/ticket/:id",
        element: <Ticket />
      },
      {
        path:"/fillOrder",
        element: <FillOrder />
      },
      {
        path:"/fillOrder/payment",
        element: <Payment />
      },
      {
        path:"/fillOrder/getTicket",
        element: <GetTicket />
      },
      { 
        path: "/map/:id",
        element: <Map /> 
      },
      {
        path: "*",
        element: <NotFound />
      }  
    ]
  }
]) 

export default router