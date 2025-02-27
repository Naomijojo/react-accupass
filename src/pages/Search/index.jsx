import { homeApi } from "@/api/home"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import EventCard from "@/components/EventCard";
import SearchHeader from "@/components/SearchHeader";
import SearchIcon from "@/assets/images/common/icon-search-filterbtn.svg"
import { Select } from 'antd';


//useState管理狀態/ useEffect處理狀態 / useSearchParams讀取和設置 URL 查詢參數(先在router設定好才抓的到) 

// 1.引用 getRecommend API: 在 getAllData 函數中，使用 homeApi.getRecommend() 獲取推薦數據，並將其賦值給 recommendData
// 2.過濾數據 : 查詢參數 tag 和 location 對 recommendData 進行過濾
// 3.渲染結果 : 根據過濾後的 searchData 渲染結果。如果沒有相關活動，顯示提示消息；如果有活動，則顯示活動的標題。

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchData, setSearchData] = useState([]);

  //查詢字串
  const location = searchParams.get('l')
  const tag = searchParams.get('q')
  console.log(`location ${location}`)
  console.log(`tag ${tag}`)

  const  getAllData = async() =>{
    //api獲取推薦卡片的資料
    const { data: recommendData } = await homeApi.getRecommend()
    console.log(recommendData)
    let filteredData = recommendData;
    
    //根據tag & location 過濾
    if(tag) {
      filteredData = filteredData.filter(item => item.tag === tag);
    }
    if(location){
      filteredData = filteredData.filter(item => item.location === location);
    }
    console.log(filteredData)
    setSearchData(filteredData)      
  }
  //依賴陣列：陣列中的參數改變才會重新執行,如果為空[]表示只在在掛載時執行一次
  useEffect(() => {
    getAllData();
  }, []);

  

  return (
    <div>
      <SearchHeader />
      <div className="pt-[72px]">
        <div className="container max-w-[1080px]">
          <h1 className="SearchTitle flex justify-center items-center">
            {location || tag ? `${location || ''} ${tag || ''}` : '所有活動'}
            {/* 條件檢查 location 或 tag 是否有值 ? `如果location(tag)有值則顯示該值`:沒有則顯示所有活動*/}
          </h1>

          <div className="SearchPageBar flex flex-col">
            <div className="SearchBarDrown">
              <Select
                className="search-select"
                defaultValue="輸入關鍵字"
                style={{ width: 400 , height: 40 }}
                // onChange={handleChange} 
                options={[
                  {
                    label: <span>最近搜尋</span>,
                    title: 'recent',
                    options: [
                      { label: <span>前端</span>, value: 'frontend' },
                      { label: <span>後端</span>, value: 'backend' },
                    ],
                  },
                  {
                    label: <span>熱門搜尋</span>,
                    title: 'popular',
                    options: [
                      { label: <span>大腦汗蒸幕</span>, value: '大腦汗蒸幕' },
                      { label: <span>空間攝影攻略</span>, value: '空間攝影攻略' },
                      { label: <span>掌握 ESG 商模關鍵</span>, value: '掌握 ESG 商模關鍵' },
                    ],
                  },
                  
                ]}
              />



              <div className="SearchBar flex justify-center items-center">
                <input type="search" placeholder="輸入關鍵字..." maxLength={80} />
                <img src={SearchIcon} alt="" className="search-icon" />
              </div>
            </div>
            <div className="SearchPage-divider"></div>  
          </div>
          {/* <div className="container max-w-[1080px] flex justify-start gap-x-[20px]">
            <div className="wrap pb-[40px]">
              <div className="filter-btn  gap-x-[20px]">
                  <div className="filter-btn-box">
                      <span className="text">主題</span>
                      <i className="fa-solid fa-angle-down fa-lg"></i>
                  </div>
                  <div className="filter-btn-box">
                      <span className="text">日期</span>
                      <i className="fa-solid fa-angle-down fa-lg"></i>    
                  </div>
                  <div className="filter-btn-box">
                      <span className="text">地點</span>
                      <i className="fa-solid fa-angle-down fa-lg"></i>    
                  </div>
              </div>
            </div>
          </div> */}

          {!searchData.length ? (
            <p>目前沒有相關活動</p>
          ) : (
          <div className="flex flex-wrap gap-x-[30px] gap-y-[16px]">
            {searchData.map(item => (
                <EventCard
                    key={item.id}
                    image={item.image}
                    time={item.time}
                    title={item.title}
                    location={item.location}
                    tag={item.tag}
                />
            ))}
          </div>
          )}

          <div className="SearchPage-divider mb-[50px]"></div>  
        </div>
      </div>
    </div>  
  )
}

export default Search
