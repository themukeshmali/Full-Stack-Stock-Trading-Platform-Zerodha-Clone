import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Read logged-in user from localStorage (set by frontend on login)
  const loggedInUser = localStorage.getItem("loggedInUser") || "User";
  const avatarLetters = loggedInUser.slice(0, 2).toUpperCase();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    setIsProfileDropdownOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInEmail");
    const frontendUrl = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
    window.location.href = `${frontendUrl}/signup`;
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="Zerodha Logo" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="funds" onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(6)}>
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        {/* Profile & Logout Dropdown */}
        <div style={{ position: "relative" }}>
          <div className="profile" onClick={handleProfileClick}>
            <div className="avatar">{avatarLetters}</div>
            <p className="username">{loggedInUser}</p>
          </div>
          {isProfileDropdownOpen && (
            <div style={{
              position: "absolute",
              top: "110%",
              right: 0,
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              zIndex: 100,
              minWidth: "140px",
              padding: "6px 0"
            }}>
              <div style={{
                padding: "8px 16px",
                fontSize: "0.8rem",
                color: "#888",
                borderBottom: "1px solid #f0f0f0"
              }}>
                {loggedInUser}
              </div>
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  fontSize: "0.85rem",
                  color: "#e53935",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
                onMouseEnter={e => e.target.style.background = "#fff5f5"}
                onMouseLeave={e => e.target.style.background = "none"}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
