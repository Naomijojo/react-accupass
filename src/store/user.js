import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// zustand: use開頭-名稱-Store結尾
export const useUserStore = create(
  persist( //persist=持久化設定 會存在storage裡(key & value)
    (set) => ({
      // token:使用者登入後的token
      token: '',
      setToken: (token) => set(() => ({ token })),
      
      language:'zh_TW',                           
      setLanguage: (newLanguage) => set( () => ({language: newLanguage}) ), //set會依專案命名方式(update或change皆可)
      
      // userInfo:使用者登入後的資料
      userInfo: {
        firstName: ''
      },
      setUserInfo: (info) => set( () => ({ userInfo: info}) ),
      
      // darkMode
      darkMode: false,
      setDarkMode: (mode) => set( () => ({darkMode: mode}) ),
      
      // isModalOpen是否開啟
      isModalOpen: false,
      setIsModalOpen: (bool) => set(() => ({ isModalOpen: bool }))
    }),
    {
      name:'user'
    }
  )
)
