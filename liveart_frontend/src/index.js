/**
 * @file index.js - The source code of the default index page component
 * @author Eric Lin
 * 
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
// import events from "./components/EventSection/eventsSample"

// import Navbar from 'react-bootstrap/Navbar';


const rootElement = document.getElementById("root");

ReactDOM.render(
  <App/>
    
    , rootElement);
