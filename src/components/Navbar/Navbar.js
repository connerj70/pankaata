import React, { Component } from "react";
import "./Navbar.css";
import logo from "../../assets/pankaata-final.svg";
import SecondaryNav from "./SecondaryNav/SecondaryNav.js";
import { Link } from "react-router-dom";
import LadyAnnNav from "./LadyAnnNav/LadyAnnNav";

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
                        <Link to="/motivational">
                            <li className="navbar_dropdown">
                                MotivationalMonday
                            </li>
                        </Link>
                        <Link to="/worthynews">
                            <li className="navbar_dropdown">WorthyNews</li>
                        </Link>
                        <Link to="/food">
                            <li className="navbar_dropdown">FoodPorn</li>
                        </Link>
                        <Link to="/animal">
                            <li className="navbar_dropdown">AnimalLovers</li>
                        </Link>
                        <Link to="/thousandwords">
                            <li className="navbar_dropdown">ThousandWords</li>
                        </Link>
                        <Link to="/entertainment">
                            <li className="navbar_dropdown">Entertainment</li>
                        </Link>

                        <Link to="/relationships/videos">
                            <li className="navbar_dropdown">Relationship</li>
                        </Link>
                    </ul>
                </div>
                {this.props.secondaryNav ? (
                    <div className="navbar_secondary-nav-container">
                        {!this.props.ladyAnn ? (
                            <SecondaryNav
                                handleSearchTerm={this.props.handleSearchTerm}
                                handleSearchEnter={this.props.handleSearchEnter}
                                clearSearch={this.props.clearSearch}
                                searchTerm={this.props.searchTerm}
                            />
                        ) : (
                            <LadyAnnNav />
                        )}
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Navbar;

Navbar.defaultProps = {
    secondaryNav: true,
    ladyAnn: false
};
