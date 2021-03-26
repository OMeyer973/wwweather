import React from "react";
import CSS from 'csstype';

// fridge magnet-style label
import "./Magnet.scss"

type Color =  "primary" | "secondary"

export interface Props {
  children: React.ReactNode;
  color?: Color;
  style?: CSS.Properties;
}

export const Magnet: React.FC<Props> = ({children, color, style }) => {
  return (
      <label className={`magnet ${color}`} style={style}>{children}</label>
    );
};

Magnet.defaultProps = {
  color: "primary",
};