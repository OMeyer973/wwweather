import React from "react";
import CSS from "csstype";

import "./Icon.scss";

type Size = "small" | "medium" | "large";

export interface Props {
  src: string;
  size?: Size;
  style?: CSS.Properties;
}

export const Icon: React.FC<Props> = ({ src, size, style }) => {
  return (
    <span className={`icon ${size}`} style={style}>
      <img
        src={src}
        alt={src
          .substr(
            src.lastIndexOf("/") + 1,
            src.lastIndexOf(".", src.lastIndexOf(".") - 1) - 1
          )
          .replace(/_|-/g, " ")}
      />
    </span>
  );
};

Icon.defaultProps = {
  size: "medium",
};
