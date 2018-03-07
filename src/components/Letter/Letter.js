import React, { Component } from "react";
import "./Letter.css";

class Letter extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="admin-letter-container">
                {this.props.anonymous ? (
                    <div className="anon-highlight">
                        *User Prefers To Remain Anonymous
                    </div>
                ) : null}
                <div>
                    <h2>{this.props.subject}</h2>
                </div>
                <div>
                    <p className={this.props.cut ? "p_cut-text" : null}>
                        Dear Lady Ann: {this.props.situation}
                        <br />
                        {this.props.response ? (
                            <div>{this.props.response}</div>
                        ) : null}
                    </p>
                </div>
                {this.props.sender ? (
                    <div className="letter_user_div">
                        User: {this.props.sender}
                    </div>
                ) : null}
                <div>
                    {this.props.show ? (
                        <div>
                            Response has been sent <i class="fas fa-check" />
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Letter;

Letter.defaultProps = {
    cut: true
};
