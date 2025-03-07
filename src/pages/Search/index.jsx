import { homeApi } from "@/api/home"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import EventCard from "@/components/EventCard";
import FilterhIcon from "@/assets/images/common/icon-search-filterbtn.svg"
import IconSearchHistory from "@/assets/images/common/icon-search-history.svg"
import sortButtonDown from "@/assets/images/common/icon-sortDown.svg"
import { Select } from 'antd'

//useState管理狀態/ useEffect處理狀態 / useSearchParams讀取和設置 URL 查詢參數(先在router設定好才抓的到) 

// 1.引用 getRecommend API: 在 getAllData 函數中，使用 homeApi.getRecommend() 獲取推薦數據，並將其賦值給 recommendData
// 2.過濾數據 : 查詢參數 tag 和 location 對 recommendData 進行過濾
// 3.渲染結果 : 根據過濾後的 searchData 渲染結果。如果沒有相關活動，顯示提示消息；如果有活動，則顯示活動的標題。



const Search = () => {
  //使用useSearchParams查詢參數
  const [searchParams] = useSearchParams();
  //searchData:搜尋到的資料
  const [searchData, setSearchData] = useState([]);
  //isSearchClick:是否點擊搜尋
  const [isSearchClick, setIsSearchClick] = useState(false);
  //searchHistory:搜尋紀錄
  const [searchHistory, setSearchHistory] = useState([]);
  //allData:所有資料
  const [allData, setAllData] = useState([]);
  //input的值
  const [value, setValue] = useState('');



  //查詢字串
  const location = searchParams.get('l')
  const tag = searchParams.get('q')
  console.log(`location ${location}`)  
  console.log(`tag ${tag}`)  

  const  getAllData = async() =>{
    //api獲取推薦卡片的資料
    const { data: recommendData } = await homeApi.getRecommend()
    setAllData(recommendData)
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
  
  //重複代碼包在一起並命名為addSearchHistory
  const addSearchHistory = (newSearchHistory) => {
    localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory))
    setSearchHistory(newSearchHistory)
  }

  const handleSearch = (keyword) =>{
    const filteredData = allData.filter(item => item.title.includes(keyword))
    setSearchData(filteredData)
  } 

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 ){
      const keyword = e.target.value.trim()
      //用keyword搜尋 (title的關鍵字)
      handleSearch(keyword)

      if (searchHistory.some(item => item === keyword)) return 
      const newSearchHistory = [...searchHistory, e.target.value]
      addSearchHistory(newSearchHistory)
  }
  const handleDeleteSearchHistory = (keyword) => {
    const newSearchHistory = searchHistory.filter(item => item !== keyword)
    addSearchHistory(newSearchHistory)
    setValue('')
  }}




  //掛載時執行
  useEffect(() => {
    //取得localStorage的searchHistory
    const searchHistoryStorage = localStorage.getItem('searchHistory')
    //如果有值就轉成JSON格式
    if (searchHistoryStorage) {
      //將JSON格式的searchHistory存入searchHistory
      setSearchHistory(JSON.parse(searchHistoryStorage))
    }
    //如果沒有值就設定為空陣列
  },[])

  return (
    <div>
      <div className="pt-[72px]">
        <div className="container max-w-[1080px]">
          <h1 className="SearchTitle flex justify-center items-center">
            {location || tag ? `${location || ''} ${tag || ''}` : '所有活動'}
            {/* 條件檢查 location 或 tag 是否有值 ? `如果location(tag)有值則顯示該值`:沒有則顯示所有活動*/}
          </h1>

          <div className="SearchPageBar flex flex-col">
            <div className="SearchBarDrown relative ">
              <div className="SearchBar flex justify-center items-center">
                <input type="search" placeholder="輸入關鍵字..." maxLength={80} value={value} onChange={(e) => setValue(e.target.value)}
                onClick={() => setIsSearchClick(true)}  
                onKeyDown={handleKeyDown} />
                <img src={FilterhIcon} alt="" className="search-icon" />
              </div>
              <button className="sort-button flex">
                <span > 排序 </span>
                <img src={sortButtonDown} alt="" />
              </button>

              {isSearchClick && (
                <div className=" hidden absolute w-full top-full rounded-[16px] shadow-[4px_9px_25px_rgba(59,63,69,0.15)] z-10 bg-white p-6">
                  {searchHistory.length ? (
                    <>
                      <h1 className="text-[18px] font-[600] mb-2" style={{color:'#3b3f45'}}>搜尋紀錄</h1>
                      <ul className="my-4">
                        {searchHistory.map(item => (  
                          <li key={item} className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <img src={IconSearchHistory} alt="" />
                              <span className="cursor-pointer text-gray-800 hover:text-gray-400" onClick={() => handleSearch(item)} >{item}</span>
                            </div>
                            <button className="hover:text-gray-400" onClick={()=> handleDeleteSearchHistory(item)}>
                              <i className="fa-solid fa-xmark " style={{color:'#959ba1'}}></i>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>      
                  ) : ''}

                  <h1 className="text-[18px] font-[600] mb-2" style={{color:'#3b3f45'}}>熱門搜尋</h1>
                  <ul className="my-4">
                    <div className="tag-module inline-flex ">
                      <li className="text-gray-800 hover:text-gray-400">
                        <span className="text-gray-500">前端</span>
                      </li>
                    </div>
                    <div className="tag-module inline-flex">
                      <li className="text-gray-800 hover:text-gray-400">
                        <span className="text-gray-500 ">後端</span>
                      </li>
                    </div>
                  </ul>
                </div>
            )}  
            </div>
            <div className="SearchPage-divider"></div>  
          </div>

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
