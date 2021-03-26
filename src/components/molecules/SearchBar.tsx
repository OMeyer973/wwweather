import React from "react";
import "./SearchBar.scss"

import { Label } from "~components/atoms/Label";

interface Props {
  label: string;
  value?: string;
}

export const SearchBar: React.FC<Props> = ({label, value}) => {
  return (
    <form className="search-bar">
      <input type="text" name="location" placeholder={label} required size={20}/>
      {/* // todo : decompose input & btn into atoms ? */}
      <button className="search-icon" type="submit" value="submit">
      </button>
    </form>
  )
}
  