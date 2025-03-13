
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export const useTicketStore = create(
  persist( 
    (set) => ({
      
      ticket:[], 
      setTicket: (newTicket) => set( () => ({ ticket: newTicket }) ),
    
    }),
    {
      name:'Ticket'
    }
  )
)
