import EventCard from "@/components/EventCard"
import ArticleCard from "@/components/ArticleCard"

import IconTabStar from "@/assets/images/common/icon-tab-star.png"
import IconTabLearn from "@/assets/images/common/icon-tab-learn.png"
import IconTabArt from "@/assets/images/common/icon-tab-art.png"
import IconTabExperience from "@/assets/images/common/icon-tab-experience.png"



//EventData 1-4
const eventData1 = [
    {
        eventId: 1,
        image: "https://static.accupass.com/eventbanner/2502030827539702093090.jpg",
        time: "2025.02.12 (三) 19:30 - 21:00",
        title: "【市民對話】一趟不拉肚子的印度之旅：小拉薩－達蘭薩拉旅遊照片分享會",
        location: "台北市",     
        tag: "印度", 
    },
    {
        eventId: 2,
        image: "https://static.accupass.com/eventbanner/2501150752531288187327.jpg",
        time: "2025.02.18 (二) 08:00 - 02.20 (四) 22:30",
        title: "Consensus Hong Kong 🚀最具影響力的加密貨幣活動！ Dealflow 的首選目的地！",
        location: "香港島",     
        tag: "加密貨幣"       
    },  
    {
        eventId: 3,
        image: "https://static.accupass.com/eventbanner/2410181223011372477883.jpg",
        time: "2025.02.22 (六) 10:00 - 12:00",
        title: "【街遊 Hidden Taipei】梁兄的藏寶圖 》2025-02-22",
        location: "台北市",     
        tag: "城市導覽"       
    },  
    {
        eventId: 4,
        image: "https://static.accupass.com/eventbanner/2501060420442007619958.jpg",
        time: "2025.02.20 (四) 15:00 - 16:00",
        title: "從零開始辦活動！一小時快速掌握活動成功㊙️訣  l  ACCUPASS 主辦學院",
        location: "線上活動",     
        tag: "Accupass"       
    },
    {
        eventId: 5,
        image: "https://static.accupass.com/eventbanner/2412270624371463825539.jpg",
        time: "2025.01.11 (六) 14:30 - 02.22 (六) 16:00",
        title: "太平青鳥｜島語歌謠系列講座 — 聽見台語文化的聲音",
        location: "基隆市",     
        tag: "基隆市"       
    }, 
    {
        eventId: 6,
        image: "https://static.accupass.com/eventbanner/2501220721347574442450.jpg",
        time: "2025.03.15 (六) 13:00 - 03.22 (六) 17:00",
        title: "『自信力』勇敢跨出、迎接自信新 2025",
        location: "台北市",     
        tag: "台北市"       
    },           
];
const eventData2 =[
    {   
        eventId: 1,
        image: "https://static.accupass.com/eventbanner/2501220328312676661720_P520x260.jpg",
        time: "2025.02.26 (三) 19:00 - 04.02 (三) 22:00",
        title: "2025 藝文寫作班 - 展覽企劃 (春季週三晚班)",
        location: "台北市",     
        tag: "政府標案",
        views:"1742",
        likes:"39"  
    },
    {   
        eventId: 2,
        image: "https://static.accupass.com/eventbanner/2502060047485145503010_P520x260.jpg",
        time: "2025.03.16 (日) 14:30 - 16:00",
        title: "藝術市場的邏輯揭秘",
        location: "台北市",     
        tag: "藝術市場",
        views:"238",
        likes:"6"    
    },
    {   
        eventId: 3,
        image: "https://static.accupass.com/eventbanner/2501240702251177088206_P520x260.jpg",
        time: "2025.03.26 (三) 19:00 - 06.04 (三) 21:00",
        title: "2025藝集電影線上講堂｜馬欣 :【幻象與心理學：解析文學與電影中的恐懼美學與虛實交織",
        location: "台北市",     
        tag: "電影解析",
        views:"893",
        likes:"35"    
    },
    {   
        eventId: 4,
        image: "https://static.accupass.com/eventbanner/2501181506011667900759_P520x260.jpg",
        time: "2025.02.15 (六) 14:30 - 17:00",
        title: "2025/2/15 (六）下午「油畫基礎-自選主題」繪畫體驗 ｜ 台北市大安區｜ 日夕藝術 ",
        location: "台北市",     
        tag: "美術",
        views:"178",
        likes:"6"   
    },
    {   
        eventId: 5,
        image: "https://static.accupass.com/eventbanner/2502060738114927986200_P520x260.jpg",
        time: "2025.03.08 (六) 13:30 - 16:30",
        title: "女王的二手市集",
        location: "桃園市",     
        tag: "假日藝文",
        views:"305",
        likes:"5"   
    },
    {   
        eventId: 12,
        image: "https://static.accupass.com/eventbanner/2502110722068665615120_P520x260.jpg",
        time: "2025.02.22 (六) 15:30 - 17:30",
        title: "當代藝術中的女性：立足點、替代領域、接觸區",
        location: "台北市",     
        tag: "新書講座",
        views:"1205",
        likes:"50"   
    },
];
const eventData3 =[
    {
        eventId: 1,
        image: "https://static.accupass.com/eventbanner/2502110722068665615120_P520x260.jpg",
        time: "2025.02.22 (六) 15:30 - 17:30",
        title: "當代藝術中的女性：立足點、替代領域、接觸區",
        location: "台北市",     
        tag: "新書講座",
        views:"81",
        likes:"6"   
    },
    {
        eventId: 2,
        image: "https://static.accupass.com/eventbanner/2411140702501907451091_P520x260.jpg",
        time: "2025.02.06 (四) 19:30 - 04.10 (四) 21:30",
        title: "2025 藝集講堂｜洪儀真 _【多菱鏡．現代主義藝術多重相】- 象徵主義、表現主義、巴黎畫派、杜象與魔幻寫實 _ 全八講  (現場+線上講座)",
        location: "台北市",     
        tag: "社會學",
        views:"1920",
        likes:"24"   
    },
    {
        eventId: 3,
        image: "https://static.accupass.com/eventbanner/2501160934461788338304_P520x260.jpg",
        time: "2025.02.15 (六) 14:00 - 02.23 (日) 16:30",
        title: "【艋舺光影聚落】皮影親子工作坊（小羊/西遊）公眾場",
        location: "台北市",     
        tag: "藝術表演",
        views:"2479",
        likes:"31"   
    },
    {
        eventId: 4,
        image: "https://static.accupass.com/eventbanner/2405100905135551910780_P520x260.jpg",
        time: "2025.02.07 (五) 00:00 - 05.31 (六) 00:00",
        title: "【藝術線上課程】江戶的綺麗色彩—日本浮世繪",
        location: "線上活動",     
        tag: "黃璿恩",
        views:"51",
        likes:"1"   
    },
    {
        eventId: 5,
        image: "https://static.accupass.com/eventbanner/2501031613348832677600_P520x260.jpg",
        time: "2025.03.31 (一) 18:50 - 06.30 (一) 20:30",
        title: "高效產出學習歷程~帶你手把手完成個人學習檔案製作",
        location: "線上活動",     
        tag: "自主學習",
        views:"96",
        likes:"3"   
    },
    {
        eventId: 6,
        image: "https://static.accupass.com/eventbanner/2501061051131039764806_P520x260.jpg",
        time: "2025.03.22 (六) 10:00 - 03.23 (日) 20:00",
        title: "⟢ 晶礦紀 ⟢ 台灣首場水晶光聚｜水晶工作坊 × 水晶音樂靜心 × 晶礦市集 × 晶礦藝術共創",
        location: "台北市",     
        tag: "靜心舒壓",
        views:"4693",
        likes:"34"   
    },
];
const eventData4 =[
    {   
        eventId: 1,
        image: "https://static.accupass.com/eventbanner/2502030945221642848636_P520x260.jpg",
        time: "2025.02.11 (二) 19:00 - 04.01 (二) 21:00",
        title: "【新月．藝文講座】向建築大師 谷口吉生致敬！",
        location: "線上活動",     
        tag: "建築",
        views:"98",
        likes:"6"           
    },
    {   
        eventId: 2,
        image: "https://static.accupass.com/eventbanner/2410090235501643201667_P520x260.jpg",
        time: "2025.03.14 (五) 14:00 - 16:00",
        title: "三月場-嵌入式烤箱體驗活動(平日場)",
        location: "台北市",     
        tag: "嵌入式烤箱",
        views:"99",
        likes:"2"           
    },
    {   
        eventId: 3,
        image: "https://static.accupass.com/eventbanner/2501140807471844345345_P520x260.jpg",
        time: "2025.03.06 (四) 11:00 - 03.10 (一) 17:30",
        title: "2025 SKM PHOTO 攝影藝術博覽會",
        location: "線上活動",     
        tag: "攝影藝術",
        views:"935",
        likes:"69"           
    },
    {   
        eventId: 4,
        image: "https://static.accupass.com/eventbanner/2412270957403704998420_P520x260.jpg",
        time: "2025.03.14 (五) 14:00 - 17:00",
        title: "【實體公開班】3/14（五）零基礎學 Canva AI 生成式設計",
        location: "台北市",     
        tag: "AI",
        views:"509",
        likes:"16"           
    },
    {   
        eventId: 5,
        image: "https://static.accupass.com/eventbanner/2501211648161596460564_P520x260.jpg",
        time: "2025.02.08 (六) 13:00 - 02.23 (日) 16:30",
        title: "明日之星 親子工作坊",
        location: "台北市",     
        tag: "親子共學",
        views:"126",
        likes:"0"           
    },
    {   
        eventId: 6,
        image: "https://static.accupass.com/eventbanner/2501210555482046872000_P520x260.jpg",
        time: "2025.02.22 (六) 14:00 - 17:00",
        title: "2025 設計思考初階工作坊＿二月週六班",
        location: "台北市",     
        tag: "史丹利設計思考",
        views:"196",
        likes:"2"           
    },
]

