import Layout from '@/components/Layout'

const Home = () => {
    return (    
        <Layout>
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
        </Layout>
    )
}   

export default Home