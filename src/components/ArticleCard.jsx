const ArticleCard = ({ image, title }) => {
  return (
    <div className="article-card">
      <div className="article-card-image">
          <img src={image} alt="" />
      </div>
      <div className="article-card-content flex">
          <a href="#!" >
            <p className="article-card-name">{title}</p>
          </a>
      </div>
    </div>
  )
}

export default ArticleCard

