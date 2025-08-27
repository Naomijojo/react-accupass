import { homeApi } from "@/api/home"
import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import EventCard from "@/components/EventCard"
import FilterIcon from "@/assets/images/common/icon-search-filterbtn.svg"
import IconSearchHistory from "@/assets/images/common/icon-search-history.svg"
import { useTranslation } from "react-i18next"
import { useUserStore } from '@/store/user'
import clsx from 'clsx'

//useState管理狀態/ useEffect處理狀態 / useSearchParams讀取和設置 URL 查詢參數(先在router設定好才抓的到) 

// 1.引用 getRecommend API: 在 getAllData 函數中，使用 homeApi.getRecommend() 獲取推薦數據，並將其賦值給recommendData
// 2.過濾數據 : 查詢參數 tag 和 location 對 recommendData 進行過濾
// 3.渲染結果 : 根據過濾後的 searchData 渲染結果。如果沒有相關活動，顯示提示消息；如果有活動，則顯示活動的標題。

const sortOptions = [
  {
    label:'sort.label',
    value:'sort'
  },
  {
    label:'sort.asc',
    value:'asc'
  },
  {
    label:'sort.desc',
    value:'desc'
  }
]


const Search = () => {
  const navigate = useNavigate()

  //使用useSearchParams查詢參數
  const [searchParams] = useSearchParams()
  //searchData:搜尋到的資料
  const [searchData, setSearchData] = useState([])
  //isSearchClick:是否點擊搜尋
  const [isSearchClick, setIsSearchClick] = useState(false)
  //searchHistory:搜尋紀錄
  const [searchHistory, setSearchHistory] = useState([])
  //allData:所有資料
  const [allData, setAllData] = useState([])
  //input的值
  const [value, setValue] = useState('')
  //searchPageBar:到達滾動位置變sticky
  const [isSearchBarSticky, setIsSearchBarSticky] = useState(false)

  const searchRef = useRef(null)
  const searchPageBarRef = useRef(null)

  const { t } = useTranslation();

  const { darkMode } = useUserStore()

  // 查詢字串'l'、 'q'
  const location = searchParams.get('l')
  const tag = searchParams.get('q')
  // console.log(`location ${location}`)  
  // console.log(`tag ${tag}`)  

  const getAllData = async() =>{
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
  
  // 更新localStorage、更新React狀態：重複代碼包在一起並賦質給addSearchHistory
  const addSearchHistory = (newSearchHistory) => {
    localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory))
    setSearchHistory(newSearchHistory)
  }

  const handleSearch = (keyword) =>{
    const filteredData = allData.filter(item => item.title.includes(keyword))
    setSearchData(filteredData)
  } 

  //*寫入歷史
  // 1. 用戶按 Enter 搜尋
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 ){
      const keyword = e.target.value.trim()
      // 執行keyword搜尋 (title的關鍵字)
      handleSearch(keyword)
      
      // 2. 只有非空值才能加入 searchHistory state
      if (keyword && !searchHistory.some(item => item === keyword)) {
        const newSearchHistory = [...searchHistory, keyword]
        // +限制只保留最新的 6 筆資料
        const limitedHistory = newSearchHistory.slice(-6)
        // 3. 同時存到 localStorage
        addSearchHistory(limitedHistory)
      }

      // +關閉modal，根據關鍵字決定是否保留內容
      setIsSearchClick(false)
      setValue(keyword || '')
    }
  }

  const handleDeleteSearchHistory = (keyword) => {
    const newSearchHistory = searchHistory.filter(item => item !== keyword)
    addSearchHistory(newSearchHistory)
    setValue('')
  }

  // 要使用useEffect 抓取 DOM 元素 (何時拿？組件掛載完時拿 且只會拿一次)
  // 如果 searchRef 綁定成功，而且點擊的位置不在 searchRef DOM 範圍內，就代表點到外部 → 關閉搜尋框
   
  useEffect(() =>{
    const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)){   
      // searchRef.current → 綁定DOM的元素(搜尋框區塊)
      // !searchRef.current.contains(event.target) → event.target(滑鼠點擊區域)不在搜尋框內部
      // 以上兩個條件都要成立才會執行
      setIsSearchClick(false)
    }      
  }
    //加入監聽器
    document.addEventListener('click', handleClickOutside )
    //組件卸載(換頁 關閉頁面)的時候執行“移除監聽”
    //整個react都是一個js 是透過路由把東西放進所需頁面
    return () => {
      document.removeEventListener('click', handleClickOutside )
    }
  },[])

  // 排序(由舊到新 由新到舊)
  const handleSort = (value) => {
    const newSearchData = [...searchData] //排序:先複製一份再將時間拿出來比大小
    if (value === 'asc'){
      newSearchData.sort((a,b) => a.time - b.time)
    }
    if (value === 'desc'){
      newSearchData.sort((a,b) => b.time - a.time)
    }
    setSearchData(newSearchData)
  }


  // *讀取歷史: 從 localStorage 讀取搜尋歷史並設定到 state
  // 1. 頁面載入時執行
  useEffect(() => {
    // 2. 從 localStorage 讀取之前儲存的歷史
    const searchHistoryStorage = localStorage.getItem('searchHistory')
    // 3. 恢復到 searchHistory state
    if (searchHistoryStorage) {
      setSearchHistory(JSON.parse(searchHistoryStorage))
    }
  },[])

  // SearchPageBar滾動監聽   
  useEffect(() => {
    const handleScroll = () => {
      const searchHeader = document.querySelector('.search-header-wrapper')
      const searchPageBar = searchPageBarRef.current
      
      if (searchHeader && searchPageBar) {
        const searchHeaderHeight = searchHeader.offsetHeight
        const scrollY = window.scrollY
        
        // 滾動超過 search-header 高度，只顯示固定的 SearchPageBar，不顯示search-header
        if (scrollY > searchHeaderHeight) {
          setIsSearchBarSticky(true)
          searchHeader.classList.add('hidden')
        } else {
          setIsSearchBarSticky(false)
          searchHeader.classList.remove('hidden')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div>
      <div className={clsx("main pt-[72px]", { darkMode }) }>
        <div className="container max-w-[1080px]">
          <h1 className="SearchTitle flex justify-center items-center animate-fade-in-down">
            {/* 條件檢查 location 或 tag 是否有值 ? `如果location(tag)有值則顯示該值`:沒有則顯示所有活動*/}
            {location || tag ? `${location || ''} ${tag || ''}` : t('allActivity') }
          </h1>

          <div 
            ref={searchPageBarRef}
            className={`SearchPageBar flex flex-col ${isSearchBarSticky ? 'sticky' : ''}`}
          >
            <div className="SearchBarDrown relative flex items-center">
              <div ref={searchRef} className="SearchBar flex justify-center items-center">
                <input 
                type="search" 
                id="search-input"
                name="search"
                placeholder={t('keywords')} 
                maxLength={80} 
                value={value} 
                onChange={(e)=> {
                  console.log('用戶輸入:', e.target.value);
                  setValue(e.target.value)
                }}
                onClick={() => setIsSearchClick(true)}  
                onKeyDown={handleKeyDown} 
                />
                <img src={FilterIcon} alt="" className="search-icon" />
                {isSearchClick && (
                  //{searchRef} 要放在父元素上
                  <div className="absolute w-full top-full rounded-[16px] shadow-[4px_9px_25px_rgba(59,63,69,0.15)] z-10 bg-white p-6">
                    {/* 搜尋紀錄: 紀錄有值才顯示 */}
                    {searchHistory.length ? (
                      <>
                        <h1 className="text-[18px] font-[600] mb-2" style={{color:'#3b3f45'}}>{t('search_history')}</h1>
                        <ul className="my-4">
                          {searchHistory.map(item => (  
                            <li key={item} className="flex justify-between items-center">
                              <div className="flex items-center space-x-3">
                                <img src={IconSearchHistory} alt="" />
                                <span className="cursor-pointer text-gray-800 hover:text-gray-400" onClick={() => handleSearch(item)} >{item}</span>
                              </div>
                              <button 
                              className="hover:text-gray-400 cursor-pointer" 
                              onClick={(e)=> {
                                // 阻止事件冒泡(避免點擊刪除按鈕時，也會觸發搜尋歷史的點擊事件)
                                e.stopPropagation()
                                handleDeleteSearchHistory(item)
                              }}>
                                <i className="fa-solid fa-xmark " style={{color:'#959ba1'}}></i>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </>      
                    ) : ''}

                    <h1 className="text-[18px] font-[600] mb-2" style={{color:'#3b3f45'}}>{t('popular_search')}</h1>
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

              <select onChange={(e) => handleSort(e.target.value)}   className="ml-2 outline-2 bg-[#f5f5f5] py-[7px] px-8 text-center rounded-[20px] ">
                {sortOptions.map(item => (
                  <option key={item.value} value={item.value}>{t(`${item.label}`)}</option>
                ))}
              </select>

            </div>
            <div className="SearchPage-divider"></div>  
          </div>

          {!searchData.length ? (
            <p className="search-results text-center m-52">{t('no_activities')}</p>
            
          ) : (
          <div className="flex justify-center flex-wrap gap-x-[30px] gap-y-[16px]">
            {searchData.map(item => (
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
          )}

          <div className="SearchPage-divider mb-[50px]"></div>  
        </div>
      </div>
    </div>  
  )
}

export default Search
