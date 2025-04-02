import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SearchHeader from './SearchHeader'
import CartHeader from './CartHeader'
import { useUserStore } from '@/store/user'
import clsx from 'clsx'


const Layout = () => {
  const location = useLocation() 
  const { darkMode } = useUserStore()

  const getHeader = () => {
    if (location.pathname.startsWith('/search')) {
      return <SearchHeader />;
    }
    if (location.pathname.startsWith('/fillOrder')) {
      return <CartHeader />;
    }
    return <Header />;
  }
  
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