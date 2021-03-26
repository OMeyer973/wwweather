import React from "react";
import "./DirectionTab.scss"

import { Icon } from "~components/atoms/Icon";

export interface Props {
  title: string;
  icon: string;
  iconRotation: number;
  children: React.ReactNode;
}

export const DirectionTab : React.FC<Props> = ({title, icon, iconRotation, children}) => {
  return (
    <div className="direction-tab">
      <div className="title-line">
        <h2>{title}</h2>
        <Icon src={icon} size="medium" />
      </div>
      {children}
    </div>
  )
}
