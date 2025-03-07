import IconTagView from '../assets/images/common/icon-event-card-view.svg';
import IconTagHeart from '../assets/images/common/icon-event-card-heart.svg';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ image, time, title, location, tag, views, likes, onGoToPage }) => {
  const navigate = useNavigate()    
  const isOnlineEvent = location === "線上活動";

  return (
    <div className="card">
      <div className="card-image" onClick={onGoToPage}>
        <img src={image} alt="" />
      </div>
      <div className="card-event-content flex flex-col">
        <p className="card-event-time" >{time}</p>
        <p className="card-event-name" onClick={onGoToPage} >{title}</p>
        <div className="card-sub-info-container">
          <div onClick={() => navigate(`/search?l=${location}`)} className="card-event-location flex items-center">
            <i className={isOnlineEvent ? "video-type" : "location-type"}></i>
            <span>{isOnlineEvent ? "線上活動" : location}</span>
          </div>
        </div>
        <div className="tags-container flex items-center justify-between" >
          <span onClick={() => navigate(`/search?q=${tag}`)} className="tags" > #{tag}</span>
            
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
    </div>
  )}
    

export default EventCard