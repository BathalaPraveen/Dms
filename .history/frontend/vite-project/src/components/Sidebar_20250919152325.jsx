export default function Sidebar({ activeItem, setActiveItem, handleLogout, collapsed }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu);
  const handleItemClick = (item) => setActiveItem(item);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="logo">{!collapsed && <img src={logo} alt="Logo" />}</div>
      <ul className="menu">
        <li
          className={activeItem === "Dashboard" ? "active" : ""}
          onClick={() => handleItemClick("Dashboard")}
        >
          <FaHome style={{ marginRight: collapsed ? 0 : "8px" }} /> {!collapsed && "Dashboard"}
        </li>

        <li>
          <div className="menu-item" onClick={() => toggleMenu("construction")}>
            <FaBuilding style={{ marginRight: collapsed ? 0 : "8px" }} />
            {!collapsed && "Construction Work"}
            {!collapsed &&
              (openMenu === "construction" ? <FaChevronDown /> : <FaChevronRight />)}
          </div>
          {openMenu === "construction" && !collapsed && (
            <ul className="submenu">
              {["CW-Dashboard", "CW-Management", "CW-A03"].map((item) => (
                <li
                  key={item}
                  className={activeItem === item ? "active" : ""}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </li>

        <li className="logout" onClick={handleLogout}>
          <FaSignOutAlt style={{ marginRight: collapsed ? 0 : "8px" }} /> {!collapsed && "Logout"}
        </li>
      </ul>
    </aside>
  );
}
