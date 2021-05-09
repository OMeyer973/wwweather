import React from "react";
import "./Header.scss";

import { SearchBar } from "~components/molecules/SearchBar";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div>
        <h1 className="header__title">WWWeather</h1>
        <SearchBar placeholder="Find a spot" />
        {/* todo: "settings" button ? */}
      </div>
    </header>
  );
};

export default Header;
