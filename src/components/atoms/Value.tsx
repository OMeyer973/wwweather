import React from "react";
import CSS from "csstype";

import "./value.scss";

type Flavor = "default" | "title" | "small" | "slim";

export interface Props {
  children: React.ReactNode;
  flavor?: Flavor;
  style?: CSS.Properties;
}

export const Value: React.FC<Props> = React.memo(
  ({ children, flavor, style }) => {
    return (
      <span className={`value ${flavor}`} style={style}>
        {children}
      </span>
    );
  }
);

Value.defaultProps = {
  flavor: "default",
};
