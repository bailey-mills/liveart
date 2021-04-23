/**
 * @file Footer.js - The source code of the footer component
 * @author Eric Lin
 * 
 */  
import React, { Component } from 'react';
import './Footer.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


function Footer(){


        return(       
            

            <footer className="bg-dark text-center text-sm-start text-light">

              <div className="container p-4">

                <div className="row">

                  <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 className="text-uppercase text-light">LIVE.ART</h5>
            
                    <p>
                    LIVE.ART is a Live Event Based Virtual Auction Platform dedicated for Art Works. It brings dynamic unique user experiences to the world of online auction. 
                    Virtual auction websites are traditionally product-oriented, resulting in insufficient engagement between buyers and sellers. LIVE.ART extends the online auction 
                    experience with comprehensive event recommendations, real-time interactions, and informative business analytics. 
                    </p>
                    <p><strong>Welcome to the Carnival of Creators</strong></p>
                  </div>

                  <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Developers</h5>
                    <h5 className="">Team Sherba</h5>

                    <ul className="list-unstyled mb-0 mt-1">
                      <li>
                        <a href="https://github.com/EricL414" rel="noopener noreferrer" target="_blank" className="text-light">Eric Lin</a>
                      </li>
                      <li>
                        <a href="https://github.com/Bug-Shuang-Code-Not-Work" rel="noopener noreferrer" target="_blank" className="text-light">Shuang Liang</a>
                      </li>
                      <li>
                        <a href="https://github.com/bailey-mills" rel="noopener noreferrer" target="_blank" className="text-light">Bailey Mills</a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase mb-0">Source Code</h5>
            
                    <ul className="list-unstyled">
                      <li>
                         <a href="https://github.com/bailey-mills/liveart" rel="noopener noreferrer" target="_blank" className="text-light"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="icon" style={{width: 20, height: 20}}/> Github</a>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>

              <div className="text-center text-light p-3" >
                Conestoga College SET 2021 Winter Capstone Project - LIVE.ART by Team Sherba
              </div>

            </footer>

            
        )
    
}

export default Footer;