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
                        {this.props.situation}
                    </p>
                </div>
                <div>{this.props.sender}</div>
            </div>
        );
    }
}

export default Letter;

Letter.defaultProps = {
    cut: true
};
