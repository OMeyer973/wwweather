import React from "react";

import "./Br.scss";

type MediaSize = "all" | "tiny" | "small" | "medium" | "large";

export interface Props {
  under?: string;
}

export const Br: React.FC<Props> = ({ under }) => {
  return <br className={`br ${under}`} />;
};

Br.defaultProps = {
  under: "all",
};
