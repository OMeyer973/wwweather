import React from "react";
import CSS from "csstype";

// "fridge magnet" style label
import "./Magnet.scss";

type Color = "primary" | "secondary";

export interface Props {
  children: React.ReactNode;
  color?: Color;
  style?: CSS.Properties;
  className?: string;
}

export const Magnet: React.FC<Props> = ({
  children,
  color,
  style,
  className,
}) => {
  return (
    <label className={`magnet ${color} ${className}`} style={style}>
      {children}
    </label>
  );
};

Magnet.defaultProps = {
  color: "primary",
};
