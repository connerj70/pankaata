import React, { Component } from "react";
import "./Footer.css";
import logo from "../../assets/pankaata-footer-logo.svg";

class Footer extends Component {
    render() {
        return (
            <div className="footer-wrapper">
                <div className="footer_logo-container">
                    <img
                        alt="pankaata logo"
                        className="footer-logo"
                        src={logo}
                    />
                </div>
                <div className="footer_social-container">
                    <a href="https://www.facebook.com/pankaata/?ref=br_rs">
                        {" "}
                        <i
                            style={{
                                cursor: "pointer",
                                color: "rgb(27,117,188)"
                            }}
                            className="fab fa-facebook-f"
                        />
                    </a>
                    <a href="https://twitter.com/pankaata">
                        <i
                            style={{
                                cursor: "pointer",
                                color: "rgb(251,176,64)"
                            }}
                            className="fab fa-twitter"
                        />
                    </a>
                    <a href="https://www.instagram.com/pankaata/">
                        <i
                            style={{
                                cursor: "pointer",
                                color: "rgb(239,65,54)"
                            }}
                            className="fab fa-instagram"
                        />
                    </a>
                </div>
                <div className="footer_links-container">
                    <ul>
                        <li style={{ color: "var(--second-font-color)" }}>
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
                            Place An Advert With Pankaata
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Footer;
