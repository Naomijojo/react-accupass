import NoticeIcon from '@/assets/images/common/noticeCard/noticeCard-icon.svg'
import PaymentIconChecked from '@/assets/images/common/payment-icon-checked.svg'

import { homeApi } from "@/api/home"
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'


const Step2 = () => {
  const params = useParams() //動態參數params
  const routeId = Number(params.id) //轉換成數字
  const [ event, setEvent ] = useState(null)
  const navigate = useNavigate()


  // 根據 id 從 recommendData 中抓取資料
  const getRecommendData = async() => {
    const { data: events } = await homeApi.getRecommend()
    const detail = events.find(item => item.id === routeId)
    setEvent(detail)
  }
  useEffect(() => {
    getRecommendData()
  },[]) //沒有依賴陣列,表掛載時執行一次 //如[]內有變數則再執行一次(當routeId變化時重新執行)

  const GoToStep3 = () => {
    navigate('/cart/${routeId}/step3') 
  }
  const BackToCart =() => {
    navigate(`/cart/${routeId}`)
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
              <span className="OrderDetail-toggle">
                + 查看訂單細項
              </span>
            </div>
            <div className="OrderDetail-detail"></div>
          </div>
          <div className="Payment-types-container">
            <div className="mt-[32px] text-[14px] ">請選擇付款方式</div>
            <div className="Payment-type-group">
              <div className="Payment-group-heading">
                <div className="flex items-center">
                  <img className='max-w-[45px]' src={'https://static.accupass.com/frontend/image/payment/payicon_online.png'} alt="" />
                  <div className="payment-left">線上付款</div>
                </div>
              </div>
              <div className="Payment-wrap">
                <div className="flex items-center cursor-pointer">
                  <img className='max-w-[45px]' src={'https://static.accupass.com/frontend/image/payment/payicon_allpaycreditcard.png'} alt="" />
                  <div className="payment-left">信用卡 - VISA / Master Card / JCB</div>
                  <img className='Payment-icon-checked' src={PaymentIconChecked} alt="" />
                </div>
              </div>
              <div className="Payment-wrap">
                <div className="flex items-center cursor-pointer">
                  <img className='max-w-[45px]' src={'https://static.accupass.com/frontend/image/payment/payicon_linepay.png'} alt="" />
                  <div className="payment-left">LINE PAY</div>
                  <img className='Payment-icon-checked' src={PaymentIconChecked} alt="" />
                </div>
              </div>
              <div className="Payment-wrap">
                <div className="flex items-center cursor-pointer">
                  <img className='max-w-[45px]' src={'https://static.accupass.com/frontend/image/payment/payicon_jkopay.png'} alt="" />
                  <div className="payment-left">街口支付</div>
                  <img className='Payment-icon-checked' src={PaymentIconChecked} alt="" />
                </div>
              </div>
            </div>
            <div className="Payment-type-group">
              <div className="Payment-group-heading">
                <div className="flex items-center">
                  <img className='max-w-[45px]' src={'https://static.accupass.com/frontend/image/payment/payicon_offline.png'} alt="" />
                  <div className="payment-left">線下付款</div>
                </div>
              </div>
              <div className="Payment-wrap">
                <div className="flex items-center cursor-pointer">
                  <img className='max-w-[45px]' src={'https://static.accupass.com/frontend/image/payment/payicon_chainstore.png'} alt="" />
                  <div className="payment-left">超商代碼 - 全家 FamiPort</div>
                  <img className='Payment-icon-checked' src={PaymentIconChecked} alt="" />
                </div>
              </div>
              <div className="Payment-wrap">
                <div className="flex items-center cursor-pointer">
                  <img className='max-w-[45px]' src={'https://static.accupass.com/frontend/image/payment/payicon_virtualaccount.png'} alt="" />
                  <div className="payment-left">ATM轉帳 - 國泰世華銀行</div>
                  <img className='Payment-icon-checked' src={PaymentIconChecked} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="Checkout-buttons-container flex mt-[20px]">
            <button className='Checkout-pre-btn' onClick={BackToCart}>上一步</button>
            <button className='Checkout-next-btn' onClick={GoToStep3}>前往付款</button>
          </div>
          </div>
      </div>          
      </div>
  )
}

export default Step2
