import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import { Button } from "../Button"
import './Navbar.css'
import logo from '../../Assets/logo/logo2.png';

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(
            <nav className="NavbarItems">
                {/* options */}
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                {/* logo */}
                {/* <h1 className="navbar-logo"> <img src={logo} alt="logo" className="navbar-img"/> <i className="fab fa-react"></i></h1> */}
                <img src={logo} alt="logo" className="navbar-img"/> 
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                
                {/* sign up */}
                <Button>Sign Up</Button>
            </nav>
        )
    }
}

export default Navbar