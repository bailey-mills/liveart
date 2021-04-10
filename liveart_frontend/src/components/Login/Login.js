import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  let directFromRegister;


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {

    event.preventDefault();
    let formData = {
        Username: event.target[0].value,
        Password: event.target[1].value
    };


    axios.post('http://localhost:5000/user/login', formData)
        .then(res=>{
          if(res.status === 201)
          {
            localStorage.setItem('user', formData.Username);
            localStorage.setItem('userID', res.data.UserID);
            history.push('/')
          }
            

        })
        .catch(function (error) {          
          if(error.response && error.response.status===401){
            alert("Password is wrong");
            console.log("Password is wrong");
          }
          else if(error.response && error.response.status === 404)
          {
            alert("User does not exist");
            console.log("User does not exist");
          }
      })



    // if(formData.email==="lin@test.com" && formData.password==="123")
    // {
    //     console.log("correct");
    //     localStorage.setItem('user', formData.email);
    //     history.push('/')
    // }

    // console.log(formData);


  }

  if(props.location.state.registered === true)
  {
    directFromRegister = <div className="registered-message"> <h5>Congratulations! You have just registered an account in Live.Art!</h5> </div>;
  }
  else
  {
    directFromRegister = <div></div>;

  }

  return (
    <div className="Login">
        <Navbar />
        <div className="row mt-5">
        <div className="col-3">

        </div>
        <Form  onSubmit={handleSubmit} className="col-4 mt-5 mr-2">
            <h1>LIVE.ART Login</h1>
            <br/>
            {directFromRegister}
            <br/>
            <Form.Group size="lg" controlId="email">
            <Form.Label>Username</Form.Label>
            <Form.Control
                autoFocus
                type="string"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
            </Button>
        </Form>
        <div className="col-1">

        </div>
          <div className="login-img col-4">
          <img  src="https://i.ibb.co/4RCbB1B/logo.png" alt="logo" border="0" />
          </div>
        </div>
    </div>
    
  );
}