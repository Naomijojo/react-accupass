import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SearchHeader from './SearchHeader'
import CartHeader from './CartHeader'

const Layout = () => {
  const location = useLocation() 
  
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
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;