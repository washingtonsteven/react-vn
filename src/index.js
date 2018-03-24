import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import fontawesome from "@fortawesome/fontawesome";
import { faGithub, faTwitter } from "@fortawesome/fontawesome-free-brands";
import {
  faTrash,
  faExclamation,
  faTimesCircle
} from "@fortawesome/fontawesome-free-solid";
// import registerServiceWorker from './registerServiceWorker';

fontawesome.library.add(
  faTrash,
  faExclamation,
  faTimesCircle,
  faGithub,
  faTwitter
);

ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();
