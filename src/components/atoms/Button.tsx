import React from "react";

import './Button.scss'

type Color = "primary" | "secondary"

export interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  color?: Color;
}

export const Button: React.FC<Props> = ({ onClick, children, color }) => {
  return (
    <button 
      onClick={onClick}
      className={`button ${color}`}
    >
      {children}
    </button>
   );
};

Button.defaultProps = {
  color: "primary",
};