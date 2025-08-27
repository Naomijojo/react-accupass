import { useTranslation } from "react-i18next"
import { Link } from 'react-router-dom'



const TabNav = ({ tabs }) => {
    const { t } = useTranslation(); 

  return (
    <nav className="tab-list-container top-[50px]">
      <ul className="tab-list flex justify-between max-w-[1080px] cursor-pointer">
        {tabs.map((tab) => (
          <li key={tab.id} className={`tab-item tab-item-${tab.id}`}>
            <Link className="tab-inner md:my-4 md:py-1.5 sm:my-2 sm:py-1">
              <span className={`tab-icon ${tab.icon} mr-2`}></span>
              <span className="tab-label">{t(tab.label)}</span>
            </Link>
            <div className="tab-bar"></div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TabNav;

