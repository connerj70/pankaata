import React, { Component } from "react";
import "./Navbar.css";
import logo from "../../assets/pankaata-final.svg";
import SecondaryNav from "./SecondaryNav/SecondaryNav.js";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
    }

    handleMenu() {
        this.setState(prevState => {
            return {
                menu: !prevState.menu
            };
        });
    }

    render() {
        return (
            <div className="navbar_wrapper">
                <div className="navbar">
                    <div className="navbar_logo">
                        <img alt="logo" src={logo} />
                    </div>
                    <div
                        className="menu-drop"
                        onClick={() => this.handleMenu()}
                    >
                        {this.state.menu ? (
                            <div
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "100"
                                }}
                            >
                                <i className="fas fa-times" />
                            </div>
                        ) : (
                            <div>MENU &#9660;</div>
                        )}
                    </div>
                </div>
                <div
                    className={
                        this.state.menu
                            ? "navbar_mobile-dropdown"
                            : "navbar_hide"
                    }
                >
                    <ul>
                        <li className="navbar_dropdown">Worthy News</li>
                        <li className="navbar_dropdown">Motivational Monday</li>
                        <li className="navbar_dropdown">Food</li>
                        <li className="navbar_dropdown">Relationship</li>
                        <li className="navbar_dropdown">Animal World</li>
                    </ul>
                </div>
                <div className="navbar_secondary-nav-container">
                    <SecondaryNav />
                </div>
            </div>
        );
    }
}

export default Navbar;
