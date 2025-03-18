import NoticeIcon from '@/assets/images/common/noticeCard/noticeCard-icon.svg'


import { homeApi } from "@/api/home"
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@/store/cart'
import { formatDate } from '@/utills/time'

const Ticket = () => {
  const params = useParams() // 動態參數params
  const routeId = Number(params.id) // 轉換成數字
  const [ event, setEvent] = useState(null)
  const [ tickets, setTickets ] = useState([])
  const [ totalPrice, setTotalPrice] = useState(0)
  const [ totalQty, setTotalQty] = useState(0)
  const navigate = useNavigate()
  const { cart, setCart } = useCartStore() 
  const { setTotalPrice: setGlobalTotalPrice } = useCartStore() // 把totalPrice變成全局狀態 才能在step2頁面抓總金額

  // ** 解構賦值後都抓不到tickets的資料 都變成undefiend 但是data都有資料 
  const getEventData = async () => {
    const { data } = await homeApi.getRecommend();
    const detail = data.find(item => item.id === routeId) //把 data 用 find 找到 item.id 等於 routeId 的值，並將這個值命名為 detail +-時再增加一個屬性
    
    if(detail){
      setEvent(detail) //這裡將 detail（找到的活動資料）設置為 event 的值。
      setTickets(detail.tickets?.map(item => ({ ...item, qty: 0 })) ?? [])
      // setTickets(detail.tickets || []) //如果 detail.tickets 存在，則將其設置為 tickets 的值；如果 detail.tickets 是 undefined 或 null，則使用空陣列 ([]) 作為預設值。
    }
  }
  
  const addQty = (id) => {
    // 更新狀態函數
    // prevTickets prev表示拿取上一個函數來更新
    // 用map拿出來 三元條件是:如果item.id === id 就修改當前qty每次都+1 如果不等於就回傳本來的item 
    setTickets((prevTickets) => 
      prevTickets.map((item) => item.id === id ? { ...item, qty: (item.qty||0) + 1  } : item ))
  }
  const removeQty = (id) => {
    setTickets((prevTickets) => 
      prevTickets.map((item) => 
        item.id === id ? { ...item, qty: Math.max((item.qty || 0) - 1, 0) } : item ))
  }
  
  const handleAddToCart = () => {   //點立即購票後 localstorage就會出現cart的key cart內資料會顯示剛剛選的張數資料 填完個資後點擊下一步到step2 cart的order會出現userInfo資料
    // 1.先過濾只傳遞/加入數量 >0 的數據 
    const newCart = tickets.filter(item => item.qty > 0 )
    // 2.過濾完加進『全局狀態』更新 (沒後端暫存localstorage)
    setCart([...cart, ...newCart]) //把原本的...cart拿過來 再把...newCart展開丟進去 本地端能看到tickets資料被帶過來 表示Ticket加入購物車成功
    // 3.? 開頭__key=${value} 表查詢字串 傳遞簡單數據給其他頁面
    navigate(`/cart?ticketId=${routeId}`) 
  }


  useEffect(() => {
    getEventData()
  }, []) 

  useEffect(() => {
    // 陣列.reduce((上一個值, 操作元素)=> ..., 初始值)
    // 陣列.reduce((初始值, 操作元素) => 初始值+當前元素價錢*當前元素數量, 初始值)
    const qtySum = tickets.reduce((prev, item) => prev + item.qty, 0)
    const priceSum = tickets.reduce((prev, item) => prev + item.price * item.qty, 0)
    setTotalPrice(priceSum)
    setGlobalTotalPrice(priceSum)
    setTotalQty(qtySum) 
  }, [tickets]) // []內有變數表依賴tickets變化時執行



  

  
  if (!event) return <div>loading...</div>
  
  
  return (
    <div className="pt-[50px]"  style={{ backgroundColor: '#eff4fb' }}>
      <div className="ticketPage flex w-[1080px] min-h-[calc(100vh-120px)]">
        <div className="event-info-wrapper inline-block w-[25%]">
          <img className="mb-[24px]" src={event.image} alt="" />
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
        <div className="ticketSelect-container inline-block ml-[3%] flex-1">
          <div className="ticketSelect-info min-h-[calc(100vh-303px)]">
            <h1 className="info-headline text-[14px] font-weight: 700 mb-2" style={{color:'#797979'}}>請選擇票券</h1>
            
            <div className="ticketSelectBox" >

              {tickets.map(item => (
                <div key={item.id} className="ticket-item w-[100%]">
                  <div className="ticket-info-container" style={{ width: '85%', paddingRight: '6%' }}>
                    <p className="ticket-name mb-[3px]">{formatDate(item.date)}{item.title}</p>
                    <p>
                      <span className="ticket-price inline-block ">{item.price}</span>
                      <span className="ticket-qty ticket-show "> <strong>x{item.qty}</strong> </span>
                    </p>
                    <p className="ticket-detail mt-[15px]">更多資訊</p>
                  </div>
                  <div className="ticket-box rounded-full ">
                  <div className="ticket-change"  onClick={() => addQty(item.id)}>
                      <span className="toggle-symbol">
                        <span className="ticket-add"> + </span>
                      </span>
                    </div>
                    <div className="ticket-amount " >{item.qty}</div>
                    <div className="ticket-change"  onClick={() => removeQty(item.id)}>
                      <span className="toggle-symbol">
                        <span className="ticket-minus"> - </span>
                      </span> 
                    </div>
                  </div>
                </div>

              ))}
              
            </div>

          </div>
        </div>
        
      </div>
      <div className="ticketSelect-bottom-container sticky flex justify-center">
        <div className="ticketSelect-bottom-item flex flex-col items-end w-[1080px]">
          <span className="ticketSelect-ticket-number">
            <span >{totalQty}張，</span>
            <span >NT$ {totalPrice}</span>
          </span>
          <button className="ticketSelect-confirm-button h-[40px]"  onClick={handleAddToCart} >立即購票</button>
        </div>
      </div>
    </div>
  )
}

export default Ticket