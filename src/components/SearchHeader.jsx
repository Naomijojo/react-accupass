import LOGO from '../assets/images/common/icon-search-logo.svg';

const SearchHeader = () => {
  return (
    <div className="search-header-wrapper">
      <header className="search-header-bar flex justify-between items-center">
        <div className="search-header-logo-container flex items-center">
          <a href="/" className="flex items-center"> 
            <span className='mr-[10px]'>
              <img src={LOGO} alt="Logo" />
            </span>
            <span className='ml-[10px]'>
              <h4 className='search-header-link'>主辦榜</h4>
            </span>
          </a>
        </div>

        <div className="search-header-user-container flex items-center">
          <h4 className='search-header-link'>登入</h4>
          <div className="search-header-divider"></div>
          <h4 className='search-header-link'>註冊</h4>
        </div>

      </header>
    </div>
  )
}

export default SearchHeader
