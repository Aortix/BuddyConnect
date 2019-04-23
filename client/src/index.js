import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

ReactDOM.render(
  <Provider store={store()}>
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById("root")
);
