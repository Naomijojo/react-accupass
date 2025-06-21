const ArticleCard = ({ image, title }) => {
    const getArticleCardSize = () => {
      return `
        w-[256px] h-[320px]
        md:w-[307px] h-[371px]
        lg:w-[201px] h-[265px]
      `
    }

  return (
    <div className={`article-card flex-shrink-0 ${getArticleCardSize}`}>
      <div className="article-card-image ">
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

