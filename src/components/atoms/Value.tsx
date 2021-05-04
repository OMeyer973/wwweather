import React from "react";

import "./value.scss";

type Flavor = "default" | "title" | "small" | "slim";

export interface Props {
  children: React.ReactNode;
  flavor?: Flavor;
}

export const Value: React.FC<Props> = ({ children, flavor }) => {
  return <span className={`value ${flavor}`}>{children}</span>;
};

Value.defaultProps = {
  flavor: "default",
};
