import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import LoginPage from "./pages/Login/LoginPage";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router"
import ChartDataContextState from './Context/ChartDataContext/ChartDataContextState'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChartDataContextState>
        {/* <App /> */}
        {/* <LoginPage /> */}
        <Router />
      </ChartDataContextState>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
