import LOGO from '@/assets/images/common/icon-logo.svg'
import UserTicketsIcon from '@/assets/images/common/user/UserTickets.svg'
import UserPageIcon from '@/assets/images/common/user/UserPage.svg'
import UserProfileIcon from '@/assets/images/common/user/UserProfile.svg'
import UserSettingIcon from '@/assets/images/common/user/UserSetting.svg'
import OrganizerCenterIcon from '@/assets/images/common/user/OrganizerCenter.svg'
import IconGlobe from '@/assets/images/common/icon-globe.svg' 
import HeaderMenu from './HeaderMenu'
import { useUserStore } from '@/store/user'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { Dropdown } from 'antd'
import { useState, useEffect } from 'react'
import i18n from '@/i18n'
import clsx from 'clsx'

const Header = () => {
  const { t } = useTranslation(); // 解構賦值出 t 函數
  const navigate = useNavigate()
  const [ isLogIn, setIsLogIn ] = useState(false)
  const { language, setLanguage, darkMode, setDarkMode, location = 'taipei', setLocation } = useUserStore()
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
  // i18n翻譯 (先解構賦值出 t 函數->切換語系->不希望網頁刷新後語言改變就要用全局Store持久化設定方式來控制)
  const handleChangeLanguage = (item) => {
    const newLanguage = item.key
    i18n.changeLanguage(newLanguage) // changeLanguage 是i18n的切換方法
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
      label:<span onClick={() => { setIsLogIn(false) }}> {t('logout')} </span>
    },
  ]

  // - 漢堡列
  const [ isMenuOpen, setIsMenuOpen ] = useState(false)
  const toggleMenu = (open) => {
    setIsMenuOpen(open)
  }
  
  return (
    <div className={clsx("header-wrapper", { darkMode }) }>
      <header className="header-bar">
        <div className="header-container text-[14px]">
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
              <div className="header-auth-container flex ml-[2px]">

                <Dropdown menu={languageMenu}>
                  <div className='cursor-pointer'>
                    <span className='mr-1'>{t('language')}</span>
                    <i className="fa-solid fa-caret-down fa-sm" style={{color:'#e5e7eb'}}></i>
                  </div>
                </Dropdown>

                <p className="header-swich" onClick={ () => setDarkMode(!darkMode) }>{t('mode')}</p>

                <div>
                  {isLogIn ? (
                    <Dropdown menu={{ items: loginItems }} trigger={['click']}>
                      <p className="header-auth-herf" style={{ cursor: 'pointer' }}> {t('user')} </p>
                    </Dropdown>
                  ) : (
                    <p className="header-auth-herf" style={{ cursor: 'pointer' }} onClick={() => setIsLogIn(true)} >{t('login')}</p>
                  )}
                </div>
              </div>
              <div className="header-caret-event-button-container">
                <div>
                  <span className='cursor-pointer'>{t('organize_activities')}</span>
                </div>
              </div>
            </div>
          </nav>
        </div>
        
      </header>
    </div>
  );
}
 
export default Header