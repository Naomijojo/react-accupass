import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export const useCartStore = create(
  persist( 
    (set) => ({
      cart: [], // 初始狀態為空陣列 再看裡面有幾個物件 存ticket選的票
      order: [], // 訂單
      payment:[], // 付款方式
      setCart: (newCart) => set( () => ({ cart: newCart }) ), 
      setOrder: (newOrder) => set( () => ({ order: newOrder })),
      setPayment: (newPayment) => set( () => ({ payment: newPayment })),
    }),
    {
      name:'cart' //存到 localStorage 的 key
    }
  )
)