//articleData 1-3
const articleData1 = [
    {
        articleId:1,
        image:"https://static.accupass.com/article/2502110721171198060180.jpg",
        title:"2025 水美園：在城市裡就能擁抱自然｜ACCUPASS 活動案例"
    },
    {
        articleId:2,
        image:"https://static.accupass.com/article/2502080811011931388840.jpg",
        title:"2025 元宵節猜燈謎：為什麼電腦不快樂？小孩子跌倒猜一句成語？"
    },
    {
        articleId:3,
        image:"https://static.accupass.com/article/2502030721371624050581.jpg",
        title:"如何使用手機查看 ACCUPASS 活動參加者名單"
    },
    {
        articleId:4,
        image:"https://static.accupass.com/article/2501220345002033387671.jpg",
        title:"2025 過年習俗與禁忌！還有必做開運妙招讓你蛇年行大運～"
    },
    {
        articleId:5,
        image:"https://static.accupass.com/article/2501170343056389219990.jpg",
        title:"2024 ACCUPASS 年度分享會│直擊活動背後的行銷策略，掌握聲量與流量密碼"
    },
];

const articleData2 =[
    {
        articleId:1,
        image:"https://static.accupass.com/article/2501160308031231757695.jpg",
        title:"2025 最新活動行銷趨勢：AI 與短影音如何幫助品牌搶占市場先機！"
    },
    {
        articleId:2,
        image:"https://static.accupass.com/article/2501130346175977381810.jpg",
        title:"LINE Notify 3 月底將終止服務！ ACCUPASS 成為活動推播新選擇！"
    },
    {
        articleId:3,
        image:"https://static.accupass.com/article/2501081022283549344760.jpg",
        title:"2025 蛇年吉祥話懶人包｜拜年、拿紅包必看！實用又好記的祝福～"
    },
    {
        articleId:4,
        image:"https://static.accupass.com/article/2501080218261008282181.jpg",
        title:"設計驅動未來：台灣設計研究院年度活動分享｜ACCUPASS 活動案例"
    },
    {
        articleId:5,
        image:"https://static.accupass.com/article/2412250915065669094920.jpg",
        title:"ACCUPASS 2024 年度回顧：帶你重溫今年最熱門、最經典活動！"
    }
];
const articleData3 =[
    {
        articleId:1,
        image:"https://static.accupass.com/article/2412240641047742737670.jpg",
        title:"亞洲區域最具影響力的區塊鏈盛宴！千人朝聖的 Web3 展會：2024 台北區塊鏈週 | ACCUPASS 合作案例"
    },
    {
        articleId:2,
        image:"https://static.accupass.com/article/2412170909169016731910.jpg",
        title:"為什麼我的 Meta 廣告審核未通過？你該注意是否違反以下規則！"
    },
    {
        articleId:3,
        image:"https://static.accupass.com/article/2412170851462036113228.jpg",
        title:"2025 全台跨年活動精選！最嗨、最享受、最精彩的跨年好去處～"
    },
    {
        articleId:4,
        image:"https://static.accupass.com/article/2412120827131101764063.jpg",
        title:"廣告文案好難寫！5 個黃金技巧教你寫出高效的臉書廣告文案！"
    },
    {
        articleId:5,
        image:"https://static.accupass.com/article/2412130143401267615666.jpg",
        title:"2024 全台聖誕活動推薦！聖誕派對、手作禮物還有親子同樂會～"
    }
]
const Home = () => {
    return (
        <div className="pt-[122px]">
            <nav className="tab-list-container top-[50px]">
                <ul className="tab-list flex">
                    <li className="tab tab1">
                        <a href="#!" className="flex flex-col">
                            <span className="tab-inner flex justify-center">
                                <img className="tab-icon" src={IconTabStar} alt="" /><span className="tab-label">精選</span>
                            </span>
                            <div className="tab-bar"></div>
                        </a>
                    </li>
                    <li className="tab tab2" >
                        <a href="#!" >
                            <span className="tab-inner flex justify-center">
                                <img className="tab-icon" src={IconTabLearn} alt="" /><span className="tab-label">學習</span>
                            </span>
                            <div className="tab-bar"></div>
                        </a>
                    </li>
                    <li className="tab tab3" >
                        <a href="#!" >
                            <span className="tab-inner flex justify-center">
                                <img className="tab-icon" src={IconTabArt} alt="" /><span className="tab-label">藝文</span>
                            </span>
                            <div className="tab-bar"></div>
                        </a>
                    </li>
                    <li className="tab tab4" >
                        <a href="#!" >
                            <span className="tab-inner flex justify-center">
                                <img className="tab-icon" src={IconTabExperience} alt="" /><span className="tab-label">體驗</span>
                            </span>
                            <div className="tab-bar"></div>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="banner-wrap">
                <div className="container max-w-[1080px]">
                    <img className=" h-full" src="https://static.accupass.com/eventbanner/2502030803422063300661.jpg" alt=""/>
                </div>
            </div>
            <div className="container max-w-[1080px] flex justify-start gap-x-[20px]">
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

            <div className="themes-wrap">
                <div className="container max-w-[1080px]">
                    <h2 className="theme-title">熱門推薦</h2>
                    <div className="flex flex-wrap gap-x-[30px] gap-y-[16px] whitespace-nowrap">
                        {eventData1.map((item) =>(
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
                </div>
            </div>

            <div className="article-wrap">
                <div className="container max-w-[1080px]">
                    <h2 className="article-title">每天一點新鮮事</h2>
                    <div className="flex justify-between gap-x-[20px] whitespace-nowrap">
                        {articleData1.map((item) =>(
                            <ArticleCard
                                key={item.id}
                                image={item.image}
                                title={item.title}
                            />
                        ))}
                    </div>
                </div>
            </div>        

            <div className="themes-wrap">
                <div className="container max-w-[1080px]">
                    <h2 className="theme-title">精選活動</h2>
                    <div className="flex flex-wrap gap-x-[30px] gap-y-[16px] whitespace-nowrap">
                        {eventData2.map((item) =>(
                            <EventCard
                                key={item.id} 
                                image={item.image}
                                time={item.time}
                                title={item.title}
                                location={item.location}
                                tag={item.tag}
                                views={item.views}
                                likes={item.likes}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="article-wrap">
                <div className="container max-w-[1080px]">
                    <h2 className="article-title">每天一點新鮮事</h2>
                    <div className="flex justify-between gap-x-[20px] whitespace-nowrap">
                        {articleData2.map((item) =>(
                            <ArticleCard
                                key={item.id}
                                image={item.image}
                                title={item.title}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="themes-wrap">
                <div className="container max-w-[1080px]">
                    <h2 className="theme-title">精選活動</h2>
                    <div className="flex flex-wrap gap-x-[30px] gap-y-[16px] whitespace-nowrap">
                        {eventData3.map((item) =>(
                            <EventCard
                                key={item.id} 
                                image={item.image}
                                time={item.time}
                                title={item.title}
                                location={item.location}
                                tag={item.tag}
                                views={item.views}
                                likes={item.likes}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="article-wrap">
                <div className="container max-w-[1080px]">
                    <h2 className="article-title">每天一點新鮮事</h2>
                    <div className="flex justify-between gap-x-[20px] whitespace-nowrap">
                        {articleData3.map((item) =>(
                            <ArticleCard
                                key={item.id}
                                image={item.image}
                                title={item.title}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="themes-wrap">
                <div className="container max-w-[1080px]">
                    <h2 className="theme-title">精選活動</h2>
                    <div className="flex flex-wrap gap-x-[30px] gap-y-[16px] whitespace-nowrap">
                        {eventData4.map((item) =>(
                            <EventCard
                                key={item.id} 
                                image={item.image}
                                time={item.time}
                                title={item.title}
                                location={item.location}
                                tag={item.tag}
                                views={item.views}
                                likes={item.likes}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="event-more-bottom-container">
                <button className="event-more-bottom">更多活動</button>
            </div>
        </div>
    )
}   

export default Home