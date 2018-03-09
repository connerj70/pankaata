import React, { Component } from "react";
import "./Letter.css";

class Letter extends Component {
    render() {
        return (
            <div className="admin-letter-container">
                {this.props.admin ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                            minWidth: "50px"
                        }}
                    >
                        <i
                            onClick={() =>
                                this.props.deleteLetter(this.props.letterId)
                            }
                            className="far fa-trash-alt"
                        />
                    </div>
                ) : null}
                {this.props.anonymous ? (
                    <div className="anon-highlight">
                        *User Prefers To Remain Anonymous
                    </div>
                ) : null}
                <div>
                    <h2>{this.props.subject}</h2>
                    <h4 style={{ marginTop: "5px" }}> {this.props.date}</h4>
                </div>
                <div>
                    <div className="paragraph-container">
                        Dear Lady Ann:
                        <p className={this.props.cut ? "p_cut-text" : null}>
                            {this.props.situation}
                        </p>
                        <br />
                        {this.props.response ? (
                            <div>
                                Dear Anonymous:
                                <p>{this.props.response}</p>
                            </div>
                        ) : null}
                    </div>
                </div>

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
