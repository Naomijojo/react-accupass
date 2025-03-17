import EventCard from "@/components/EventCard"
import ArticleCard from "@/components/ArticleCard"
import BannerCard from "@/components/BannerCard"
import TabNav from "@/components/TabNav" 
import mockTabs from "@/mock/data/tabs.json" 

import { Carousel } from 'antd'
import { useState, useEffect } from 'react'
import { homeApi } from "@/api/home"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useUserStore } from '@/store/user'
import clsx from 'clsx' //darkMode

const Home = () => {
  const { t } = useTranslation() // 解構賦值出 t 函數 {t('xxx')}
  const navigate = useNavigate()
  const { darkMode } = useUserStore()
  
  const [recommendData, setRecommendData] = useState([])
  const [articleData, setArticleData] = useState([])
  const [bannerData, setBannerData] = useState([])
  const [tabs,setTabs] = useState([]) 
  
  const getRecommendData = async() => {
    const { data } = await homeApi.getRecommend()
    setRecommendData(data)
  }
  const getArticleData = async() => {
    const { data } = await homeApi.getArticle()
    setArticleData(data)
  }
  const getBannerData = async() => {
    const { data } = await homeApi.getRecommend()
    console.log(data)
    setBannerData(data)
  }


  useEffect(() => {
    getRecommendData()
    getArticleData()
    getBannerData()
    setTabs(mockTabs)  
  }, [])
  

  return (
    <div className={clsx("main pt-[122px]", { darkMode }) }>
      <TabNav tabs={tabs} /> 
      {/* 之後再教TabNav */}
      {/* <TabNav activeTab={activeTab} onChangeTab={changeTab} />
      {activeTab === 'featured' && <div>精選內容</div>}
      {activeTab === 'learning' && <div>學習內容</div>}
      {activeTab === 'art' && <div>藝文內容</div>}
      {activeTab === 'experience' && <div>體驗內容</div>} */}

      <div className="carousel-container cursor-pointer">
        <Carousel autoplay={true} arrows className="mt-[10px] mb-[14px]">
          {bannerData.filter(item => item.category === 'banner').map((item) =>(
            <BannerCard
              key={item.id} 
              image={item.image}
              onGoToPage={()=> navigate(`/event/${item.id}`)}
            />
          ))}
        </Carousel>   
      </div>
      <div className="container max-w-[1080px]">

        <div className="themes-wrap">
          <h2 className="theme-title">{t('hot_recommends')}</h2>
          <div className="theme flex flex-wrap gap-x-[30px] gap-y-[16px] whitespace-nowrap">
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
          <h2 className="article-title">{t('fresh_news')}</h2>
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
          <h2 className="theme-title">{t('featured_events')}</h2>
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
          <h2 className="article-title">{t('fresh_news')}</h2>
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
          <h2 className="theme-title">{t('featured_events')}</h2>
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
          <h2 className="article-title">{t('fresh_news')}</h2>
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
          <h2 className="theme-title">{t('fresh_news')}</h2>
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
          <button className="event-more-bottom">{t('more')}</button>
        </div>
      </div>
    </div>    
  )
}   

export default Home