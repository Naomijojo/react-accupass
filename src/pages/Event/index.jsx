import EventCardView from "@/assets/images/common/icon-event-card-view.svg"
import EventCardHeart from "@/assets/images/common/icon-event-card-heart.svg"
import EventClockIcon from "@/assets/images/common/event-icon-time.svg"
import EventLocationIcon from "@/assets/images/common/event-icon-map.svg"
import EventIconLink from "@/assets/images/common/event-icon-link.svg"
import EventIconTags from "@/assets/images/common/event-icon-tags.svg" 

import { homeApi } from "@/api/home"
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useTicketStore } from '@/store/ticket'


const Event = () => {
   const params = useParams() //動態參數params
   const routeId = Number(params.id) //轉換成數字
   const [ event, setEvent ] = useState(null)
   const navigate = useNavigate()
   const { setTicket } = useTicketStore()
 
   // 根據 id 從 recommendData 中抓取資料
   const getRecommendData = async() => {
      const { data: events } = await homeApi.getRecommend()
      const detail = events.find(item => item.id === routeId)
      setEvent(detail)
   }
   useEffect(() => {
      getRecommendData()
   },[]) //沒有依賴陣列,表掛載時執行一次 //如[]內有變數則再執行一次(當routeId變化時重新執行)

   
   const handleTicket = (item) => {
      setTicket([item])
      navigate(`/ticket/${item.id}`) 
   }
   
   
   
   
   
   if (!event) return <div>loading...</div> 
   return (
      <div className="pt-[50px]">
         <div className="event-inner-container">
            <div className="event-banner-box">
               <div className="event-banner-bg min-w-[540px] rounded-[16px_16px_0_0]">
                  <img src={event.image} alt="" />
               </div>
               <div className="event-detail flex bg-[#FFF]">
                  <main className="event-detail-content max-w-[calc(100%-300px)]">
                     <section className="event-basicInfo-container">
                        <div className="event-header-container mt-[10px] mb-[24px]" >
                           <h1 className="event-title"> {event.title} </h1>
                           <div className="event-popularity-layout flex items-center">
                              <div className="event-popularity-item flex items-center mr-4">
                                 <span className="flex">
                                    <img className="mr-1" src={EventCardView} />{event.views}
                                 </span>
                              </div>  
                              <div className="event-popularity-item flex items-center ">
                                 <span className="flex"> 
                                    <img className="mr-1" src={EventCardHeart} alt="" />{event.likes} 
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="event-info-container flex flex-col mt-[10px] rounded-[16px] shadow-[0px_2px_8px_rgba(0,0,0,0.1)]">
                           <div className="event-subtitle-container flex mt-[10px]">
                              <img src={EventClockIcon} className="event-subtitle-icon" />
                              <div className="event-subtitle-content ml-[10px] leading-[24px]">
                                 <div className="event-subtitle">{event.time}
                                    <a href="https://calendar.google.com/calendar/u/0/r/eventedit?sf=true&output=xml&sprop=name:Accupass&sprop=website:https://www.accupass.com&text=2025%E7%B2%89%E7%B4%85%E7%91%9C%E7%8F%88&dates=20250308T073000Z/20250309T090000Z&location=%E5%8F%B0%E7%81%A3%E5%8F%B0%E5%8C%97%E5%B8%82%E4%BF%A1%E7%BE%A9%E5%8D%80%E5%BF%A0%E5%AD%9D%E6%9D%B1%E8%B7%AF%E4%BA%94%E6%AE%B58%E8%99%9F&details=%E6%B4%BB%E5%8B%95%E5%90%8D%E7%A8%B1%EF%BC%9A2025%E7%B2%89%E7%B4%85%E7%91%9C%E7%8F%88%0A%E6%B4%BB%E5%8B%95%E7%B6%B2%E5%9D%80%EF%BC%9Ahttps://www.accupass.com/event/2501120956491666733158?utm_campaign%3Daccu_theme&utm_medium=home_north&utm_source=Web" target="_blank" className="event-calendar-link inline-block ml-[15px]">
                                    加入行事曆
                                    </a>  
                                 </div> 
                              </div>
                           </div>
                           <div className="event-subtitle-container flex mt-[10px]">
                              <img src={EventLocationIcon} className="event-subtitle-icon" />
                              <div className="event-subtitle-content ml-[10px]">
                                 <a href="https://www.google.com/maps/search/?api=1&query=%E5%8F%B0%E7%81%A3%E5%8F%B0%E5%8C%97%E5%B8%82%E4%BF%A1%E7%BE%A9%E5%8D%80%E5%BF%A0%E5%AD%9D%E6%9D%B1%E8%B7%AF%E4%BA%94%E6%AE%B58%E8%99%9F" target="_blank">
                                    <div className="event-external-link flex items-center">{event.address}
                                       <img className="ml-1 event-icon-link"  src={EventIconLink} alt="" />
                                    </div>
                                    <p className="event-address-remark text-[#b5bac1]" >{event.addressRemark}</p>
                                 </a>
                              </div>
                           </div>
                           <div className="event-subtitle-container event-tags-container flex items-center mt-[10px] ">
                              <img className="ml-1 event-tag-icon" src={EventIconTags} alt="" />
                                 <div className="event-subtitle-content ml-[10px]">
                                    <ul className="event-content-tags-container flex items-center flex-wrap mt-[5px]">
                                       <li className="event-tag">
                                          <span target="_blank" >{event.tag}</span>
                                       </li>
                                    </ul>
                                 </div>
                           </div>
                           <section className="event-description">{event.description}</section>
                        </div>
                     </section>
                  </main>
                  <div className="orgInfo-container">
                     <div className="OrgInfo-box sticky top-[140px]" >
                        <div className="org-info">
                           <div className="org-title-container flex justify-start items-center gap-2">
                              <div className="avatarBase-module inline-block">
                                 <div className="avatarBase-img-container w-[52px] h-[52px] rounded-[50%]">
                                    <img className="avatar-img rounded-[50%]" src={event.avatarImg} alt="" />
                                 </div>
                              </div>
                              <p className="org-title">{event.orgTitle}</p>
                              <img width="16" height="16" src="https://static.accupass.com/frontend/image/event/org_icon_verified.svg" alt="verified" />
                           </div>
                            
                           <div className="org-description org-expand">
                              <p className="org-info-text">{event.orgInfoText}</p>
                           </div>
                           <button className="org-register-button flex justify-center items-center w-[200px] h-[50px] mt-[16px]" href="" onClick={() => handleTicket(event)}> 立即報名 <i className="fa-solid fa-chevron-right fa-lg"></i> </button>
                            
                           <div className="org-buttons-container flex justify-center items-center mt-[40px]" >
                              <div className="org-button flex justify-center " >

                                 <i className="fa-regular fa-heart fa-lg  w-[66px] h-[44px] separator cursor-pointer icon-hover"  ></i>
                                 <i className="fa-brands fa-facebook-f fa-lg w-[66px] h-[44px] separator cursor-pointer icon-hover" style={{color:'#bdbdbd'}} ></i>
                                 <i className="fa-solid fa-envelope fa-lg  w-[66px] h-[44px] cursor-pointer" style={{color:'#bdbdbd'}}  ></i>
                              </div>                              
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>      
      </div> 
   )};  
export default Event