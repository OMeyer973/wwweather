import React from "react";
import ReactDom from "react-dom";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => (
  <>
    <Header/>
    <Dashboard></Dashboard>
  </>
);

export default App;
