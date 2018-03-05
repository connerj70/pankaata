import React, { Component } from "react";
import "./Navbar.css";
import logo from "../../assets/pankaata-final.svg";
import SecondaryNav from "./SecondaryNav/SecondaryNav.js";
import { Link } from "react-router-dom";

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
                        <Link to="/">
                            <img
                                className="pankaata-logo"
                                alt="logo"
                                src={logo}
                            />
                        </Link>
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
                                x
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
                        <Link to="/worthynews">
                            <li className="navbar_dropdown">Worthy News</li>
                        </Link>
                        <Link to="/motivational">
                            <li className="navbar_dropdown">
                                Motivational Monday
                            </li>
                        </Link>
                        <Link to="/food">
                            <li className="navbar_dropdown">Food</li>
                        </Link>

                        <Link to="/relationships">
                            <li className="navbar_dropdown">Relationship</li>
                        </Link>

                        <Link to="/animal">
                            <li className="navbar_dropdown">Animal World</li>
                        </Link>
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
