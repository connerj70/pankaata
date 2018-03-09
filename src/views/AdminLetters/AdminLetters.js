import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import Letter from "../../components/Letter/Letter";
import { Link } from "react-router-dom";
import "./AdminLetters.css";
import { ToastContainer, toast } from "react-toastify";

class AdminLetters extends Component {
    constructor(props) {
        super(props);

        this.state = { letters: [], loggedIn: false };
        this.deleteLetter = this.deleteLetter.bind(this);
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

    deleteLetter(letterId) {
        console.log("delete");
        console.log(letterId);
        var x = window.confirm("Are you sure you want to delete?");
        if (x) {
            axios.delete("/api/letter/" + letterId).then(resp => {
                console.log(resp);
                toast.error("Letter deleted.");
            });
        }
    }

    render() {
        let lettersToDisplay = this.state.letters.map((val, i) => {
            console.log(val.letter_id);
            return (
                <div key={i}>
                    <Link to={"/admin/letter/" + val.letter_id}>
                        <Letter
                            letterId={val.letter_id}
                            anonymous={val.anonymous}
                            sender={val.sender}
                            situation={val.situation}
                            subject={val.subject}
                            show={val.show}
                            deleteLetter={this.deleteLetter}
                            admin={true}
                        />
                    </Link>
                    <ToastContainer autoClose={2000} />
                </div>
            );
        });

        return (
            <div className="admin_letters-container1">
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
