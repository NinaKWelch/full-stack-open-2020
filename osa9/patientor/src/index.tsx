import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { reducer, StateProvider } from "./state";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <StateProvider reducer={reducer}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StateProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
//
