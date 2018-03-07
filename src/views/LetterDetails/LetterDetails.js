import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import Letter from "../../components/Letter/Letter";
class LetterDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subject: "",
            situation: "",
            sender: "",
            anonymous: ""
        };
    }

    componentDidMount() {
        axios
            .get("/api/lady/letter/" + this.props.match.params.id)
            .then(resp => {
                console.log(resp);
                this.setState({
                    subject: resp.data[0].subject,
                    situation: resp.data[0].situation,
                    sender: resp.data[0].sender,
                    anonymous: resp.data[0].anonymous
                });
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
            </div>
        );
    }
}

export default LetterDetails;
