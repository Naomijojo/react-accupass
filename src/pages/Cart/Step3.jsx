import { homeApi } from "@/api/home"
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'


const Step3 = () => {
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

  const GoToStep4 = () => {
    navigate('/cart/${routeId}/step4') 
  }



  if (!event) return <div>loading...</div>
  return (
    <div className="mt-[300px]" onClick={GoToStep4}>
      
      假裝這裡是跳轉的第三方支付頁面
      支付完成後會回到Step4的取得票券

    </div>
  )
}

export default Step3
