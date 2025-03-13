import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SearchHeader from './SearchHeader'
import CartHeader from './CartHeader'
import { useUserStore } from '@/store/user'
// import { useCartStore } from '@/store/cart'
import clsx from 'clsx'


const Layout = () => {
  const location = useLocation() 
  const { darkMode } = useUserStore()

  const getHeader = () => {
    if (location.pathname.startsWith('/search')) {
      return <SearchHeader />;
    }
    if (location.pathname.startsWith('/cart')) {
      return <CartHeader />;
    }
    return <Header />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      {getHeader()}
      <main className={clsx( { darkMode }) }>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;