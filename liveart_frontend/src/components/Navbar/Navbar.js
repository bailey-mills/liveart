import React, { Component } from 'react';
import { Button } from "../Button"
import './Navbar.css'
import logo from '../../Assets/logo/logo2.png';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import Route from 'react-router-dom/Route';


class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(
            <Router>
            <nav className="NavbarItems">
                <a href="/" className="navbar-img"><img src={logo} alt="logo" className="navbar-img"/> </a>
                {/* options */}
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <a className="nav-links" href={"/events"}>
                        Events
                        </a>
                    </li>
                    <li>
                        <a className="nav-links" href={"#"}>
                        Contact Us
                        </a>
                    </li>

                </ul>
                {/* logo */}
                {/* <h1 className="navbar-logo"> <img src={logo} alt="logo" className="navbar-img"/> <i className="fab fa-react"></i></h1> */}
                
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                
                {/* sign up */}
                <div className="sign-btn">
                <a href={"/register"} > <Button>Sign Up</Button> </a>
                {/* <Button>Log in</Button> */}
                <a href={"/login"} > <Button>Log in</Button> </a>
                </div>

            </nav>
            </Router>
        )
    }
}

export default Navbar