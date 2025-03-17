import NoticeIcon from '@/assets/images/common/noticeCard/noticeCard-icon.svg'
import PaymentIconChecked from '@/assets/images/common/payment-icon-checked.svg'

import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCartStore, } from '@/store/cart'
import { paymentOptions } from '@/utills/payments'
// import { Dropdown } from 'antd';

  // 付款方式狀態
  // const [creditCard, setCreditCard] = useState(true)
  // const [linePay, setLinePay] = useState()
  // const [street,setStreet] = useState(0)
  // const [famiPort, setFamiPort] = useState()
  // const [atm, setAtm] = useState()
  // const [disabled, setDisabled] = useState(true)

const Step2 = () => {
  const navigate = useNavigate()
  const [ searchParams ] = useSearchParams()
  const orderId = searchParams.get('orderId')
  const { order, setOrder } = useCartStore()  
  
  //   ->1.拿取payment資料  ->2.payment完成後用find把order拿過來
  // 管理當前選中的付款方式
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0].label)

  // 處理付款方式變更
  const handlePaymentChange = (label) => {
    setSelectedPayment(label) // 更新選中的付款方式
  };
  

  const GoToStep3 = () => {
    
    const handleCheckout = order.map(item =>
      item.id === Number(orderId) ? { ...item, payment: selectedPayment } : item
    );
    console.log('Selected Payment:', selectedPayment)
    console.log('Order ID:', orderId)

    setOrder(handleCheckout)
    navigate(`/cart/step3?{orderId}=${orderId}`)
  }

  const BackToCart =() => {
    navigate(`/cart?ticketId=${orderId}`)
  }


  if (!event) return <div>loading...</div>
  return (
    <div className="pt-[108px]" style={{ backgroundColor: '#eff4fb' }}>
      <div className="cartPage flex w-[1080px] min-h-[calc(100vh-120px)] ">
      <div className="event-info-wrapper inline-block w-[25%]">
        <img className="mb-[24px]" src={event.image} alt="" />
        <div className="event-info-timer">
          <span className='timer-tick'>20:00</span>
          <span className='timer-description'>為確保您的權益，未完成訂單將自動取消</span>
        </div>
        <div className="event-info-content">
          <p className="event-info-itemName mb-[20px]">{event.title}</p>
          <p className="event-info-itemTime mb-[5px]">{event.time}</p>
          <p className="event-info-itemAddress mb-[5px]">{event.address}</p>
          <div className="mt-[24px]">
            <div className="notice-card flex flex-col items-start gap-2">
              <div className="notice-title flex gap-2 ">
                <img src={NoticeIcon} alt="" />
                <div className="flex items-center" style={{color:'#595e64'}}>退票規則</div>
              </div>
              <div className="notice-content">
                <p className="mb-[5px]">
                  本活動委託 ACCUPASS 代為處理退款事宜，依退款規則辦理。如需申請退款請於「購買成功 24 小時後，並於活動票券有效開始日前 8 日」辦理，並將酌收票價 10% 退票手續費，逾期恕不受理。
                </p>
              </div>
            </div>
            <div className="notice-card flex flex-col items-start gap-2">
              <div className="notice-title flex gap-2 ">
                <img src={NoticeIcon} alt="" />
                <div className="flex items-center" style={{color:'#595e64'}}>退票須知</div>
              </div>
              <div className="notice-content">
                <p className="mb-[5px]">
                請注意，你應該先報名完成一筆訂單後再報名下一筆。為保障消費者權益及杜絕非法囤票，同一使用者同時間只能報名一筆訂單，透過多開視窗同時報名、購買多筆訂單，系統將只保留最後一筆訂單，取消先前尚未報名完成之訂單，敬請理解與配合。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="viewPage w-[75%] ml-[3%]">
          <div className="couponCode-container inline-block w-[710px]">
            <div className="couponCode-discount mb-[28px] bg-white">
              <div className="couponCode-discount-headline">請輸入優惠代碼</div>
              <div className="couponCode-discount-panel flex h-[54px]">
                <input className='couponCode-code couponCode-locked' maxLength={50} placeholder='請輸入優惠代碼' />
                <button className='couponCode-discount-btn couponCode-discount-disabled'>兌換</button>
              </div>
            </div>
          </div>
          <div className="OrderDetail-container block">
            <div className="OrderDetail-headline flex">
              <div>
                <span className='detail-label'>付款金額</span>
                <span className='detail-amount'>$350</span>
              </div>
            </div>
            <div className="OrderDetail-detail"></div>
          </div>
          <div className="Payment-types-container">
            <div className="mt-[32px] text-[14px] ">請選擇付款方式</div>
            <div className="Payment-type-group">
              <div className="Payment-group-heading">
                <div className="flex items-center">
                  <img className='max-w-[45px]' src='https://static.accupass.com/frontend/image/payment/payicon_online.png' alt="" />
                  <div className="payment-left">線上付款</div>
                </div>
              </div>
              {paymentOptions.slice(0,3).map((item) => (
                <div key={item.value}>
                  <div className={`Payment-wrap ${selectedPayment === item.label ? 'selected' : ''}`} onClick={() => handlePaymentChange(item.label)}>
                    <div className="flex items-center cursor-pointer">
                      <img className='max-w-[45px]' src={item.icon} alt="" />
                      <div className="payment-left">{item.label}</div>
                      {selectedPayment === item.label && (
                        <img className="Payment-icon-checked" src={PaymentIconChecked} alt="" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="Payment-type-group">
              <div className="Payment-group-heading">
                <div className="flex items-center">
                  <img className='max-w-[45px]' src='https://static.accupass.com/frontend/image/payment/payicon_offline.png' alt="" />
                  <div className="payment-left">線下付款</div>
                </div>
              </div>
              {paymentOptions.slice(3).map((item) => (
                <div key={item.value} className={`Payment-wrap ${selectedPayment === item.label ? 'selected' : ''}`} onClick={() => handlePaymentChange(item.label)}>
                  <div className="flex items-center cursor-pointer">
                    <img className='max-w-[45px]' src={item.icon} alt="" />
                    <div className="payment-left">超商代碼 - 全家 FamiPort</div>
                    {selectedPayment === item.label && <img className='Payment-icon-checked' src={PaymentIconChecked} alt="" />}
                  </div>
                </div>
               ))}
            </div>
            
          </div>
          <div className="Checkout-buttons-container flex mt-[20px]">
            <button className='Checkout-pre-btn' onClick={BackToCart}>上一步</button>
            <button className='Checkout-next-btn'onClick={GoToStep3 } >前往取票</button>
          </div>
        </div>
      </div>          
    </div>
  )
}

export default Step2
