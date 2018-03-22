import React, { Component } from "react";
import axios from "axios";

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = { newPass1: "", newPass2: "", loggedIn: false };
    }

    componentDidMount() {
        axios.get("/api/admin").then(resp => {
            this.setState({
                loggedIn: resp.data
            });
        });
    }

    handleChange(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleClick = () => {
        const { newPass1, newPass2 } = this.state;
        if (newPass1 === newPass2) {
            axios
                .post("/api/admin/password", { newPass1, newPass2 })
                .then(resp => {});
            this.props.history.push("/");
        } else {
            alert("Passwords must match");
        }
    };

    render() {
        return (
            <div style={{ minHeight: "90vh" }}>
                {this.state.loggedIn ? (
                    <div style={{ marginTop: "20%" }}>
                        <h1 style={{ marginBottom: "20px" }}>
                            Change Admin Password
                        </h1>
                        <input
                            style={{
                                marginRight: "20px",
                                borderRadius: "5px",
                                padding: "5px 10px"
                            }}
                            placeholder="new password"
                            onChange={e => this.handleChange(e)}
                            name="newPass1"
                            type="password"
                        />
                        <input
                            style={{
                                marginRight: "20px",
                                borderRadius: "5px",
                                padding: "5px 10px"
                            }}
                            placeholder="new password again"
                            onChange={e => this.handleChange(e)}
                            name="newPass2"
                            type="password"
                        />
                        <button
                            style={{ padding: "8px 12px", borderRadius: "5px" }}
                            onClick={this.handleClick}
                        >
                            Submit
                        </button>
                    </div>
                ) : (
                    <div>Unauthorized</div>
                )}
            </div>
        );
    }
}

export default Password;
