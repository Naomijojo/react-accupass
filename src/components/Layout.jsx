import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SearchHeader from './SearchHeader'
import CartHeader from './CartHeader'
import clsx from 'clsx'
import { useUserStore } from '@/store/user'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, message } from 'antd'
import { userApi } from '@/api/user'

const authPaths = ['/fillOrder', '/ticket']

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation() 
  const { t } = useTranslation()
  // const { darkMode, token, isModalOpen, setIsModalOpen,, setToken, setUserInfo } = useUserStore()

  const { token, setToken, userInfo, setUserInfo, isModalOpen, setIsModalOpen, darkMode } = useUserStore()

  // const { darkMode, token, setIsModalOpen } = useUserStore()
  //console.log(location);
  
  // ** Modal寫在 Header時, 因 Header組件重新渲染, useState會初始化清空, 所以不需要手動清空
  // ** 反之因為在 Layout時, Layout 組件持續存在(只有getHeader會根據路由變化重新渲染), 登入狀態的 useState 就不會自動清空，所以需要手動清空
  
  // - 登出  就將setToken變成空字串 + userInfo也要變成空物件
 const logout = () => {
  // 清空 store
  setToken('')
  setUserInfo({})
  // 清空輸入匡狀態
  setUserName('')
  setPassword('')
  setEmail('')
  setIsForgotPassword(false)
  setShowPassword(false)
  // 關閉ModalOpen
  setIsModalOpen(false)
  // 通知登出成功
  message.success('已登出成功')
  }
  
  // 登入相關狀態
  const [ username, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ showPassword, setShowPassword ] = useState(false)
  const [ isForgotPassword, setIsForgotPassword ] = useState(false)
  const [ email, setEmail ] = useState('')
  
  

  // 防止直接改網址進入fillOrder或ticket頁面
  const getHeader = () => {
    if (location.pathname.startsWith('/search')) {
      return <SearchHeader logout={logout}/>;
    }
    if (location.pathname.startsWith('/fillOrder')) {
      return <CartHeader logout={logout}/>;
    }
    return <Header logout={logout}/>;
  }
  useEffect(()=> {
    if(authPaths.some(path => location.pathname.startsWith(path)) && !token){  // authPaths有包含'fillOrder'或'/ticket'以及沒有token時
      setIsModalOpen(true)                                                     // 登入彈窗打開
      navigate('/')                                                            // 導回首頁
    }
  },[token, location.pathname, setIsModalOpen, navigate])                      // 有變化時，執行useEffect

  // 登入邏輯
  const login = async() => {
    if(!username || !password) {
      message.warning('請輸入使用者名稱或密碼')
      return
    }
    try{
      // api成功請求會回傳data -> 1.要取出token
      const { accessToken, firstName } = await userApi.login( username, password )
      console.log('accessToken:',accessToken);
      console.log('完整的 API 回應:', { accessToken, firstName });
      
      // 除錯： 解碼 JWT token 的 payload 部份
      // try {
      //   const tokenParts = accessToken.split('.')
      //   if (tokenParts.length === 3) {
      //     const payload = JSON.parse(atob(tokenParts[1]))
      //     console.log('Token payload:', payload)
      //     console.log('Token 過期時間:', new Date(payload.exp * 1000))
      //   }
      // } catch (error) {
      //   console.log('Token 解碼失敗:', error)
      // }



      // 2.再將token及userInfo存入user全域狀態
      setToken(accessToken)
      setUserInfo({ firstName })
      
      // 3.關閉ModalOpen
      setIsModalOpen(false)

      // 4.成功處理:登入成功的通知
      message.success('登入成功')
    } catch (err) {
      // 5.錯誤處理:登入失敗的通知
      message.error('使用者名稱或密碼有誤')
      console.error(err);
    }
  }

  // 密碼眼睛切換是否可見
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  // 處理忘記密碼切換 切到忘記密碼 Modal
  const handleForgotPassword = () => {
    setIsForgotPassword(true) 
  }

  // 在忘記密碼 Modal返回登入 Modal
  const BackToLogin = () => {
    setIsForgotPassword(false)
  }

  // 登入 & 忘記密碼的 鍵盤enter事件
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (isForgotPassword) {
        handleForgotPasswordSubmit()
      } else {
        login()
      }
    }
  }

  // 忘記密碼 modal<input>提示
  const handleForgotPasswordSubmit = () => {
    if (!email) {
      message.warning('請輸入電子郵件')
      return
    }
    message.success('已寄送重設密碼的連結至信箱')
    setEmail('')
    setIsForgotPassword(false)
  }


  return (
    <div className="flex flex-col min-h-screen bg-[rgba(239,244,251)]">
      {getHeader()}
      <main className={clsx("flex-1", { darkMode }) }>
        <Outlet />
      </main>

      <Footer />
      
      <Modal
        className='custom-loginModal flex flex-col justify-center items-center'
        title={isForgotPassword ? t('forgot_password') : t('login')}
        open={isModalOpen}
        okText={isForgotPassword ? t('sentMail') : t('login')}
        cancelText="取消"
        onOk={isForgotPassword ? null : login}  // 忘記密碼時不執行登入
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <button key="ok" onClick={isForgotPassword ? handleForgotPasswordSubmit : login} className="ant-btn ant-btn-primary">
            {isForgotPassword ? t('sentMail') : t('login')}
          </button>
        ]}
      >
        {!isForgotPassword ? (
          <>
            {/* 登入內容 */}
            <label htmlFor="username">{t('UserName')}</label>
            <div className="input-container">
              <span className='icon z-10'>
                <i className="fa-solid fa-user" style={{ color: '#dbdbdb' }}></i>
              </span>
            </div>
            {/* 使用者名稱 */}
            <input type="text" 
              className='mb-4'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            {/* 密碼 */}
            <label htmlFor="password">{t('password')}</label>
            <div className="input-container">
              <span className='icon z-10'>
                <i className="fa-solid fa-lock" style={{ color: '#dbdbdb' }}></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <i
                className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#8f8b8b' }}
              ></i>
            </div>
            <div 
              className='text-end flex justify-end text-sky-400'
              style ={{ cursor: 'pointer' }} 
              onClick={handleForgotPassword}>{t('forgot_password')}
            </div>
          </>
        ) : (
          <>
            {/* 忘記密碼內容 */}
            <label htmlFor="email">{t('email')}</label>
            <div className="input-container">
              <span className='icon z-10'>
                <i className="fa-solid fa-envelope" style={{ color: '#dbdbdb' }}></i>
              </span>
            </div>
            <input 
            type="email" 
            className='mb-0' 
            placeholder='abc123@gamil.com' 
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}/>  
            <div className='text-end flex justify-end text-sky-400' style ={{ cursor: 'pointer' }} onClick={BackToLogin}>{t('backToLogin')} </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Layout;