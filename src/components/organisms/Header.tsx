import React from "react";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="flex flex--horizontal">
        <h1 className="header__title">WWWeather</h1>
      </div>
    </header>
  );
};

export default Header;
