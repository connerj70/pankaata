import React, { Component } from "react";
import "./Relationships.css";
import Navbar from "../../components/Navbar/Navbar";
import { Route, Link } from "react-router-dom";
import Videos from "./Videos/Videos";
import Letters from "./Letters/Letters";
import Email from "./Email/Email";
import About from "./About/About";
import LetterDetailsUser from "./LetterDetailsUser/LetterDetailsUser";
import axios from "axios";

class Relationships extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false };
    }

    componentDidMount() {
        axios.get("/api/admin").then(resp => {
            this.setState({
                loggedIn: resp.data
            });
        });
    }
    render() {
        return (
            <div>
                <Navbar ladyAnn={true} />
                {this.state.loggedIn ? (
                    <div>
                        <Link to="/admin/letters">
                            {" "}
                            <button className="relationships_admin-button">
                                Admin View Letters
                            </button>
                        </Link>
                    </div>
                ) : null}
                <Route path={"/relationships/videos"} component={Videos} />
                <Route path={"/relationships/letters"} component={Letters} />
                <Route
                    path={"/relationships/letter/:id"}
                    component={LetterDetailsUser}
                />
                <Route path={"/relationships/email"} component={Email} />
                <Route path={"/relationships/about"} component={About} />
            </div>
        );
    }
}

export default Relationships;
