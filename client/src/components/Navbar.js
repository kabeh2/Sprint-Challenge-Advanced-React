import React from "react";
import useDarkMode from "./useDarkMode";

const Navbar = () => {
  const [darkMode, setValue] = useDarkMode(false);

  const toggleMode = e => {
    e.preventDefault();
    setValue(!darkMode);
  };

  return (
    <nav className="navbar" data-test="component-navbar">
      <h1>Women's World Cup Rankings</h1>
      <div
        className="dark-mode__toggle"
        onClick={toggleMode}
        data-test="component-navbar-toggle"
      >
        <div className={darkMode ? "toggle toggled" : "toggle"} />
      </div>
    </nav>
  );
};

export default Navbar;
