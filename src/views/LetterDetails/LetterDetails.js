import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import "./LetterDetails.css";
import Letter from "../../components/Letter/Letter";
class LetterDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subject: "",
            situation: "",
            sender: "",
            anonymous: "",
            response: ""
        };
    }

    componentDidMount() {
        axios
            .get("/api/lady/letter/" + this.props.match.params.id)
            .then(resp => {
                console.log(resp);
                this.setState({
                    subject: resp.data.subject,
                    situation: resp.data.situation,
                    sender: resp.data.sender,
                    anonymous: resp.data.anonymous,
                    response: resp.data.response
                });
            });
    }

    handleChange(e) {
        this.setState({
            response: e
        });
    }

    handleClick() {
        console.log("clicked");
        axios
            .post("/api/lady/reply", {
                response: this.state.response,
                letter_id: this.props.match.params.id
            })
            .then(resp => {
                this.props.history.push("/admin/letters");
            });
    }

    render() {
        return (
            <div>
                <Navbar ladyAnn={true} />
                <Letter
                    subject={this.state.subject}
                    situation={this.state.situation}
                    sender={this.state.sender}
                    anonymous={this.state.anonymous}
                    cut={false}
                />
                <div>
                    <textarea
                        value={this.state.response}
                        placeholder="Respond to message here"
                        className="reply-box"
                        onChange={e => this.handleChange(e.target.value)}
                    />
                </div>
                <div className="publish-btn-container">
                    <button
                        className="publish-btn"
                        onClick={() => this.handleClick()}
                    >
                        Publish Reply
                    </button>
                </div>
            </div>
        );
    }
}

export default LetterDetails;
