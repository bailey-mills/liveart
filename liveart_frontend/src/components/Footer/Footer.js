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
            

            <footer class="bg-dark text-center text-sm-start text-light">

              <div class="container p-4">

                <div class="row">

                  <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 class="text-uppercase text-light">LIVE.ART</h5>
            
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
                      molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam
                      voluptatem veniam, est atque cumque eum delectus sint!
                    </p>
                  </div>

                  <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase">Programmers - Team Sherba</h5>
            
                    <ul class="list-unstyled mb-0">
                      <li>
                        <a href="#!" class="text-light">Eric Lin</a>
                      </li>
                      <li>
                        <a href="#!" class="text-light">Shuang Liang</a>
                      </li>
                      <li>
                        <a href="#!" class="text-light">Bailey Mills</a>
                      </li>
                    </ul>
                  </div>

                  <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="text-uppercase mb-0">Source Code</h5>
            
                    <ul class="list-unstyled">
                      <li>
                        <a href="#!" class="text-dark">Github Link</a>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>

              <div class="text-center text-light p-3" >
                © 2020 Copyright:
                <a class="text-light" href="https://mdbootstrap.com/">Team Sherba</a>
              </div>

            </footer>

            
        )
    
}

export default Footer;