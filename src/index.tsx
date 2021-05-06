import React from "react";
import ReactDom from "react-dom";
import "./index.scss";

import { Dashboard } from "~components/pages/Dashboard";
// import reportWebVitals from "./reportWebVitals";

ReactDom.render(
  //<React.StrictMode>
    <Dashboard />,
  //</React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();