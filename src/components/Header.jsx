import LOGO from '../assets/images/common/icon-logo.svg'
import { useNavigate } from 'react-router-dom'


const Header = () => {
    const navigate = useNavigate()
    return (
    <div className="header-wrapper">
        <header className="header-bar">
            <div className="header-container">
                <nav className="header-inner flex justify-between items-center">
                    <div className="header-inner-left flex items-center">
                        <div className="menu-icon-container flex justify-center items-center">
                            <div className="header-icon header-menu-icon header-menu-burger flex items-center"></div>
                        </div>
                        <div className="area-menu-container flex justify-center items-center">
                            <img src="./assets/images/common/icon-globe.svg" className="header-icon-globe" alt="" />
                            <span>台北</span>
                            <span className="header-icon-caret"></span>
                        </div>
                    </div>
                    <a href='/' className="header-logo" onClick={() => navigate(`/`)}>
                        <img src={LOGO} alt="" />
                    </a>
                    <div className="header-inner-right flex items-center">
                        <div className="header-search-input-container">
                            <div className="header-keyword-container">
                                <span className="header-keyword">找活動</span>
                                <span className="header-keyword-icon">
                                    <span className="header-icon-search"></span>
                                </span>
                            </div>
                        </div>
                        <div className="header-auth-container flex">
                            <p className="header-translate">翻譯</p>
                            <p className="header-swich">主題</p>
                            <p className="header-auth-herf">登入</p>
                        </div>
                        <div className="header-creat-event-button-container">
                            <div>
                                <a href="#!">辦活動</a>
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