import React, { Component } from "react";
import "./Letters.css";
import Letter from "../../../components/Letter/Letter";
import axios from "axios";

class Letters extends Component {
    constructor(props) {
        super(props);
        this.state = { letters: [] };
    }

    componentDidMount() {
        axios.get("/api/letters/replied").then(resp => {
            console.log(resp);
            this.setState({
                letters: resp.data
            });
        });
    }

    render() {
        let lettersToShow = this.state.letters.map(value => {
            return (
                <Letter subject={value.subject} situation={value.situation} />
            );
        });

        return <div>{lettersToShow}</div>;
    }
}

export default Letters;
