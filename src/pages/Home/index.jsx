import EventCard from "@/components/EventCard"

const cardData = [
    {
        id: 1,
        image: "https://static.accupass.com/eventbanner/2502030827539702093090.jpg",
        time: "2025.02.16 (日) 14:00 - 03.16 (日) 16:30",
        title: "【新竹喜來登】草莓派對X莓醉時刻︰草莓調酒教室",
        location: "新北市",     
        tag: "甜點吃到飽"       
    },
    {
        id: 2,
        image: "https://static.accupass.com/eventbanner/2502030827539702093090.jpg",
        time: "2025.02.16 (日) 14:00 - 03.16 (日) 16:30",
        title: "【新竹喜來登】草莓派對X莓醉時刻︰草莓調酒教室",
        location: "新北市",     
        tag: "甜點吃到飽"       
    },  
    {
        id: 3,
        image: "https://static.accupass.com/eventbanner/2502030827539702093090.jpg",
        time: "2025.02.16 (日) 14:00 - 03.16 (日) 16:30",
        title: "【新竹喜來登】草莓派對X莓醉時刻︰草莓調酒教室",
        location: "新北市",     
        tag: "甜點吃到飽"       
    },  
    {
        id: 4,
        image: "https://static.accupass.com/eventbanner/2502030827539702093090.jpg",
        time: "2025.02.16 (日) 14:00 - 03.16 (日) 16:30",
        title: "【新竹喜來登】草莓派對X莓醉時刻︰草莓調酒教室",
        location: "新北市",     
        tag: "甜點吃到飽"       
    },            
]


const Home = () => {
    return (
        <div className="pt-[122px]">
            <nav className="tab-list-container top-[50px]">
                <ul className="tab-list">
                    <li className="tab" >
                        <a href="#!" className="tab-link">
                            <span className="tab-inner">
                                <img className="tab-icon" src="./assets/images/common/icon-tab-star.png" alt=""/><span className="tab-label">精選</span>
                            </span>
                        </a>
                    </li>
                    <li className="tab" >
                        <a href="#!" className="tab-link">
                            <span className="tab-inner">
                                <img className="tab-icon" src="./assets/images/common/icon-tab-learn.png" alt=""/><span className="tab-label">學習</span>
                            </span>
                        </a>
                    </li>
                    <li className="tab" >
                        <a href="#!" className="tab-link">
                            <span className="tab-inner">
                                <img className="tab-icon" src="./assets/images/common/icon-tab-art.png" alt=""/><span className="tab-label">藝文</span>
                            </span>
                        </a>
                    </li>
                    <li className="tab" >
                        <a href="#!" className="tab-link">
                            <span className="tab-inner">
                                <img className="tab-icon" src="./assets/images/common/icon-tab-experience.png" alt=""/><span class="tab-label">體驗</span>
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
            {/* <div className="">
                <ul>
                    <li>
                        <img className="h-full" src="https://static.accupass.com/eventbanner/2502030803422063300661.jpg" alt=""/>
                    </li>
                    <li>
                        <img className="h-full" src="https://static.accupass.com/eventbanner/2502030803422063300661.jpg" alt=""/>
                    </li>
                </ul>
            </div> */}
            
            <div className="themes-wrap">
            <div className="channels-container">
                <h2 className="theme-title">熱門推薦</h2>
                <div className="flex flex-wrap justify-between gap-x-[30px] gap-y-[16px]">
                    {cardData.map((item) =>(
                        <EventCard
                            key={item.id} 
                            image={item.image}
                            time={item.time}
                            title={item.title}
                            tag={item.tag}
                        />
                    ))}
                </div>
            </div>
            </div>
        </div>
    )
}   

export default Home