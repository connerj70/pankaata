import React, { Component } from "react";
import "./LadyAnnNav.css";
import { Link } from "react-router-dom";

class LadyAnnNav extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <div className="lady-ann-container">
                <div />
                <ul>
                    <Link to="/relationships/videos">
                        <li>Videos</li>
                    </Link>
                    <Link to="/relationships/letters">
                        <li>Letters</li>
                    </Link>
                    <Link to="/relationships/email">
                        <li>Email Lady. Ann</li>
                    </Link>
                    <Link to="/relationships/about">
                        <li>About Lady. Ann</li>
                    </Link>
                </ul>
            </div>
        );
    }
}

export default LadyAnnNav;
