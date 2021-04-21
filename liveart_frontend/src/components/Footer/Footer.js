import React, { Component } from 'react';
import './Footer.css'
import logo from '../../Assets/logo/logo2.png';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useHistory } from "react-router-dom";


function Footer(){
  return(
      <footer className="bg-dark text-center text-sm-start text-light">
        <div className="text-center text-light p-3" >
          <h5 className="text-uppercase">Programmers - Team Sherba</h5>
  
          <ul className="list-unstyled mb-0">
            <li>
              <a href="#!" className="text-light">Eric Lin</a>
            </li>
            <li>
              <a href="#!" className="text-light">Shuang Liang</a>
            </li>
            <li>
              <a href="#!" className="text-light">Bailey Mills</a>
            </li>
          </ul>
        </div>
        
        <div className="text-center text-light p-3">
          © 2020 Copyright:
          <a> Team Sherba</a>
        </div>

      </footer>
  )
}

export default Footer;