import React from "react";
import CSS from 'csstype';

import "./Magnet.scss"

type Color =  "primary" | "secondary"

export interface Props {
  children: React.ReactNode;
  color?: Color;
  additionalStyle?: CSS.Properties;
}

export const Magnet: React.FC<Props> = ({children, color, additionalStyle }) => {
  return (
      <label className={`magnet ${color}`} style={additionalStyle}>{children}</label>
    );
};

Magnet.defaultProps = {
  color: "primary",
};