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
            modal: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleBellClick = this.handleBellClick.bind(this);
    }

    componentDidMount() {
        axios.get("/api/check-user").then(resp => {
            console.log(resp);
            if (resp.data.subscribed) {
                this.setState({
                    hideBtn: true
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
        console.log("clicked");
        this.setState(prevProps => {
            return {
                modal: !prevProps.modal
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

    render() {
        return (
            <div className="navbar_wrapper">
                {this.state.modal ? (
                    <Modal
                        fnc={this.handleBellClick}
                        title="Would you like to recieve notifications?"
                    />
                ) : null}
                <Notification
                    title={this.state.title}
                    options={this.state.options}
                    askAgain={true}
                />
                {this.state.popup ? (
                    <div className="mail-chimp-wrapper">
                        <span
                            style={{ color: "var(--red)", float: "right" }}
                            onClick={() => this.handleClick()}
                        >
                            X
                        </span>
                        <MailchimpSubscribe
                            url="https://pankaata.us12.list-manage.com/subscribe/post?u=760e8048ea540051ed798d77f&amp;id=d91f68e130"
                            render={({ subscribe, status, message }) => (
                                <CustomForm
                                    handleClick={this.handleClick}
                                    status={status}
                                    message={message}
                                    onValidated={formData =>
                                        subscribe(formData)
                                    }
                                />
                            )}
                        />
                    </div>
                ) : null}
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
                    <div className="desktop-nav">
                        <ul>
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
                                            onClick={() => this.handleClick()}
                                        >
                                            Subscribe
                                        </div>
                                    ) : null
                                ) : null}
                            </li>
                            <Link to="/worthynews">
                                <li className="navbar_dropdown">WorthyNews</li>
                            </Link>
                            <Link to="/food">
                                <li className="navbar_dropdown">FoodPorn</li>
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
