import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import App from "./app2.js";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);

reportWebVitals();
