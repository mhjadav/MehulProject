import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {init as firebaseInit} from "./database";
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import App from "./App";

const renderRoot = () => {
    firebaseInit();    
    registerServiceWorker();
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
};
renderRoot();
  