import EventCard from "@/components/EventCard"
import ArticleCard from "@/components/ArticleCard"
import TabNav from "@/components/TabNav" 
import mockTabs from "@/mock/data/tabs.json" 

import { Carousel } from 'antd'
import { useState, useEffect } from 'react'
import { homeApi } from "@/api/home"
import { useNavigate } from "react-router-dom"


const Home = () => {
  const navigate = useNavigate()

  const [recommendData, setRecommendData] = useState([])
  const [articleData, setArticleData] = useState([])
  const [tabs,setTabs] = useState([]) 

  const getRecommendData = async() => {
    const { data } = await homeApi.getRecommend()
      console.log(data);
      setRecommendData(data)
  }
  const getArticleData = async() => {
    const { data } = await homeApi.getArticle()
      console.log(data);
      setArticleData(data)
  }

  useEffect(() => {
    getRecommendData()
    getArticleData()
    setTabs(mockTabs)  
  }, [])

  return (
    <div className="pt-[122px]">
      <TabNav tabs={tabs} /> 
      <div className="carousel-container">
        <Carousel autoplay={true} arrows className="mt-[10px] mb-[14px]">
          <img className="object-contain rounded-[16px]" src="https://static.accupass.com/eventbanner/2502030803422063300661.jpg" alt=""/>
          <img className="object-contain rounded-[16px]" src="https://static.accupass.com/eventbanner/2501240152185756013960.jpg" alt=""/>
          <img className="object-contain rounded-[16px]" src="https://static.accupass.com/eventbanner/2408271309098543704770.jpg" alt=""/>
          <img className="object-contain rounded-[16px]" src="https://static.accupass.com/eventbanner/2502260338266866880440.jpg" alt=""/>
          <img className="object-contain rounded-[16px]" src="https://static.accupass.com/eventbanner/2501211525081715725743.jpg" alt=""/>
        </Carousel>   
      </div>
      <div className="container max-w-[1080px]">

        <div className="themes-wrap">
          <h2 className="theme-title">熱門推薦</h2>
          <div className="flex flex-wrap gap-x-[30px] gap-y-[16px] whitespace-nowrap">
            {recommendData.filter(item => item.category === 'recommend').map((item) =>(
            <EventCard
              key={item.id} 
              image={item.image}
              time={item.time}
              title={item.title}
              location={item.location}
              tag={item.tag}
              onGoToPage={()=> navigate(`/event/${item.id}`)}
            />
            ))}
          </div>
        </div>

        <div className="article-wrap">
          <h2 className="article-title">每天一點新鮮事</h2>
          <div className="flex justify-between gap-x-[20px] whitespace-nowrap">
            {articleData.filter(item => item.category === 'news-1').map((item) =>(
            <ArticleCard
              key={item.id}
              image={item.image}
              title={item.title}
            />
            ))}
          </div>
        </div>        

        <div className="themes-wrap">
          <h2 className="theme-title">精選活動</h2>
          <div className="flex flex-wrap gap-x-[30px] gap-y-[16px] whitespace-nowrap">
            {recommendData.filter(item => item.category === 'featured-1').map((item) =>(
            <EventCard
              key={item.id} 
              image={item.image}
              time={item.time}
              title={item.title}
              location={item.location}
              tag={item.tag}
              views={item.views}
              likes={item.likes}
              onGoToPage={()=> navigate(`/event/${item.id}`)}
            />
            ))}
          </div>
        </div>
            
        <div className="article-wrap">
          <h2 className="article-title">每天一點新鮮事</h2>
          <div className="flex justify-between gap-x-[20px] whitespace-nowrap">
            {articleData.filter(item => item.category === 'news-2').map((item) =>(
              <ArticleCard
                key={item.id}
                image={item.image}
                title={item.title}
              />
            ))}
          </div>
        </div>

        <div className="themes-wrap">
          <h2 className="theme-title">精選活動</h2>
          <div className="flex flex-wrap gap-x-[30px] gap-y-[16px] whitespace-nowrap">
            {recommendData.filter(item => item.category === 'featured-2').map((item) =>(
            <EventCard
              key={item.id} 
              image={item.image}
              time={item.time}
              title={item.title}
              location={item.location}
              tag={item.tag}
              views={item.views}
              likes={item.likes}
              onGoToPage={()=> navigate(`/event/${item.id}`)}
            />
            ))}
          </div>
        </div>

        <div className="article-wrap">
          <h2 className="article-title">每天一點新鮮事</h2>
          <div className="flex justify-between gap-x-[20px] whitespace-nowrap">
            {articleData.filter(item => item.category === 'news-3').map((item) =>(
            <ArticleCard
              key={item.id}
              image={item.image}
              title={item.title}
            />
            ))}
          </div>
        </div>

        <div className="themes-wrap">
          <h2 className="theme-title">精選活動</h2>
          <div className="flex flex-wrap gap-x-[30px] gap-y-[16px] whitespace-nowrap">
            {recommendData.filter(item => item.category === 'featured-3').map((item) =>(
            <EventCard
              key={item.id} 
              image={item.image}
              time={item.time}
              title={item.title}
              location={item.location}
              tag={item.tag}
              views={item.views}
              likes={item.likes}
              onGoToPage={()=> navigate(`/event/${item.id}`)}
            />
            ))}
          </div>
        </div>
        <div className="event-more-bottom-container">
          <button className="event-more-bottom">更多活動</button>
        </div>
      </div>
    </div>    
  )
}   

export default Home