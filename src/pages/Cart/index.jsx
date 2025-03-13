import NoticeIcon from '@/assets/images/common/noticeCard/noticeCard-icon.svg'

import { homeApi } from "@/api/home"
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
// import { useCartStore } from '@/store/cart'


const Cart = () => {
  const params = useParams() //動態參數params
  const routeId = Number(params.id) //轉換成數字
  const [ event, setEvent ] = useState(null)
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false)
  // const { cart, setCart } = useCartStore
 
  // 根據 id 從 recommendData 中抓取資料
  const getRecommendData = async() => {
    const { data: events } = await homeApi.getRecommend()
    const detail = events.find(item => item.id === routeId)
    setEvent(detail)
  }
  useEffect(() => {
    getRecommendData()
  },[]) //沒有依賴陣列,表掛載時執行一次 //如[]內有變數則再執行一次(當routeId變化時重新執行)

  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  //用state控制必填選項 
  // const [nameInputValue, setNameInputValue] = useState()
  // const [emailInputValue, setEmailInputValue] = useState()
  // const [phoneInputValue, setPhoneInputValue] = useState()
  // const [selectedGender, setSelectedGender] = useState()
  // const [formErrors, setFormErrors] = useState({ name: false, email: false, phone: false, gender: false })
  //   const GoToStep2 = () => {
  //     const errors = {
  //       name: !nameInputValue,
  //       email: !emailInputValue,
  //       phone: !phoneInputValue,
  //       gender: !selectedGender
  //     }
  //     setFormErrors(errors)
  //       if (!Object.values(errors).includes(true)) {
  //         navigate(`/cart/${routeId}/step2`)
  //       }
  //   }

  const GoToStep2 = () => {
    if (isChecked){
      navigate(`/cart/${routeId}/step2`) 
    }
  }

  const BackToTicket = () => {
    navigate(`/ticket/${routeId}`)
  }

  
  
  if (!event) return <div>loading...</div>
  return (
    // <CartHeader ={xxx}> 要設定為當前步驟
    <div className="pt-[108px]" style={{ backgroundColor: '#eff4fb' }}>
      <div className="cartPage flex w-[1080px] min-h-[calc(100vh-120px)] ">
        <div className="event-info-wrapper inline-block w-[25%]">
          <img className="mb-[24px]" src={event.image} alt="" />
          <div className="event-info-timer">
            {/* timer-tick需要網頁倒數功能 用settimeout? */}
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
        <div className="RegistrationPage-registration">
          <div className="registration-headline">填寫參加人資訊
            <p className='registration-headline-des'>報名資料將用於主辦單位安排活動，活動票券相關資訊將寄至訂購人信箱，如需修改電郵地址請至 <a href="">帳號管理</a></p>
          </div>
          <div className="registration-forms">
            <div className="registration-form-items">
              <div className={"form-field"}>
                <div className="field-label"><span className='field-required'>*</span>姓名</div>
                <input type="text" step={'1'} maxLength={'1000'}  />
                {/* {formErrors.name && <div className="error-message">必填</div>} */}
              </div>
              <div className={"form-field"}>
                <div className="field-label"><span className='field-required'>*</span>電子郵件</div>
                <input type="text" step={'1'} maxLength={'1000'} />
                {/* {formErrors.name && <div className="error-message">必填</div>} */}
              </div>
              <div className={"form-field"}>
                <div className="field-label"><span className='field-required'>*</span>行動電話</div>
                <div className="field-container flex flex-row">
                  <select className='Select country-select w-[30%] mr-[12px]' name="" id="" >
                    <option value="">請選擇</option>
                    <option value="886">台灣 +886</option>
                    <option value="81">日本 +81</option>
                    <option value="82">南韓 +82</option>
                    <option value="82">新加坡 +65</option>
                    <option value="82">美國 +1</option>
                    <option value="82">澳洲 +61</option>
                  </select>
                  <input className='flex-1' type="text" step={'1'} maxLength={'50'}/>
                </div>
                  {/* {formErrors.name && <div className="error-message">必填</div>} */}
              </div>
              <div className={"form-field"}>
                <div className="field-label"><span className='field-required'>*</span>性別</div>
                <div className="radioButton-box flex flex-col" >
                  <label className="radioButton-normal bolck mb-[16px]">
                    <i className='radioButton-btn'></i>
                    <span className="radioButton-text">不公開</span>
                  </label>
                  <label className="radioButton-normal bolck mb-[16px]" >
                    <i className='radioButton-btn'></i>
                    <span className="radioButton-text">男性</span>
                  </label>
                  <label className="radioButton-normal bolck mb-[16px]" >
                    <i className='radioButton-btn'></i>
                    <span className="radioButton-text">女性</span>
                  </label>
                </div>
                {/* {formErrors.name && <div className="error-message">必填</div>} */}
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
            <button className={`next-btn ${isChecked ? '' : 'disabled'}`} disabled={!isChecked} onClick={GoToStep2}>下一步</button>
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
export default Cart;
