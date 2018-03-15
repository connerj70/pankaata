import React, { Component } from "react";
import "./Footer.css";
import logo from "../../assets/pankaata-final.svg";

class Footer extends Component {
    render() {
        return (
            <div className="footer-wrapper">
                <div className="footer_logo-container">
                    <img className="footer-logo" src={logo} />
                </div>
                <div className="footer_social-container">
                    <i className="fab fa-facebook-f" />
                    <i className="fab fa-twitter" />
                    <i className="fab fa-instagram" />
                </div>
                <div className="footer_links-container">
                    <ul>
                        <li>About Pankaata</li>
                        <li>Privacy Policy</li>
                        <li>Communications Preference</li>
                        <li>Terms of Use</li>
                        <li>Advertisement</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Footer;
