import React, { Component } from "react";
import axios from "axios";
import "./EmailShare.css";

class EmailShare extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", post: [] };
    }

    handleChange(e) {
        this.setState({
            email: e
        });
    }

    componentDidMount() {
        axios.get("/api/post/" + this.props.match.params.id).then(resp => {
            console.log(resp);
            this.setState({
                post: resp.data[0]
            });
        });
    }

    render() {
        return (
            <div className="outer-email-wrapper">
                <div className="email-share-wrapper">
                    <h1>Share with a friend</h1>
                    <div>
                        <h3>To: </h3>
                        <input
                            onChange={e => this.handleChange(e.target.value)}
                            type="text"
                        />
                    </div>
                    <button>Share</button>
                </div>
            </div>
        );
    }
}

export default EmailShare;
