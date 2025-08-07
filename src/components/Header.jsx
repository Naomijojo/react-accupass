import LOGO from '@/assets/images/common/icon-logo.svg'
import UserTicketsIcon from '@/assets/images/common/user/UserTickets.svg'
import UserPageIcon from '@/assets/images/common/user/UserPage.svg'
import UserProfileIcon from '@/assets/images/common/user/UserProfile.svg'
import UserSettingIcon from '@/assets/images/common/user/UserSetting.svg'
import OrganizerCenterIcon from '@/assets/images/common/user/OrganizerCenter.svg'
import IconGlobe from '@/assets/images/common/icon-globe.svg' 
import HeaderMenu from './HeaderMenu'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { Dropdown, Modal, message } from 'antd'
import { useState, useEffect } from 'react'
import i18n from '@/i18n'
import clsx from 'clsx'
import { userApi } from '@/api/user'
import { useUserStore } from '@/store/user'

const Header = () => {
  const { t } = useTranslation() 
  const navigate = useNavigate()
  const { token, setToken, userInfo, setUserInfo, isModalOpen, setIsModalOpen, language, setLanguage, darkMode, setDarkMode, location = 'taipei', setLocation } = useUserStore()
  const [ currentLocation, setCurrentLocation ] = useState(t(`location.${location}`))
  
  const [ languageItems,  setLanguageItems ] = useState([
    {
      key: 'zh_TW',
      label: '繁中',
      disabled: language === 'zh_TW' // lan === zh_TW才會是true
    },
    {
      key: 'en_US',
      label: '英文',
      disabled: language === 'en_US' // lan === us_en才會是true
    }
  ])
  const [ locationItems,  setLocationItems ] = useState([
    {
      key: 'taipei',
      label: t('location.taipei'),
      disabled: location === 'taipei'
    },
    {
      key: 'taichung',
      label: t('location.taichung'),
      disabled: location === 'taichung'
    },
    {
      key: 'kaohsiung',
      label: t('location.kaohsiung'),
      disabled: location === 'kaohsiung'
    },
    {
      key: 'singapore',
      label: t('location.singapore'),
      disabled: location === 'singapore'
    }
  ])
  
  // - 語言
  // i18n翻譯 (先解構賦值出 t 函數->切換語系->不要刷新後語言改變要用全局Store持久化設定方式來控制)
  const handleChangeLanguage = (item) => {
    const newLanguage = item.key
    i18n.changeLanguage(newLanguage) // i18n提供 changeLanguage 的切換方法
    setLanguage(newLanguage)         
    //改dropdown disables狀態
    const newItems = languageItems.map(i => {
      if (i.key === newLanguage){
        return { ...i, disabled: true }
      }
      return { ...i, disabled: false }
    })
    setLanguageItems(newItems)
  }
  const languageMenu = {
    items: languageItems.map((item) => ({
      key: item.key,
      label: 
      <div onClick={() => handleChangeLanguage(item)} style={{ cursor: item.disabled ? 'not-allowed' : 'pointer' }}> {item.label} </div>, disabled: item.disabled
    }))
  }

  useEffect(() => {
    setCurrentLocation(t(`location.${location}`))
  }, [location, language, t])

  // - 地點
  const handleChangeLocation = (item) => {
    const newLocation = item.key
    setLocation(newLocation)
    setCurrentLocation(t(`location.${newLocation}`))
    const newItems = locationItems.map(i =>{
      if(i.key === newLocation){
        return{ ...i, disabled: true }
      }
      return { ...i, disabled: false }
    })
    setLocationItems(newItems)
  }
  const locationMenu = {
    items: locationItems.map((item) => ({
      key: item.key,
      label: (
        <div onClick={() => handleChangeLocation(item)} style={{ cursor: item.disabled ? 'not-allowed' : 'pointer' }}>
          {item.label}
        </div>
      ),
      disabled: item.disabled
    }))
  }

 // - 登出  就將setToken變成空字串 + userInfo也要變成空物件
 const logout = () => {
  setToken('')
  setUserInfo({})    
  // 通知登出成功
  message.success('已登出成功')
  }
  // - 登入
  const loginItems = [
    {
      key:'1',
      label:(
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={UserTicketsIcon} alt="UserTicketsIcon" style={{ width: '24px', marginRight: '8px' }} />
          {t('UserTickets')}
        </div>
      )
    },
    {
      key:'2',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={UserPageIcon} alt="UserPageIcon" style={{ width: '24px', marginRight: '8px' }} />
          {t('UserPage')}
        </div>
      )
    },
    {
      key:'3',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={UserProfileIcon} alt="UserProfileIcon" style={{ width: '24px', marginRight: '8px' }} />
          {t('UserProfile')}
        </div>
      )
    },
    {
      key:'4',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={UserSettingIcon} alt="UserSettingIcon" style={{ width: '24px', marginRight: '8px' }} />
          {t('UserSetting')}
        </div>
      )
    },
    {
      key:'5',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={OrganizerCenterIcon} alt="OrganizerCenterIcon" style={{ width: '24px', marginRight: '8px',color:'#959ba1' }} />
          {t('OrganizerCenter')}
        </div>
      )
    },
    {
      key: '6',
      label:<span onClick={logout}> {t('logout')} </span>
    },
  ]
  
  // 登入功能
  // 使用者輸入帳密 -> 登入API -> 後端確認資料庫是否有帳密
  // 確認有帳密 -> 後端會將使用者資訊加密(變成JWT)傳給前端 -> 前端接收JWT的token
  // 前端將token存到本地端(localStorage或cookie) -> 之後每次請求都帶上token
  // -> 如何確認是否為登入狀態 ? -> 查看本地端是否有token
  // (補充:後端會驗證token是否過期/有效)
  // 登入後的使用者資訊會存到user全局狀態中 
  const [ username, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ showPassword, setShowPassword ] = useState(false)
  const [ isForgotPassword, setIsForgotPassword ] = useState(false)
  const [ email, setEmail ] = useState('')

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
  // - 密碼切換是否可見
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  // - 處理忘記密碼
  const handleForgotPassword = () => {
    setIsForgotPassword(true)  //切換到忘記密碼Modal
  }

  // - 在忘記密碼Modal返回登入Modal
  const BackToLogin = () => {
    setIsForgotPassword(false) //返回登入Modal
  }

  // - 登入 & 忘記密碼的enter事件
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (isForgotPassword) {
        handleForgotPasswordSubmit()
      } else {
        login()
      }
    }
  }

  // - 忘記密碼modal<input>提示
  const handleForgotPasswordSubmit = () => {
    if (!email) {
      message.warning('請輸入電子郵件')
      return
    }
    message.success('已寄送重設密碼的連結至信箱')
    setEmail('')                             // 清空email
    setIsForgotPassword(false)               // 返回登入 Modal 
  }

  // - 漢堡列
  const [ isMenuOpen, setIsMenuOpen ] = useState(false)
  const toggleMenu = (open) => {
    setIsMenuOpen(open)
  }
  
 
  
  return (
    <>
      <div className={clsx("header-wrapper", { darkMode }) }>
        <header className="header-bar ">
          <div className="header-container">
            <nav className="header-inner flex justify-between items-center">
              <div className="header-inner-left flex items-center">
                <div className="menu-icon-container flex justify-center items-center">
                  <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} fa-xl`}
                    onClick={() => toggleMenu(!isMenuOpen)} style={{ cursor: 'pointer' }}>
                  </i>
                </div>
                <HeaderMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <div className="area-menu-container flex justify-center items-center">
                  <Dropdown menu={locationMenu} trigger={'hover'}>
                    <div className='flex cursor-pointer'>
                      <img src={IconGlobe} className="header-icon-globe" alt="" />
                      <span className='mr-[4px]'>{currentLocation}</span>
                      <span className="header-icon-caret">
                        <i className="fa-solid fa-caret-down fa-sm " style={{color:'#e5e7eb'}}></i>
                      </span>
                    </div>
                  </Dropdown>
                  
                </div>
              </div>
              <div className="header-logo" onClick={() => navigate('/')}>
                <img src={LOGO} alt="LOGO" />
              </div>
              <div className="header-inner-right flex items-center">
                <div className="header-search-input-container">
                  <div className="header-keyword-container mr-3" onClick={() => navigate('/search?')}>
                    <span className="header-keyword">{t('search_activities')}</span>
                    <span className="header-keyword-icon">
                      <i className="fa-solid fa-magnifying-glass cursor-pointer" style={{color: '#e5e7eb'}}></i>
                    </span>
                  </div>
                </div>
                <div className="header-auth-container ml-[2px] flex items-center">

                  <Dropdown menu={languageMenu}>
                    <div className='cursor-pointer hidden lg:flex items-center'>
                      <span className='mr-1'>{t('language')}</span>
                      <i className="fa-solid fa-caret-down fa-sm align-middle" style={{color:'#e5e7eb'}}></i>
                    </div>
                  </Dropdown>

                  <p className="header-swich hidden lg:flex items-center" onClick={ () => setDarkMode(!darkMode) }>{t('mode')}</p>

                  <div>
                    {token ? (
                      <Dropdown menu={{ items: loginItems }} trigger={['click']}>
                        <button className="header-auth-herf" style={{ cursor: 'pointer' }}> {userInfo.firstName} </button>
                      </Dropdown>
                      ) : (
                        <button className="header-auth-herf" style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(true)} >{t('login')}</button>
                    )}
                  </div>
                </div>
                <div className="header-caret-event-button-container hidden lg:flex items-center">
                  <div>
                    <span className='cursor-pointer'>{t('organize_activities')}</span>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          
        </header>
      </div>
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
            <input type="text" 
              className='mb-4'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <label htmlFor="password">{t('password')}</label>
            <div className="input-container">
              <span className='icon z-10'>
                <i className="fa-solid fa-lock" style={{ color: '#dbdbdb' }}></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
      
    </>
  );
}
 
export default Header