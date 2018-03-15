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
                    <i
                        style={{ cursor: "pointer", color: "rgb(27,117,188)" }}
                        className="fab fa-facebook-f"
                    />
                    <i
                        style={{ cursor: "pointer", color: "rgb(251,176,64)" }}
                        className="fab fa-twitter"
                    />
                    <i
                        style={{ cursor: "pointer", color: "rgb(239,65,54)" }}
                        className="fab fa-instagram"
                    />
                </div>
                <div className="footer_links-container">
                    <ul>
                        <li style={{ color: "rgb(125,78,36)" }}>
                            About Pankaata
                        </li>
                        <li style={{ color: "rgb(27,117,188)" }}>
                            Privacy Policy
                        </li>
                        <li style={{ color: "rgb(251,176,64)" }}>
                            Communications Preference
                        </li>
                        <li style={{ color: "rgb(197,147,117)" }}>
                            Terms of Use
                        </li>
                        <li style={{ color: "rgb(239,65,54)" }}>
                            Advertisement
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Footer;
