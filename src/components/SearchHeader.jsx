import { useNavigate } from 'react-router-dom';
import LOGO from '../assets/images/common/icon-search-logo.svg';
import { useTranslation } from "react-i18next"
import { useUserStore } from '@/store/user'
import clsx from 'clsx'

const SearchHeader = () => {
  const { t } = useTranslation();
  const { darkMode, setIsModalOpen, token, userInfo } = useUserStore()

  const navigate = useNavigate()

  const handleClickLogin = () => {
    setIsModalOpen(true)
  }

  

  return (
    <div className={clsx("search-header-wrapper", {darkMode}) }>
      <header className="search-header-bar flex justify-between items-center">
        <div className="search-header-logo-container flex items-center">
          <div onClick={()=> navigate('/')} className="flex items-center"> 
            <span className='mr-[10px]'>
              <img src={LOGO} alt="" />
            </span>
            <span className='ml-[10px]'>
              <h4 className='search-header-link'>{t('organizer')}</h4>
            </span>
          </div>
        </div>

        <div className="search-header-user-container flex items-center">
          {token?(
              <span className="search-header-link">{userInfo.firstName}</span>
          ):(
            <>
              <button className='search-header-link cursor-pointer' onClick={handleClickLogin}>{t('login')}</button>
              <div className="search-header-divider"></div>
              <button className='search-header-link'>{t('register')}</button>
            </>
          )}
        </div>
      </header>
    </div>
  )
}

export default SearchHeader
