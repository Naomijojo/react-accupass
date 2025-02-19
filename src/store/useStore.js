import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
    persist(
        (set, get) => ({
            //狀態
            username: 'guest',
	        setUsername: (name) => set({ username: name }),
            count: 0,
            doubleCount: () => get().count * 2,
            reset: () => set({ count: 0 }),
            increase: () => set({ count: get().count + 1 }),
            decrease: () => set((state) => ({ count: state.count - 1 })),
            setCount: (count) => set({ count }),
            plusNumber: (num) => set((state) => ({ count: state.count + num })),           
        }),
        {
            //持久化設定 (儲存在 localStorage，name的屬性值是儲存的 key 名)
            partialize: (state) => ({ 
                language: state.language
            }) // 指定持久化的部分狀態
            
            // 儲存的 key 名為 counter
            name: 'counter',
            // 只持久化 count 和 username
            partialize: (state) => ({ 
                count: state.count, 
                username: state.username 
            }), 
        }
    )
)
export default useStore;