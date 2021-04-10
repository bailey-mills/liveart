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
             <NavDropdown title={user} id="collasible-nav-dropdown" className="px-4">
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
             <Button onClick={logoutuser} variant="warning">Log out</Button>
             </Nav>
            </div>;
        }
        return(       
            // <div>
            //     <nav className="NavbarItems">
            //         {/* logo */}
            //         <Link className="navbar-links" to={"/"}><img src={logo} alt="logo" className="navbar-img"/> </Link>
            //         {/* options */}
            //         <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
            //             <li>
            //                 <Link className="nav-links" to={"/events"} > Events </Link>
            //             </li>
            //             <li>
            //             <Link className="nav-links" to={"/contactus"} > Contact us </Link>
            //             </li>

            //         </ul>

            //         <div className="menu-icon" onClick={handleClick}>
            //             <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            //         </div>
                    
                    

            //         {/* sign up
            //         <div className="sign-btn">
            //             <Button>Log in</Button>
            //             <Link  to={"/login"} > <Button>Log in</Button> </Link>
            //             <Link  to={"/register"}><Button>Sign Up</Button></Link>
            //         </div> */}
            //         {profile}

            //     </nav>
            //     <br/>
            //     <br/>
            // </div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" className="p-0">
                <Navbar.Brand href="/" className="p-0"><img src={logo} alt="logo" className="navbar-img"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/events">Events</Nav.Link>
                        <Nav.Link href="/contactus">Contact us</Nav.Link>
                    </Nav>
                    
                    {/* <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Dank memes
                    </Nav.Link> */}
                    {profile}
                    
                </Navbar.Collapse>
            </Navbar>
        )
    
}

export default MyNavbar