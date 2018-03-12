import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
    render() {
        return (
            <div className="footer-wrapper">
                <div className="footer_inner-container">
                    <h2>About Us</h2>
                    <ul>
                        <li>About Pankaata</li>
                        <li>Careers</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="footer_inner-container">
                    <h2>Information</h2>
                    <ul>
                        <li>Adverts</li>
                        <li>FAQs</li>
                        <li>Cookie Policy</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer_inner-container">
                    <h2>Contact Us</h2>
                    <ul>
                        <li>Tel:</li>
                        <li className="footer_highlight">+ 1 443 902 3860</li>
                    </ul>
                    <ul>
                        <li>Email:</li>
                        <li className="footer_highlight">info@pankaata.com</li>
                    </ul>
                </div>
                <div className="footer_inner-container final-container">
                    <p className="footer_paragraph">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                    </p>
                    <div classname="footer_privacy-and-terms">
                        <div className="footer_privacy-and-terms-div">
                            Pankaata © 2018.
                        </div>
                        <div className="footer_privacy-and-terms-div">
                            Privacy
                        </div>
                        <div className="footer_privacy-and-terms-div">
                            Terms & Conditions
                        </div>
                    </div>
                    <div className="footer_links-container">
                        <div className="footer-link">
                            <a href="https://www.facebook.com/pankaata/">
                                <i className="fab fa-facebook-square" />
                            </a>
                        </div>
                        <div className="footer-link">
                            <a href="https://www.instagram.com/pankaata/">
                                <i className="fab fa-instagram" />
                            </a>
                        </div>
                        <div className="footer-link">
                            <a href="https://twitter.com/PankaataI">
                                <i className="fab fa-twitter" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
