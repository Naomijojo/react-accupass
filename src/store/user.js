import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// zustand: use開頭-名稱-Store結尾
export const useUserStore = create(
  persist( //persist=持久化設定 會存在storage裡(key & value)
    (set) => ({
      
      language:'zh_TW', //預設Lan是繁中
      setLanguage: (newLanguage) => set( () => ({language: newLanguage}) ), //set會依專案命名方式(update或change皆可)
      
      darkMode: false,
      setDarkMode: (mode) => set( () => ({darkMode: mode}) )
    
    }),
    {
      name:'user'
    }
  )
)
