import React from "react";
import ReactDOM from "react-dom";
import Slideshow from "./__slideshow";
import Navbar from "./components/Navbar/Navbar";
import './components/Navbar/Navbar.css';
import './index.css'

// import Navbar from 'react-bootstrap/Navbar';


const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    
    <Navbar />
    <Slideshow />
    <hr/>
    <h1> Recommended Events Below</h1>

    
  </React.StrictMode>
    
    , rootElement);
