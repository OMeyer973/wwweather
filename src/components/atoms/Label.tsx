import React from "react";

import "./label.scss"

type Flavor = "default" | "magnet primary" | "magnet secondary"

export interface Props {
  children: React.ReactNode;
  flavor?: Flavor;
}

export const Label: React.FC<Props> = ({children, flavor}) => {
  return (
      <label className={`label ${flavor}`}>{children}</label>
    );
};
