import LOGO from '../assets/images/common/icon-logo.svg';


const CartHeader = () => {
  return (
    <div className="cart-header-wrapper">
      <header className="cart-header-bar flex justify-center items-center">
        <a href="/"  className="cart-logo"> 
          <img src={LOGO} alt="" />
        </a>
      </header>
      <div className="stepper-header-wrap">
        <div className="stepper-bar flex">
          <div className="step-container flex items-center">
            <span className='stepper inline-flex items-center'>
              <span className='num stepperOn inline-flex justify-center items-center'>1</span>
              <span className='title stepperOn '>確認付款</span>
            </span>
            <span className='step-arrow'>
              <i className="fa-solid fa-sm fa-chevron-right"></i>
            </span>
          </div>
          <div className="step-container flex items-center">
            <span className='stepper inline-flex items-center'>
              <span className='num stepperOn inline-flex justify-center items-center'>2</span>
              <span className='title stepperOn '>填寫資料</span>
            </span>
            <span className='step-arrow'>
              <i className="fa-solid fa-sm fa-chevron-right"></i>
            </span>
          </div>
          <div className="step-container flex items-center">
            <span className='stepper inline-flex items-center'>
              <span className='num inline-flex justify-center items-center'>3</span>
              <span className='title'>選擇付款</span>
            </span>
            <span className='step-arrow'>
              <i className="fa-solid fa-chevron-right fa-sm" style={{ color: '#d1d3d6' }}></i>
            </span>
          </div>
          <div className="step-container flex items-center">
            <span className='stepper inline-flex items-center'>
              <span className='num inline-flex justify-center items-center'>4</span>
              <span className='title'>前往付款</span>
            </span>
            <span className='step-arrow'>
              <i className="fa-solid fa-chevron-right fa-sm" style={{ color: '#d1d3d6' }}></i>
            </span>
          </div>
          <div className="step-container flex items-center">
            <span className='stepper inline-flex items-center'>
              <span className='num inline-flex justify-center items-center'>5</span>
              <span className='title'>取得票券</span>
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
