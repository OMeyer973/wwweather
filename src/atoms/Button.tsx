import PropTypes from "prop-types";
import React from "react";

export interface Props {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  secondary?: boolean;
}

export const Button: React.FC<Props> = ({ text, onClick, secondary }) => {
  return (
    <button 
      // id="btn-show-timetable" 
      onClick={onClick}
      className={`btn ${secondary ? "btn--teal": ""}`}
    >
      {text}
    </button>
   );
};
