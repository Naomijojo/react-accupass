import LOGO from '../assets/images/common/icon-logo.svg'

import { useLocation, useNavigate } from 'react-router-dom'

const CartHeader = () => {
  const navigate = useNavigate()
  const location = useLocation() // 獲取當前路徑

  // 根據路徑判斷當前步驟
  const getCurrentStep = () => {
    const path = location.pathname;
    if (path.includes('step2')) return 3;
    if (path.includes('step3')) return 4;
    if (path.includes('step4')) return 5;
    return 2; // 預設為 cart 頁面
  };

  const currentStep = getCurrentStep();

  return (
    <div className="cart-header-wrapper">
      <header className="cart-header-bar flex justify-center items-center">
        <div href="/"  className="cart-logo" onClick={() => navigate('/')}> 
          <img src={LOGO} alt="" />
        </div>
      </header>
      <div className="stepper-header-wrap">
        <div className="stepper-bar flex">
          <div className="step-container flex items-center">
            <span className='stepper inline-flex items-center'>
              <span className={`num ${currentStep >= 2 ? 'stepperOn' : ''} inline-flex justify-center items-center`}>2</span>
              <span className={`title ${currentStep >= 2 ? 'stepperOn' : ''}`}>確認付款</span>
            </span>
            <span className='step-arrow'>
              <i className="fa-solid fa-sm fa-chevron-right"></i>
            </span>
          </div>
          <div className="step-container flex items-center">
            <span className='stepper inline-flex items-center'>
              <span className={`num ${currentStep >= 2 ? 'stepperOn' : ''} inline-flex justify-center items-center`}>2</span>
              <span className={`title ${currentStep >= 2 ? 'stepperOn' : ''}`}>填寫資料</span>
            </span>
            <span className='step-arrow'>
              <i className="fa-solid fa-sm fa-chevron-right"></i>
            </span>
          </div>
          <div className="step-container flex items-center">
            <span className='stepper inline-flex items-center'>
              <span className={`num ${currentStep >= 3 ? 'stepperOn' : ''} inline-flex justify-center items-center`}>3</span>
              <span className={`title ${currentStep >= 3 ? 'stepperOn' : ''}`}>選擇付款</span>
            </span>
            <span className='step-arrow'>
              <i className="fa-solid fa-chevron-right fa-sm" style={{ color: '#d1d3d6' }}></i>
            </span>
          </div>
          <div className="step-container flex items-center">
            <span className='stepper inline-flex items-center'>
              <span className={`num ${currentStep >= 4 ? 'stepperOn' : ''} inline-flex justify-center items-center`}>4</span>
              <span className={`title ${currentStep >= 4 ? 'stepperOn' : ''}`}>前往付款</span>
            </span>
            <span className='step-arrow'>
              <i className="fa-solid fa-chevron-right fa-sm" style={{ color: '#d1d3d6' }}></i>
            </span>
          </div>
          <div className="step-container flex items-center">
            <span className='stepper inline-flex items-center'>
              <span className={`num ${currentStep >= 5 ? 'stepperOn' : ''} inline-flex justify-center items-center`}>5</span>
              <span className={`title ${currentStep >= 5 ? 'stepperOn' : ''}`}>取得票券</span>
            </span>
            <span className='step-arrow'>
              <i className="fa-solid fa-chevron-right fa-sm" style={{ color: '#d1d3d6' }}></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartHeader
