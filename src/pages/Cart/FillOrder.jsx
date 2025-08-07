import NoticeIcon from '@/assets/images/common/noticeCard/noticeCard-icon.svg'

import { homeApi } from "@/api/home"
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams} from 'react-router-dom'
import { useCartStore } from '@/store/cart'
import { useTimerStore } from '@/store/timer'
import { formatDate } from '@/utills/time'
import { areaOptions } from '@/utills/constants'
import CountdownTimer from '@/components/CountdownTimer'

const genders = [ '不公開', '男性', '女性' ]


const FillOrder = () => {
  const navigate = useNavigate()
  const [ searchParams ] = useSearchParams()          // 拿URL中的參數
  const ticketId = searchParams.get('ticketId')       // 獲取ticketId參數
  // console.log('ticketId',ticketId) //  /cart?ticketId=1   1不是數字是字串
  
  const [ event, setEvent] = useState(null)           // 儲存活動資料
  const [ isChecked, setIsChecked ] = useState(false) // 預設打勾為不點擊狀態
  const { cart, orders, setOrders } = useCartStore()
  const { startTimer } = useTimerStore()

  // 獲取活動詳細資料
  const getRecommendData = async () => {
    const { data } = await homeApi.getRecommend()
    const detail = data.find(item => item.id === Number(ticketId))

    if(detail){
      setEvent(detail) 
    }
  }
  

  // 存取個人資料狀態
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [areaNumber,setAreaNumber] = useState(0)
  const [phone, setPhone] = useState()
  const [selectedGender, setSelectedGender] = useState('不公開')
  const [disabled, setDisabled] = useState(true)

  const GoToPayment = () => {
    // 1.拿取使用user資訊
    const userInfo = { name, email, phone:`(+${areaNumber})${phone}`, genders: selectedGender }
    // 2.拿取購物車商品 + 總價 => 加入訂單 (會在CartStore裡面的cart)
    const orderId = Date.now()
    const newOrder = {
      id: orderId,
      userInfo,
      cart,
    }
    console.log(newOrder)
    
    setOrders([ ...orders, newOrder])
    navigate(`/fillOrder/payment?ticketId=${ticketId}&orderId=${orderId}`)
  }

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked)
    }

    const BackToTicket = () => {
      navigate(`/ticket/${ticketId}`)
    }

    // 組件加載獲取活動數據
    useEffect(() => {
      getRecommendData()
    }, [])

    // 組件加載時啟動計時
    useEffect(() => {
      startTimer()
    }, [])

    // 表單輸入或勾選發生變化時 更新按鈕的禁用狀態
    useEffect(() =>{
      setDisabled(!isChecked || !name || !phone || !email)
    }, [name, email, areaNumber, phone, isChecked])

  
  
    if (!event) return <div>loading...</div>  
  return (
    <div className="pt-[108px]" style={{ backgroundColor: '#eff4fb' }}>
      <div className="cartPage flex flex-col lgx:flex-row w-full  min-h-[calc(100vh-120px)]">
        <div className="event-info-wrapper w-full mb-6 lg:w-[25%] lg:mb-0">
          <img className="mb-[24px] hidden lgx:block" src={event.image} alt="" />
          <div className="event-info-timer">
            <CountdownTimer />
            <span className='timer-description'>為確保您的權益，未完成訂單將自動取消</span>
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
        <div className="RegistrationPage-registration w-full lg:ml-[3%] lg:flex-1">
          <div className="registration-headline">填寫參加人資訊
            <p className='registration-headline-des'>報名資料將用於主辦單位安排活動，活動票券相關資訊將寄至訂購人信箱，如需修改電郵地址請至 <a href="">帳號管理</a></p>
          </div>
          <div className="registration-forms">
            <div className="registration-form-items">
              <div className={"form-field"}>
                <div className="field-label"><span className='field-required'>*</span>姓名</div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}  maxLength={'1000'} />
              </div>
              <div className={"form-field"}>
                <div className="field-label"><span className='field-required'>*</span>電子郵件</div>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={'1000'}/>
              </div>
              <div className={"form-field"}>
                <div className="field-label"><span className='field-required'>*</span>行動電話</div>
                <div className="field-container flex flex-row">
                  <select className='Select country-select w-[30%] mr-[12px]' value={areaNumber} onChange={(e) => setAreaNumber(e.target.value)}>
                    <option>請選擇</option>
                    {areaOptions.map(item => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                  <input className='flex-1' type="text"  maxLength={'50'} value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
              </div>
              <div className={"form-field"}>
                <div className="field-label"><span className='field-required'>*</span>性別</div>
                <div className="radioButton-box flex flex-col" >

                  {genders.map(item =>(
                    <label key={item} className="radioButton-normal bolck mb-[16px]" onClick={() => setSelectedGender(item)}>
                      {item === selectedGender ? (
                        <i className="fa-solid fa-circle-dot" style={{color: '#00a8fb'}}></i>
                      ) : (
                        <i className="fa-solid fa-circle" style={{color: '#e2e2e2'}}></i>
                      )}
                      <span className="radioButton-text">{item}</span>
                    </label>
                  ))}

                </div>
              </div>
              
            </div>
          </div>
          <div className="registration-agree mb-[25px]">
            <label className='checkBox flex items-center overflow-hidden'>
              <input type="checkbox" className="check-button" checked={isChecked} onChange={handleCheckboxChange}/>
              <span className='check-label '>我已閱讀並同意 ACCUPASS <a href="#!" target='blank'className='text-[#2ab3fc]' >票券訂購暨使用須知</a>、 <strong>退票規則</strong> 及 <strong>購票須知</strong> 條款</span>
            </label>
          </div>
          <div className="registration-buttons flex">
            <button className='prev-btn' onClick={BackToTicket}>重新報名</button>
            <button className={`next-btn ${disabled ? 'disabled': ''}`} disabled={disabled} onClick={GoToPayment}>下一步</button>
          </div>
         
          {/* {isModalOpen && (
            <div className="Modal">
              <div className="Modal-container relative">
                <div className="Cancel">
                  <div className="Cancel-oops">
                    <img src="https://static.accupass.com/frontend/image/common/accupass_noidea.png" alt="" />
                  </div>
                  <div className="Cancel-description">確認要刪除訂單，重新報名此活動？</div>
                </div>
                <div className="Cancel-buttons">
                  <button className='Cancel-back' onClick={handleChancel} >取消</button>
                  <button className='Cancel-confirm' onClick={handleConfirm} >確認</button>
                </div>
              </div>
            </div>
          )} */}

        </div>
      </div>
    </div>
  );
};  
export default FillOrder;