import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Contactus.css";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function Contactus(props) {
  


  return (
    <div>
        <Navbar />
        <div className="contactus-body">
            This is contact us page
        </div>
    </div>
    
  );
}