const EventCard = ({ image, time, title, location,tag }) => {  
    return (
        <div className="card">
            <a href="./theme-event.html">
                <div className="card-image">
                    <img src={image} alt="" />
                </div>
                <div className="card-event-content">
                    <div>
                        <p className="card-event-time" >{time}</p>
                        <a href="#!" >
                            <p className="card-event-name">{title}</p>
                        </a>
                    </div>
                    <div className="card-sub-info-container">
                        <a href="#!" className="card-event-location">
                            <i className="location-type" ></i>
                            <span>{location}</span>
                        </a>
                    </div>
                    <div className="tags-container" >
                        <a className="tag" href="https://www.accupass.com/search?q=%E5%8B%95%E6%89%8B%E4%BD%9CDIY"> #{tag}</a>
                    </div>
                </div>
            </a>
        </div>
    )}
    

export default EventCard