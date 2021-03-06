import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Petstore} from "./components/Petstore"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";


// <Router /> is the root component which gets imported from the React Router package. 
// <Petstore /> child component of <Router />, which tells React I will be placing Routes in my Petstore component.

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Petstore />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
