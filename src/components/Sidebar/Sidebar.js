import React, { Component } from "react";
import "./Sidebar.css";
import randomColor from "randomcolor";
import axios from "axios";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { tags: [] };
    }
    componentDidMount() {
        axios.get("/api/tags").then(resp => {
            console.log(resp);
            this.setState({
                tags: resp.data.sort((a, b) => {
                    return b.count - a.count;
                })
            });
        });
    }

    render() {
        let tagsToRender = this.state.tags.map((value, i) => {
            let color = randomColor();
            return (
                <div key={i}>
                    <div
                        style={{ backgroundColor: color }}
                        className="sidebar_color"
                    />
                    <div
                        className="sidebar_tag"
                        onClick={() => this.props.search(value.name)}
                    >
                        <div>{value.name}</div>
                        <div>{value.count}</div>
                    </div>
                </div>
            );
        });
        return <div className="sidebar">{tagsToRender}</div>;
    }
}

export default Sidebar;
