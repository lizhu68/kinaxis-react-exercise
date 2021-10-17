import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./custom.scss";
import { ReservesContextProvider } from "./store/reserves-content";

ReactDOM.render(
  <ReservesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReservesContextProvider>,
  document.getElementById("root")
);
