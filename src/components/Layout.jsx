import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SearchHeader from './SearchHeader'

const Layout = () => {
  const location = useLocation() //獲取當前路由

  return (
    <div className='flex flex-col min-h-screen'>
      {/* 根據路由顯示不同的 Header */}
      {location.pathname === '/search' ? <SearchHeader /> : <Header /> }
      <main className='flex-1'>
          <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default Layout