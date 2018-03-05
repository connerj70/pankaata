import React, { Component } from "react";
import "./AdminLogin.css";

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
                    <button>Login</button>
                </div>
            </div>
        );
    }
}

export default AdminLogin;
