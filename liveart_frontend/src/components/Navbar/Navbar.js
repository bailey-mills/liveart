import React, { useState, useEffect} from "react";
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
    const [profileImage, setProfileImage] = useState("https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg");
    const [categories, setCategories] = useState();    

    let clicked =  false;
    let history = useHistory();

    function handleClick(){
        // this.setState({ clicked: !this.state.clicked })
        clicked = !clicked;
    }

    function logoutuser(){
        
        let username = localStorage.getItem('user');
        
        axios.get(process.env.REACT_APP_SERVER + '/user/logout?Username='+username )
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
    if(user === null)
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
        // Get profile image
        axios.get(process.env.REACT_APP_SERVER + '/user/getUser/' + user).then(res=>{
            if(res.status === 200)
            {
                setProfileImage(res.data.AvatarURL);
            }
        });

        // Prepare user info (avatar, dropdown, logout)
        profile = <div className="sign-btn">
            {/* <Button>Log in</Button> */}
            {/* <Link className="nav-links" to={"/userprofile/bio"} > {user} </Link> */}

            <Nav>
                <Link to={"/userprofile/bio"}>
                    <Image src={profileImage} roundedCircle alt="avatar" className="navbar-avatar mt-2"/>
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

    // Setup Tag dropdown menu
    useEffect(()=>{
        // Get tags
        axios.get(process.env.REACT_APP_SERVER + '/all-tags-sorted').then(res=>{
            if(res.status === 200)
            {
                let menus = [];
                // Loop through tags to organize
                let i = 0;
                for (i = 0; i < res.data.length; i++) {
                    let set = res.data[i];
                    
                    let j = 0;
                    let tags = [];
                    for (j = 0; j < set.Tags.length; j++) {
                        let divider = <NavDropdown.Divider />;
                        if (j + 1 >= set.Tags.length) {
                            divider = null;
                        }
                        let name = set.Tags[j].Name;
                        tags.push(
                            <div>
                                <NavDropdown.Item href={"/events/" + name}>{name}</NavDropdown.Item>
                                { divider }
                            </div>
                        );
                    }

                    let dropdown = 
                        <NavDropdown title={set.Name}>
                            {tags}
                        </NavDropdown>;
                    menus.push(dropdown);
                }

                setCategories(menus);
            }
        });
    },[]);

    return(       
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" className="p-0">
            <Navbar.Brand href="/" className="p-0"><img src={logo} alt="logo" className="navbar-img"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {categories}
                </Nav>

                <SearchBar />

                {profile}
                
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar