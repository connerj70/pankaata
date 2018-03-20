import React, { Component } from "react";
import "./Navbar.css";
import logo from "../../assets/pankaata-final.svg";
import SecondaryNav from "./SecondaryNav/SecondaryNav.js";
import { Link } from "react-router-dom";
import CustomForm from "../../components/CustomForm/CustomForm";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import axios from "axios";
import ReactGA from "react-ga";
import Notification from "react-web-notification";
import Modal from "../Modal/Modal";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            popup: false,
            hideBtn: false,
            title: "Notifications set",
            options: {
                body: "You will receive notifications from  pankaata.com"
            },
            modal: false,
            notifications: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleBellClick = this.handleBellClick.bind(this);
        this.handleBellClick2 = this.handleBellClick2.bind(this);
    }

    componentDidMount() {
        axios.get("/api/check-user").then(resp => {
            if (resp.data.subscribed) {
                this.setState({
                    hideBtn: true,
                    notifications: false
                });
            } else if (resp.data.firstVisit && !resp.data.subscribed) {
                this.setState({ popup: true });
            }
        });
    }

    handleMenu() {
        this.setState(prevState => {
            return {
                menu: !prevState.menu
            };
        });
    }

    handleClick() {
        this.sendEvent();
        this.setState(prevProps => {
            return {
                popup: !prevProps.popup
            };
        });
    }

    handleBellClick() {
        this.setState(prevProps => {
            return {
                modal: !prevProps.modal
            };
        });
    }

    handleBellClick2() {
        this.setState(prevProps => {
            return {
                modal: !prevProps.modal,
                notifications: true
            };
        });
    }

    sendEvent = event => {
        ReactGA.event({
            category: "button click",
            action: "click",
            label: "subscribe modal opened"
        });
    };

    closePopup = () => {
        this.setState({
            popup: false
        });
    };
    render() {
        let noti;
        if (this.state.notifications) {
            noti = (
                <Notification
                    title={this.state.title}
                    options={this.state.options}
                    askAgain={true}
                />
            );
        }
        return (
            <div className="navbar_wrapper">
                {this.state.modal ? (
                    <Modal
                        fnc={this.handleBellClick}
                        fnc2={this.handleBellClick2}
                        title="Would you like to recieve notifications?"
                    />
                ) : null}
                {noti}
                {this.state.popup ? (
                    <div className="mail-chimp-wrapper">
                        <span
                            style={{ color: "var(--red)", float: "right" }}
                            onClick={() => this.handleClick()}
                        >
                            X
                        </span>
                        <MailchimpSubscribe
                            url="https://pankaata.us12.list-manage.com/subscribe/post?u=22c1870a1568339e5ca97c8f0&amp;id=148d98d01f"
                            render={({ subscribe, status, message }) => (
                                <CustomForm
                                    closePopup={this.closePopup}
                                    handleClick={this.handleClick}
                                    status={status}
                                    message={message}
                                    onValidated={formData => {
                                        console.log("FORM DATA", formData);
                                        subscribe(formData);
                                    }}
                                />
                            )}
                        />
                    </div>
                ) : null}
                <div className="navbar">
                    <div className="smaller-navbar-wrapper">
                        <div className="navbar_logo">
                            <Link to="/">
                                <img
                                    className="pankaata-logo"
                                    alt="logo"
                                    src={logo}
                                />
                            </Link>
                        </div>
                        <div className="desktop-nav">
                            <ul>
                                <Link to="/worthynews">
                                    <li className="navbar_dropdown">
                                        WorthyNews
                                    </li>
                                </Link>
                                <Link to="/food">
                                    <li className="navbar_dropdown">
                                        FoodPorn
                                    </li>
                                </Link>
                                <Link to="/animal">
                                    <li className="navbar_dropdown">
                                        AnimalLovers
                                    </li>
                                </Link>
                                <Link to="/entertainment">
                                    <li className="navbar_dropdown">
                                        Entertainment
                                    </li>
                                </Link>
                                <Link to="/thousandwords">
                                    <li className="navbar_dropdown">
                                        ThousandWords
                                    </li>
                                </Link>
                                <Link to="/motivational">
                                    <li className="navbar_dropdown">
                                        MotivationalMonday
                                    </li>
                                </Link>
                                <li
                                    onClick={() => this.handleBellClick()}
                                    style={{ color: "var(--yellow)" }}
                                    className="navbar_dropdown"
                                >
                                    <i className="fas fa-bell" />
                                </li>

                                <li className="navbar_dropdown">
                                    {!this.state.hideBtn ? (
                                        !this.state.popup ? (
                                            <div
                                                className="subscribe-update-btn"
                                                onClick={() =>
                                                    this.handleClick()
                                                }
                                            >
                                                Subscribe
                                            </div>
                                        ) : null
                                    ) : null}
                                </li>
                                {/* <Link to="/thousandwords">
                            <li className="navbar_dropdown">ThousandWords</li>
                        </Link> */}
                            </ul>
                        </div>
                        <div
                            className="menu-drop"
                            onClick={() => this.handleMenu()}
                        >
                            {this.state.menu ? (
                                <div
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: "100",
                                        marginLeft: "40px"
                                    }}
                                >
                                    x
                                </div>
                            ) : (
                                <div>MENU &#9660;</div>
                            )}
                        </div>
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
                            <li className="navbar_dropdown">WorthyNews</li>
                        </Link>
                        <Link to="/food">
                            <li className="navbar_dropdown">FoodPorn</li>
                        </Link>
                        <Link to="/animal">
                            <li className="navbar_dropdown">AnimalLovers</li>
                        </Link>
                        <Link to="/entertainment">
                            <li className="navbar_dropdown">Entertainment</li>
                        </Link>
                        <Link to="/thousandwords">
                            <li className="navbar_dropdown">ThousandWords</li>
                        </Link>
                        <Link to="/motivational">
                            <li className="navbar_dropdown">
                                MotivationalMonday
                            </li>
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
                        ) : null}
                    </div>
                ) : null}

                {!this.state.hideBtn ? (
                    !this.state.popup ? (
                        <div
                            className="subscribe-update-btn hide"
                            onClick={() => this.handleClick()}
                        >
                            Subscribe
                        </div>
                    ) : null
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
