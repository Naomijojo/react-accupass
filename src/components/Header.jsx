import LOGO from '@/assets/images/common/icon-logo.svg'
import IconGlobe from '@/assets/images/common/icon-globe.svg' 
import { useNavigate } from 'react-router-dom'
import { Dropdown } from 'antd'
import { useTranslation } from "react-i18next"
import i18n from '@/i18n'
import { useState } from 'react'
import { useUserStore } from '@/store/user'
import clsx from 'clsx'

const Header = () => {
  const { t } = useTranslation(); // 解構賦值出 t 函數
  const navigate = useNavigate()
  const [ isLogIn, setIsLogIn ] = useState(false)
  const { language, setLanguage, darkMode, setDarkMode, location, setLocation } = useUserStore()
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
  // - 語言
  // i18n翻譯 (先解構賦值出 t 函數->切換語系->不希望網頁刷新後語言改變就要用全局Store持久化設定方式來控制)
  const handleChangeLanguage = (item) => {
    const newLanguage = item.key
    // changeLanguage 是i18n的切換方法
    i18n.changeLanguage(newLanguage)
    setLanguage(newLanguage) //將newLanguage儲存在setLanguage
    //改dropdown disables狀態
    const newItems = languageItems.map(i => {
      if (i.key === newLanguage){
        return { ...i, disabled: true }
      }
      return { ...i, disabled: false }
    })
    setLanguageItems(newItems)
  }

  const [ locationItems,  setLocationItems ] = useState([
    {
      key: 'taipei',
      label: '台北',
      disabled: location === 'taipei'
    },
    {
      key: 'taichung',
      label: '台中',
      disabled: location === 'taichung'
    },
    {
      key: 'kaohsiung',
      label: '高雄',
      disabled: location === 'kaohsiung'
    },
    {
      key: 'singapore',
      label: '新加坡',
      disabled: location === 'singapore'
    }
  ])
  const languageMenu = {
    items: languageItems.map((item) => ({
      key: item.key,
      label: 
      <div onClick={() => handleChangeLanguage(item)} style={{ cursor: item.disabled ? 'not-allowed' : 'pointer' }}> {item.label} </div>, disabled: item.disabled
    }))
  }
  // - 地點
  const handleChangeLocation = (item) => {
    const newLocation = item.key
    setLocation( newLocation)
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
      label: 
      <div onClick={() => handleChangeLocation(item)} style={{ cursor: item.disabled ? 'not-allowed' : 'pointer' }}> {item.label} </div>, disabled: item.disabled
    }))
  }
  // - 登入
  const loginItems = [
    {
      key:'1',
      label: t('myTickets')
    },
    {
      key:'2',
      label: t('myPage')
    },
    {
      key:'3',
      label: t('myFiles')
    },
    {
      key:'4',
      label: t('accountManagement')
    },
    {
      key:'5',
      label: t('organizerCenter')
    },
    {
      key: '6',
      label:<span onClick={() => { setIsLogIn(false) }}> {t('logout')} </span>
    },
  ]

  return (
    <div className={clsx("header-wrapper", { darkMode }) }>
      <header className="header-bar">
        <div className="header-container text-[14px]">
          <nav className="header-inner flex justify-between items-center">
            <div className="header-inner-left flex items-center">
              <div className="menu-icon-container flex justify-center items-center">
                <div className="header-icon header-menu-icon header-menu-burger flex items-center"></div>
              </div>
              <div className="area-menu-container flex justify-center items-center">
                <Dropdown menu={locationMenu} trigger={'hover'}>
                  <div className='flex cursor-pointer'>
                    <img src={IconGlobe} className="header-icon-globe" alt="" />
                    <span className='mr-[4px]'>台北</span>
                    <span className="header-icon-caret">
                      <i className="fa-solid fa-caret-down fa-sm " style={{color:'#e5e7eb'}}></i>
                    </span>
                  </div>
                </Dropdown>
                
              </div>
            </div>
            <div className="header-logo" onClick={() => navigate('/')}>
              <img src={LOGO} alt="" />
            </div>
            <div className="header-inner-right flex items-center">
              <div className="header-search-input-container">
                <div className="header-keyword-container mr-3">
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