import { Drawer } from 'antd'

const HeaderMenu = ({ isMenuOpen, toggleMenu }) => {
  const menuItems = [
    {
      group: '最新消息',
      items:[
        {image: "https://static.accupass.com/frontend/image/common/web_header_promote_banner_kiosk_tw.jpg"},
      ]
    },
    {
      group: '探索活動',
      items: [
        { key: '1', label: '生活誌' },
        { key: '2', label: '公益講座' },
        { key: '3', label: '戶外體驗' },
        { key: '4', label: '免費活動' },
        { key: '5', label: '藝文手作' },
        { key: '6', label: '週末出遊' },
        { key: '7', label: '學習課程' },
      ]
    },
    {
      group: '會員服務',
      items: [
        { key: '8', label: '購票問題' },
        { key: '9', label: '使用者條款' },
        { key: '10', label: 'App 取票' },
        { key: '11', label: '隱私權政策' },
        { key: '12', label: '聯絡主辦' },
        { key: '13', label: '退票處理辦法' },
      ]
    },
  ]

  return (
    <Drawer
      className='custom-header-drawer' 
      placement="top"
      onClose={() => toggleMenu(false)}
      open={isMenuOpen}
      height={266}
      closable={false}
      style={{ position: 'absolute', top: '50px' }}
     >
      <ul className="Header-drawer-wrap">
        {menuItems.map((group, index) => (
          <div className="Header-drawer-item" key={index}>
            <h2>{group.group}</h2>
            <ul className={group.group === '最新消息' ? '' : 'Header-with-column'}>
              {group.items.map((item, index) =>
                item.label ? (
                  <li key={item.key || index}>{item.label}</li>
                ) : (
                  <img key={index} src={item.image} alt="最新消息" />
                )
              )}
            </ul>
          </div>
        ))}
      </ul>
    </Drawer>
  )
}

export default HeaderMenu
