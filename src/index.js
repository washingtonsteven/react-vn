import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import fontawesome from "@fortawesome/fontawesome";
import { faGithub, faTwitter } from "@fortawesome/fontawesome-free-brands";
import { faTrash } from "@fortawesome/fontawesome-free-solid";
// import registerServiceWorker from './registerServiceWorker';

fontawesome.library.add(faTrash, faGithub, faTwitter);

ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();

export const modalNode = document.getElementById("modal-root");
