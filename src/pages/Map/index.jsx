import { homeApi } from "@/api/home"
import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from "react-router-dom"


const Map = () => {
  const params = useParams() //動態參數params
  const routeId = Number(params.id) //轉換成數字
  const [ event, setEvent ] = useState(null)
  const [ searchParams ] = useSearchParams()
  const ticketId = searchParams.get('ticketId')
  const navigate = useNavigate()

  // 根據 id 從 recommendData 中抓取資料
  const getEventData = async() => {
    const { data } = await homeApi.getRecommend()
    const detail = data.find(item => item.id === routeId)
    setEvent(detail)
  }
  useEffect(() => {
    getEventData()
  },[])
  

  const handleTicket = () => {
    navigate(`/fillOrder?ticketId=${routeId}`) 
  }

  const BackToEvent = () => {
    console.log('ticketId:', ticketId);
    navigate(`/event/${routeId}`)
  }

  if (!event) return <div>loading...</div> 
  return (
    <div className="map-container pt-[50px] max-w-[1080px]">
      <div className="flex border border-solid border-gray-400 mt-12">
        <div className="w-[40%] p-4 flex flex-col items-center">
          <img className="mb-6 w-[300px] h-[300px] object-fill rounded-md" src={event.image} alt="" />
          <div className="title text-lg font-bold mb-6 ml-2 mr-2">{event.title}</div>
          <div className="flex gap-8 font-bold">
            <button className="map-btn bg-pink-300 text-white px-7 py-3 rounded-lg" onClick={BackToEvent}>查看詳情</button>
            <button className="map-btn bg-blue-400 text-white px-7 py-3 rounded-lg" onClick={handleTicket}>立即報名</button>
          </div>
        </div>
        <div className="w-[70%] p-4">
          <div className="map-area h-full bg-gray-300 rounded-lg">地圖區域</div>
        </div>
      </div>
    </div>
  )
}

export default Map
