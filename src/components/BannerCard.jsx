const BannerCard = ({ image, onGoToPage }) => {
  return (
    <div className="banner-wrap">
      <div className="banner-image">
        <img src={image} alt="" onClick={onGoToPage} />
      </div>
    </div>
  )
}

export default BannerCard