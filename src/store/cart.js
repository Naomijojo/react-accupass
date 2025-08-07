import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 購物車 store
export const useCartStore = create(
  persist( 
    (set) => ({
      cart: [],   // 購物車，初始狀態為空陣列 
      orders: [], // 訂單，初始狀態為空陣列
      setCart: (newCart) => set(() => ({ cart: newCart })), 
      setOrders: (newOrder) => set(() => ({ orders: newOrder }))
    }),
    {
      name:'cart' //存到 localStorage 的 key
    }
  )
)
