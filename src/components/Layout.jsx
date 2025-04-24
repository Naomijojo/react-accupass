import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SearchHeader from './SearchHeader'
import CartHeader from './CartHeader'
import { useUserStore } from '@/store/user'
import clsx from 'clsx'
import { useEffect } from 'react'


const authPaths = ['/fillOrder', '/ticket']

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation() 
  
  const { darkMode, token, setIsModalOpen } = useUserStore()
  console.log(location);
  
  const getHeader = () => {
    if (location.pathname.startsWith('/search')) {
      return <SearchHeader />;
    }
    if (location.pathname.startsWith('/fillOrder')) {
      return <CartHeader />;
    }
    return <Header />;
  }
  
  useEffect(()=> {
    if(authPaths.some(path => location.pathname.startsWith(path)) && !token){  // authPaths有包含‘fillOrder'或'/ticket'以及沒有token時
      setIsModalOpen(true)                                                     // 登入彈窗打開
      navigate('/')                               
    }
  },[token, location.pathname, setIsModalOpen, navigate]) // 有變化時，執行useEffect

  return (
    <div className="flex flex-col min-h-screen bg-[rgba(239,244,251)]">
      {getHeader()}
      <main className={clsx("flex-1", { darkMode }) }>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;