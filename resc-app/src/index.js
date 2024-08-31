import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import Context from "./Store/Context";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <Context>
     <App/>
     </Context>
    </BrowserRouter>,
  </React.StrictMode>
);

reportWebVitals();
