import React, { Component } from "react";
import "./Letter.css";

class Letter extends Component {
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
                    <div className="paragraph-container">
                        Dear Lady Ann:{" "}
                        <p className={this.props.cut ? "p_cut-text" : null}>
                            {this.props.situation}
                        </p>
                        <br />
                        {this.props.response ? (
                            <p>
                                {!this.props.anonymous && this.props.nickname
                                    ? `Dear ${this.props.nickname}: `
                                    : "Dear Anonymous: "}
                                {this.props.response}
                            </p>
                        ) : null}
                    </div>
                </div>
                {this.props.sender ? (
                    <div className="letter_user_div">
                        User: {this.props.sender}
                    </div>
                ) : null}
                <div>
                    {this.props.show ? (
                        <div>
                            Response has been sent{" "}
                            <i className="fas fa-check" />
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
