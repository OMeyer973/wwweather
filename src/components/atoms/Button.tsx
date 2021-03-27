import React from "react";

import "./Button.scss";

type Color = "primary" | "secondary";

export interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  color?: Color;
  className?: string;
}

export const Button: React.FC<Props> = ({
  onClick,
  children,
  color,
  className,
}) => {
  return (
    <button onClick={onClick} className={`button ${color} ${className}`}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  color: "primary",
};
