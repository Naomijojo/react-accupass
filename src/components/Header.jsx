import LOGO from '../assets/images/common/icon-logo.svg';

const Header = () => {
  return (
    <div className="header-wrapper">
        <header className="header-bar">
            <div className="header-container">
                <nav className="header-inner">
                    <div className="header-inner-left">
                        <div className="menu-icon-container">
                            <div className="header-icon header-menu-icon header-menu-burger"></div>
                        </div>
                        <div className="area-menu-container">
                            <img src="./assets/images/common/icon-globe.svg" className="header-icon-globe" alt="" />
                            <span>台北</span>
                            <span className="header-icon-caret"></span>
                        </div>
                    </div>
                    <a href="./index.html" className="header-logo">
                        <img src={LOGO} alt="" />
                    </a>
                    <div className="header-inner-right">
                        <div className="header-search-input-container">
                            <div className="header-keyword-container">
                                <span className="header-keyword">找活動</span>
                                <span className="header-keyword-icon">
                                    <span className="header-icon-search"></span>
                                </span>
                            </div>
                        </div>
                        <div className="header-auth-container">
                            <div>
                                <p className="header-translate">翻譯</p>
                            </div>
                            <div>
                                <p className="header-swich">深色主題</p>
                            </div>
                            <div>
                                <p className="header-auth-herf">登入</p>
                            </div>
                            <div>
                                <p className="header-auth-herf">註冊</p>
                            </div>
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