import { homeApi } from "@/api/home"
import Loading from "@/components/Loading"
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import { useUserStore } from "@/store/user"
import {
  GoogleMap,
  MarkerF,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api'


const mapContainerStyle = {
  width: '100%',
  height: '400px',
}

const defaultCenter = {
  lat: 25.0330,   //台北101 經度
  lng: 121.5654   //台北101 緯度
}



const Map = () => {
  const params = useParams() //-動態參數params
  const routeId = Number(params.id) //-轉換成數字
  const [ event, setEvent ] = useState(null)
  const [ searchParams ] = useSearchParams()
  const [ isDataLoading, setIsDataLoading ] = useState(true)

  const [ isInfoOpen, setIsInfoOpen ] = useState(false)
  const [ currentPosition, setCurrentPosition ] = useState(defaultCenter)
  
  const { token, setIsModalOpen } = useUserStore()
  
   const ticketId = searchParams.get('ticketId')
  const navigate = useNavigate()

  const getEventData = useCallback(async() => {
    try {
      const { data } = await homeApi.getRecommend()
      const detail = data.find(item => item.id === routeId)
      
      if (!detail) {
        navigate('/not-found', { replace: true })
        return
      }
      setEvent(detail)
    } catch (error) {
      console.error('獲取活動資料失敗:', error)
      navigate('/not-found', { replace: true }) //避免無效 URL 留在歷史中
    }

    setIsDataLoading(false)
  }, [routeId, navigate])
  

  useEffect(() => {
    getEventData()
  }, [getEventData])
  

  const handleTicket = () => {
    if(token){
      navigate(`/fillOrder?ticketId=${routeId}`) 
    }else{
      setIsModalOpen(true)
    }
  }

  const BackToEvent = () => {
    console.log('ticketId:', ticketId);
    navigate(`/event/${routeId}`)
  }

  // 運行 Google Map 是否載入成功
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries: ['places'],
  })

  // useMemo 用來優化效能,目的是避免在每次 render 時都重新建立 google.maps.Size
  // 如果每次 render 都呼叫這個 constructor，但 SDK 還沒載入，就會噴錯google is undefined 或 google.maps is not a constructor。
  // useMemo 可以讓它「只在 isLoaded 為 true 時執行一次」。
  const pixelOffset = useMemo(() => {  
    if (isLoaded && window.google && window.google.maps) {
      return new window.google.maps.Size(0, -40) 
    }
    return undefined
  }, [isLoaded])

  useEffect(() => {
    if(!event) return
    setCurrentPosition(event.position)
  }, [event])

  
  
  // 如果 Google Maps 還沒載入或資料還在載入中，顯示 Loading
  if (!isLoaded || isDataLoading) return <Loading />
  return (
    <div className="map-container pt-[50px] max-w-[1080px]">
      <div className="flex border border-solid border-gray-400 mt-12">
        <div className="w-[40%] p-4 flex flex-col items-center">
          <img className="mb-6 w-[300px] h-[300px] object-fill rounded-md" src={event?.image} alt="" />
          <div className="title text-lg font-bold mb-6 ml-2 mr-2">{event?.title}</div>
          <div className="flex gap-8 font-bold">
            <button className="map-btn bg-pink-300 text-white px-7 py-3 rounded-lg" onClick={BackToEvent}>查看詳情</button>
            <button className="map-btn bg-blue-400 text-white px-7 py-3 rounded-lg" onClick={handleTicket}>立即報名</button>
          </div>
        </div>
        <div className="w-[70%] p-4">
          <h1 className="font-bold text-center text-[26px] mb-2" >活動地圖</h1>
          <div className="map-area h-full rounded-lg ">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={currentPosition}
              zoom={15}
            >
              <MarkerF
                position={currentPosition}
                onClick={() => setIsInfoOpen(true)}
                animation={window.google.maps.Animation.DROP}
              />
              {isInfoOpen && (
                <InfoWindow
                  position={currentPosition}
                  options={{
                    pixelOffset,
                    disableAutoPan: true,
                  }}
                  onCloseClick={() => setIsInfoOpen(false)}
                >
                <div className="text-sm max-w-[200px]">
                  <div className="font-bold mb-1">{event?.title}</div>
                  <div className="mb-1">
                    📍  {currentPosition.lat.toFixed(4)}, {currentPosition.lng.toFixed(4)}
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${currentPosition.lat},${currentPosition.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 font-bold"
                  >
                    🚗  前往 Google Maps 導航
                  </a>
                </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map
