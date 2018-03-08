import React, { Component } from "react";
import "./Letters.css";
import Letter from "../../../components/Letter/Letter";
import axios from "axios";
import { Link } from "react-router-dom";

class Letters extends Component {
    constructor(props) {
        super(props);
        this.state = { letters: [] };
    }

    componentDidMount() {
        axios.get("/api/letters/replied").then(resp => {
            this.setState({
                letters: resp.data
            });
        });
    }

    render() {
        let lettersToShow = this.state.letters.map((value, i) => {
            return (
                <Link to={"/relationships/letter/" + value.letter_id}>
                    <Letter
                        key={i}
                        subject={value.subject}
                        situation={value.situation}
                        cut={true}
                    />
                </Link>
            );
        });

        return <div>{lettersToShow}</div>;
    }
}

export default Letters;
