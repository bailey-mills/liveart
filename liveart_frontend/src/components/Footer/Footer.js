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

              <div className="container p-4">

                <div className="row">

                  <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 className="text-uppercase text-light">LIVE.ART</h5>
            
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
                      molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam
                      voluptatem veniam, est atque cumque eum delectus sint!
                    </p>
                  </div>

                  <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
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

                  <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase mb-0">Source Code</h5>
            
                    <ul className="list-unstyled">
                      <li>
                        <a href="#!" className="text-dark">Github Link</a>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>

              <div className="text-center text-light p-3" >
                © 2020 Copyright:
                <a className="text-light" href="https://mdbootstrap.com/">Team Sherba</a>
              </div>

            </footer>

            
        )
    
}

export default Footer;