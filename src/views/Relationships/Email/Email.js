import React, { Component } from "react";
import "./Email.css";

class Email extends Component {
    render() {
        return (
            <div className="lady-ann-email">
                <h3 className="lady-ann-to">To: LadyAnn@Pankaata.com</h3>
                <div className="email_sub-container">
                    <h3>From:</h3>
                    <input type="text" />
                </div>
                <div className="email_sub-container">
                    <h3>Subject:</h3>
                    <input type="text" />
                </div>
                <div className="email_sub-container">
                    <h3>Situation Box:</h3>
                    <textarea />
                </div>
            </div>
        );
    }
}

export default Email;
