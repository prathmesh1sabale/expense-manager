import React from "react";
import "./Header.css";

const Header = ({ onLogout, toggleTheme, isDarkMode }) => {
  return (
    <header className={`header d-flex justify-content-between align-items-center px-4 py-2 shadow-sm ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="d-flex align-items-center gap-2">
        <img
          src="https://img.icons8.com/fluency/48/money.png"
          alt="Money logo"
          className="header-logo"
        />
        <span className="fs-5 fw-bold header-title">Personal Transaction</span>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button
          className={`btn btn-sm px-3 ${isDarkMode ? 'btn-light' : 'btn-dark'}`}
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        <button
          className={`btn btn-sm ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
          onClick={onLogout}
          title="Logout"
        >
          <i className="fas fa-power-off me-1"></i> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
