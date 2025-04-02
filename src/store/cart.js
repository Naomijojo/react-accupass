import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export const useCartStore = create(
  persist( 
    (set) => ({
      cart: [], // 初始狀態為空陣列 再看裡面有幾個物件 存ticket選的票
      orders: [], // 訂單
      setCart: (newCart) => set(() => ({ cart: newCart })), 
      setOrders: (newOrder) => set(() => ({ orders: newOrder })),
    }),
    {
      name:'cart' //存到 localStorage 的 key
    }
  )
)
