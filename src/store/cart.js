import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export const useCartStore = create(
  persist( 
    (set) => ({
      
      cart:[], // 初始狀態為空陣列
      setCart: (newCart) => set( () => ({cart: newCart}) ),
    
    }),
    {
      name:'Cart'
    }
  )
)
