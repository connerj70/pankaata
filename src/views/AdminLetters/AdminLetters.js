import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import Letter from "../../components/Letter/Letter";
import { Link } from "react-router-dom";

class AdminLetters extends Component {
    constructor(props) {
        super(props);

        this.state = { letters: [], loggedIn: false };
    }

    componentDidMount() {
        axios.get("/api/lady/letters").then(resp => {
            this.setState({
                letters: resp.data
            });
        });
        axios.get("/api/admin").then(resp => {
            console.log(resp);
            this.setState({
                loggedIn: resp.data
            });
        });
    }

    render() {
        let lettersToDisplay = this.state.letters.map((val, i) => {
            return (
                <Link key={i} to={"/admin/letter/" + val.letter_id}>
                    <Letter
                        anonymous={val.anonymous}
                        sender={val.sender}
                        situation={val.situation}
                        subject={val.subject}
                        show={val.show}
                    />
                </Link>
            );
        });

        return (
            <div>
                {this.state.loggedIn ? (
                    <div>
                        <Navbar ladyAnn={true} />
                        {lettersToDisplay}
                    </div>
                ) : (
                    <h1>Permission denied</h1>
                )}
            </div>
        );
    }
}

export default AdminLetters;
