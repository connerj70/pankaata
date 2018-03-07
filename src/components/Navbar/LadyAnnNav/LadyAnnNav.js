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
                    <li>Letters</li>
                    <li>Email Lady Ann</li>
                    <li>About Lady Ann</li>
                </ul>
            </div>
        );
    }
}

export default LadyAnnNav;
