import IconTagView from '../assets/images/common/icon-event-card-view.svg';
import IconTagHeart from '../assets/images/common/icon-event-card-heart.svg';

const EventCard = ({ image, time, title, location, tag, views, likes }) => {
    
    const isOnlineEvent = location === "線上活動";
    return (
        <div className="card">
            <a href="#!">
                <div className="card-image">
                    <img src={image} alt="" />
                </div>
                <div className="card-event-content flex flex-col">
                    <p className="card-event-time" >{time}</p>
                    <a href="#!">
                        <p className="card-event-name">{title}</p>
                    </a>
                    <div className="card-sub-info-container">
                        <div className="card-event-location flex items-center">
                            <i className={isOnlineEvent ? "video-type" : "location-type"}></i>
                            <span>{isOnlineEvent ? "線上活動" : location}</span>
                        </div>
                    </div>
                    <div className="tags-container flex items-center justify-between" >
                        <a className="tags" href="#!"> #{tag}</a>
                        
                        {views !== undefined && likes !== undefined && (
                        <div className="tags-counts flex">
                            <span className='flex'>
                                <img src={IconTagView}alt="" /> {views}
                            </span>
                            <span className='flex'>
                                <img src={IconTagHeart} alt="" /> {likes}
                            </span>
                        </div>
                        )}
                    </div>
                </div>
            </a>
        </div>
    )}
    

export default EventCard