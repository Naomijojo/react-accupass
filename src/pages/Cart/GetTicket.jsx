import NoticeIcon from '@/assets/images/common/noticeCard/noticeCard-icon.svg'

import { homeApi } from "@/api/home"
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useCartStore, } from '@/store/cart'
import { formatDate } from '@/utills/time'
import { Collapse } from 'antd'


const GetTicket = () => {
  const navigate = useNavigate()
  const [ searchParams ] = useSearchParams()
  const ticketId = searchParams.get('ticketId')

  const { cart } = useCartStore() //獲取購物車數據

  const [ event, setEvent] = useState(null) 
  const getRecommendData = async () => {
    const { data } = await homeApi.getRecommend()
    const detail = data.find(item => item.id === Number(ticketId))

    if(detail){
      setEvent(detail) 
    }
  }
  useEffect(() => {
    getRecommendData()
  },[])

  const collapseItems = [
    {
      key: '1',
      label: ' 查看訂單細項',
      children: (
        <div className="OrderDetail-detail">
          {cart.map((item, index) => (
            <div key={index} className="OrderDetail-item block py-2 border-b">
              <div className="OrderDetail-headline flex justify-between">
                <span className="item-title font-medium">{item.title}</span>
                <span className="item-price text-blue-600">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      )
    }
  ]
  
  if (!event) return <div>loading...</div>
  return (
    <div className="pt-[108px]" style={{ backgroundColor: '#eff4fb' }}>
      <div className="cartPage flex flex-col lgx:flex-row w-full  min-h-[calc(100vh-120px)]">
        <div className="event-info-wrapper w-full mb-6 lg:w-[25%] lg:mb-0">
          <img className="mb-[24px] hidden lgx:block" src={event.image} alt="" />
          <div className="event-info-timer">
            <span className='timer-tick invisible' >20:00</span>
            <span className='timer-description text-center'>已完成報名</span>
          </div>
          <div className="event-info-content">
            <p className="event-info-itemName mb-[20px]">{event.title}</p>
            <p className="event-info-itemTime mb-[5px]">{formatDate(event.time)}</p>
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


      <div className="viewPage w-full lg:ml-[3%] lg:flex-1">
        <div className="OrderDetail-container block">
          <div className="couponCode-discount-headline text-center h-6 bg-[#0088d2]" style={{color:'#fff'}}>購票成功</div>
          {/* <div className="OrderDetail-headline flex">
            <span className='detail-label'>票券明細</span>
            <span className="OrderDetail-toggle">
                + 查看訂單細項
            </span>
          </div>
          <div className="OrderDetail-detail">
            {cart.map((item, index) => (
              <div key={index}  className="OrderDetail-item block">
                <div className="OrderDetail-headline flex ">
                  <span className="item-time">{item.time}</span>
                  <span className="item-title">{item.title}</span>
                  <span className="item-price">{item.price}</span>
                </div>
              </div>
            ))}
          </div> */}
          < Collapse items={collapseItems} size="large" />

          <div className="Checkout-buttons-container flex justify-end mt-[20px] lg:flex-1 ">
            <button className='Checkout-next-btn' onClick={() => navigate('/')}>查看更多活動</button>
          </div>
        </div>
      </div>
      </div>          
    </div>
  )
}

export default GetTicket
