import React, { Component } from 'react';
import './Navbar.css'
import logo from '../../Assets/logo/logo2.png';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import UserProfile from "../UserProfile/Bio/Bio";
import { useHistory } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import SearchBar from "../UserSearch/SearchBar";

function MyNavbar(){
         
    let clicked =  false;
    let history = useHistory();

    function handleClick(){
        // this.setState({ clicked: !this.state.clicked })
        clicked = !clicked;
    }

    function logoutuser(){
        
        let username = localStorage.getItem('user');
          
        axios.get('http://localhost:5000/user/logout?Username='+username )
        .then(res=>{ 
            if(res.status===205)
            {
                localStorage.removeItem('user');
                localStorage.removeItem('userID');

                // window.location.reload();
                
                history.push({
                    pathname: '/login',
                    state: { registered: false }
                });
            }
            else
            {
                alert("Failed to logout");
            }
        })
        
    }

    
        const user = localStorage.getItem('user');
        let profile;
        if(user=== null)
        {
             profile =   <div className="sign-btn">
             {/* <Button>Log in</Button> */}
             {/* <Link  to={"/login"} > <Button>Log in</Button> </Link> */}
             <Link to={{
                pathname: '/login',
                state: { registered: false }
                }} className="px-3"> <Button variant="success">Log in</Button> </Link>
             <Link  to={"/register"}><Button>Sign Up</Button></Link>
            </div>;
        }
        else
        {
            //console.log(user);
            profile =   <div className="sign-btn">
             {/* <Button>Log in</Button> */}
             {/* <Link className="nav-links" to={"/userprofile/bio"} > {user} </Link> */}
             <Nav>
                 <Link to={"/userprofile/bio"}>
             <Image src={"https://cdn.imgbin.com/3/16/6/imgbin-geometric-wolf-avatar-XKYvCD5J4tGSSn5pAtkWgmA9s.jpg"} roundedCircle alt="avatar" className="navbar-avatar mt-2"/>                
             </Link>
             <NavDropdown title={user} id="collasible-nav-dropdown" className="pr-4 pt-3 pb-3 text-light" >
                <NavDropdown.Item href="/userprofile/bio">Bio</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/userprofile/subsevents">Subscribed Events</NavDropdown.Item>
                <NavDropdown.Item href="/userprofile/plannedevents">Planned Events</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/userprofile/soldproducts">Sold Items</NavDropdown.Item>
                <NavDropdown.Item href="/userprofile/purchasedproducts">Purchased Items</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/userprofile/datavis">Data Visulization</NavDropdown.Item>
            </NavDropdown>
            <Button onClick={logoutuser} variant="warning" className="mt-3 mb-3">Log out</Button>

            </Nav>
            
             
            </div>;
        }
        return(       
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" className="p-0">
                <Navbar.Brand href="/" className="p-0"><img src={logo} alt="logo" className="navbar-img"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/events">Events</Nav.Link>
                        <Nav.Link href="/contactus" className="ml-2">Contact us</Nav.Link>
                    </Nav>
                    
                    <SearchBar />

                    {profile}
                    
                </Navbar.Collapse>
            </Navbar>
        )
    
}

export default MyNavbar