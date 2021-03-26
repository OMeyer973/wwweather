import React from "react";

const Location = () => {
  return (
    <div id="location-tab" className="tab flex flex--horizontal">
      <div>
        <h2 className="data">Pointe du Talut/Belle-Île</h2>
        <p className="data--slim">French Guiana</p>
      </div>
      <div className="flex">
        <form className="search-bar">
          <input type="text" name="location" placeholder="Search location" required size={20}/>
          <button className="search-icon" type="submit" value="submit">
          </button>
        </form>
      </div>
    </div>
  )
}

export default Location;
