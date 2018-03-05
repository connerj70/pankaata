import React, { Component } from "react";
import "./AdminLogin.css";
import axios from "axios";

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" };
    }

    handleChange(e) {
        var name = e.target.name;
        var value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    handleLoginClick() {
        axios
            .post("/api/admin", {
                username: this.state.username,
                password: this.state.password
            })
            .then(resp => {
                console.log("RESP", resp);
                if (resp.data.length) {
                    this.props.history.push("/");
                }
            });
    }

    render() {
        return (
            <div className="admin-login">
                <div>
                    <h1>Pankaata Admin Login</h1>
                    <input
                        name="username"
                        onChange={e => this.handleChange(e)}
                        type="text"
                        placeholder="username"
                    />
                    <input
                        name="password"
                        onChange={e => this.handleChange(e)}
                        type="password"
                        placeholder="password"
                    />
                    <button onClick={() => this.handleLoginClick()}>
                        Login
                    </button>
                </div>
            </div>
        );
    }
}

export default AdminLogin;
