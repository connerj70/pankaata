import React, { Component } from "react";
import "./Email.css";
import axios from "axios";

class Email extends Component {
    constructor(props) {
        super(props);
        this.state = { from: "", subject: "", situation: "", anonymous: false };
    }
    handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;

        this.setState({
            [name]: value
        });
    }

    handleCheckbox() {
        this.setState(prevProps => {
            return {
                anonymous: !prevProps.anonymous
            };
        });
    }

    handleClick() {
        axios
            .post("/api/lady/email", {
                from: this.state.from,
                subject: this.state.subject,
                situation: this.state.situation,
                anonymous: this.state.anonymous
            })
            .then(resp => {
                console.log(resp);
            });
    }

    render() {
        return (
            <div className="lady-ann-email">
                <h3 className="lady-ann-to">To: LadyAnn@Pankaata.com</h3>
                <div className="email_sub-container">
                    <h3>From:</h3>
                    <input
                        name="from"
                        onChange={e => this.handleChange(e)}
                        type="text"
                    />
                </div>
                <div className="email_sub-container">
                    <h3>Subject:</h3>
                    <input
                        name="subject"
                        onChange={e => this.handleChange(e)}
                        type="text"
                    />
                </div>
                <div className="email_sub-container">
                    <h3>Situation:</h3>
                    <textarea
                        name="situation"
                        onChange={e => this.handleChange(e)}
                        rows="10"
                    />
                </div>
                <div className="email_sub-container">
                    <h3>Lady Please Keep Me Anonymous:</h3>
                    <input
                        style={{ width: "auto" }}
                        onChange={() => this.handleCheckbox()}
                        type="checkbox"
                    />
                </div>
                <div className="email_sub-container button-container">
                    <button onClick={() => this.handleClick()}>Send</button>
                </div>
            </div>
        );
    }
}

export default Email;
