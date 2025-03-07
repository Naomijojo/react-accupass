const TabNav = ({ tabs }) => {
  return (
    <nav className="tab-list-container top-[50px]">
      <ul className="tab-list flex justify-between max-w-[1080px] cursor-pointer">
        {tabs.map((tab) => (
          <li key={tab.id} className="tab-item group">
            <a className="tab-inner">
              <span className={`tab-icon ${tab.icon} mr-2`}></span>
              <span className="tab-label" style={{ color: tab.hoverColor }}>
                {tab.label}
              </span>
            </a>
            <div className="tab-bar"></div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TabNav;

