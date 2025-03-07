// 點擊EventCard後 點進來的ticketPage會是當前EventCard的圖片.時間.地址 ?

import NoticeIcon from '@/assets/images/common/noticeCard/noticeCard-icon.svg'


import { homeApi } from "@/api/home";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 


const Ticket = () => {
  const params = useParams(); // 動態參數params
  const routeId = Number(params.id); // 轉換成數字
  const [event, setEvent] = useState(null);
  const navigate = useNavigate(); 

  const getEventData = async () => {
    const { data: events } = await homeApi.getRecommend();
    const detail = events.find(item => item.id === routeId);
    setEvent(detail);
  };

  useEffect(() => {
    getEventData();
  }, []);



  // onclick +-


  // 收合



  return (
    <div className="pt-[50px]"  style={{ backgroundColor: '#eff4fb' }}>
       <div className="ticketPage flex w-[1080px] min-h-[calc(100vh-120px)]">
          <div className="event-info-wrapper inline-block w-[25%]">
            <img className="mb-[24px]" src="https://static.accupass.com/eventbanner/2502040503526775598300_P520x260.jpg" alt="" />
            <div className="event-info-content">
              {/* {eventDetailData.map(item => (
                  <EventCard
                      key={item.id}
                      image={item.image}
                      time={item.time}
                      title={item.title}
                      location={item.location}
                      tag={item.tag}
                  />
              ))} */}

              <p className="event-info-itemName mb-[20px]">2025粉紅瑜珈</p>
              <p className="event-info-itemTime mb-[5px]">2025.03.08 (六) 15:30 - 03.09 (日) 17:00 (GMT+8)</p>
              <p className="event-info-itemAddress mb-[5px]">台灣台北市信義區忠孝東路五段8號</p>
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
                {/* 第一張ticket */}
                {/* ticket-item:hover 只有ticket-change由白底藍字變藍底白字
                ticket-change點擊時 +變成+-(並同時有ticket-item:hover效果)
                ticket-change被點擊出來時 點+-來新增或減少票數/新增有上限/減少到0恢復成未點擊狀態
                如增加票數會show在ticket-qty(原本display:none) 
                也會連動到ticketSelect-ticket-number的票數及總價*/}
                <div className="ticket-item w-[100%]">
                  <div className="ticket-info-container" style={{ width: '85%', paddingRight: '6%' }}>
                    <p className="ticket-name mb-[3px]"> 3/8【舞動有氧】單人早鳥票種</p>
                    <p>
                      <span className="ticket-price inline-block ">NT$ 499</span>
                      <span className="ticket-qty ticket-show"></span>
                    </p>
                    <p className="ticket-detail mt-[15px]">更多資訊</p>
                  </div>
                  <div className="ticket-change" >
                    <span className="toggle-symbol">
                      <span className="ticket-minus">-</span>
                      <span className="ticket-add">+</span>
                    </span>
                  </div>
                </div>
                {/* 第二張ticket */}
                <div className="ticket-item w-[100%]">
                  <div className="ticket-info-container" style={{ width: '85%', paddingRight: '6%' }}>
                    <p className="ticket-name mb-[3px]"> 3/8【舞動有氧】雙人早鳥票種</p>
                    <p>
                      <span className="ticket-price inline-block ">NT$ 699</span>
                      <span className="ticket-qty ticket-show"></span>
                    </p>
                    <p className="ticket-detail mt-[15px]">更多資訊</p>
                  </div>
                  <div className="ticket-change" >
                    <span className="toggle-symbol">
                      <span className="ticket-minus">-</span>
                      <span className="ticket-add">+</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
       </div>
       <div className="ticketSelect-bottom-container sticky flex justify-center">
          <div className="ticketSelect-bottom-item flex flex-col items-end w-[1080px]">
            <span className="ticketSelect-ticket-number">
              <span >總票數</span>
              <span >NT$ 0</span>
            </span>
            <button className="ticketSelect-confirm-button h-[40px]" onClick={() => navigate('/cart')} >立即購票</button>
          </div>
        </div>
    </div>
  )
}

export default Ticket
