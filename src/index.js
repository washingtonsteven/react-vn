import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App storyURL="./data/story.json" />,
  document.getElementById("root")
);
// registerServiceWorker();

export const modalNode = document.getElementById("modal-root");
