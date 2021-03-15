import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {

    event.preventDefault();
    let formData = {
        email: event.target[0].value,
        password: event.target[1].value
    };

    if(formData.email==="lin@test.com" && formData.password==="123")
    {
        console.log("correct");
        localStorage.setItem('user', formData.email);
        history.push('/')
    }

    console.log(formData);


  }



  return (
    <div className="Login">
        <Navbar />
        <br/>
        <br/>
        <h1>LIVE.ART Login</h1>
        <br/>
        <br/>
        
        <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
                autoFocus
                type="email"
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
        
    </div>
  );
}