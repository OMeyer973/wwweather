import React from "react";
import "./SearchBar.scss";

import { Label } from "~components/atoms/Label";

interface Props {
  placeholder: string;
  value?: string;
}

export const SearchBar: React.FC<Props> = ({ placeholder, value }) => {
  return (
    <form className="search-bar">
      <input
        type="text"
        name="location"
        placeholder={placeholder}
        required
        size={20}
      />
      {/* // todo : decompose input & btn into atoms ? */}
      <button className="search-icon" type="submit" value="submit"></button>
    </form>
  );
};
