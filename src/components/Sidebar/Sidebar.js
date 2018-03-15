import React, { Component } from "react";
import "./Sidebar.css";
import randomColor from "randomcolor";
import { Link } from "react-router-dom";
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
        console.log(window.location);
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
                        {/* <div>{value.name}</div> */}
                        {/* <div>{value.count}</div> */}
                    </div>
                </div>
            );
        });
        return (
            <div className="sidebar">
                <Link to="/motivational">
                    <div>
                        <div
                            style={{ backgroundColor: "var(--red)" }}
                            className={
                                window.location.hash === "#/motivational"
                                    ? "sidebar_color active"
                                    : "sidebar_color"
                            }
                        />
                        <div className="sidebar_tag">
                            {/* <div>{value.name}</div> */}
                            {/* <div>{value.count}</div> */}
                            MotivationalMonday
                        </div>
                    </div>
                </Link>
                <Link to="/worthynews">
                    <div>
                        <div
                            style={{ backgroundColor: "var(--dark-brown)" }}
                            className={
                                window.location.hash === "#/worthynews"
                                    ? "sidebar_color active"
                                    : "sidebar_color"
                            }
                        />
                        <div className="sidebar_tag">
                            {/* <div>{value.name}</div> */}
                            {/* <div>{value.count}</div> */}
                            WorthyNews
                        </div>
                    </div>
                </Link>
                <Link to="/food">
                    <div>
                        <div
                            style={{ backgroundColor: "var(--light-brown)" }}
                            className={
                                window.location.hash === "#/food"
                                    ? "sidebar_color active"
                                    : "sidebar_color"
                            }
                        />
                        <div className="sidebar_tag">
                            {/* <div>{value.name}</div> */}
                            {/* <div>{value.count}</div> */}
                            FoodPorn
                        </div>
                    </div>
                </Link>
                <Link to="/animal">
                    <div>
                        <div
                            style={{ backgroundColor: "var(--yellow)" }}
                            className={
                                window.location.hash === "#/animal"
                                    ? "sidebar_color active"
                                    : "sidebar_color"
                            }
                        />
                        <div className="sidebar_tag">
                            {/* <div>{value.name}</div> */}
                            {/* <div>{value.count}</div> */}
                            AnimalLovers
                        </div>
                    </div>
                </Link>
                <Link to="/thousandwords">
                    <div>
                        <div
                            style={{ backgroundColor: "var(--red)" }}
                            className={
                                window.location.hash === "#/thousandwords"
                                    ? "sidebar_color active"
                                    : "sidebar_color"
                            }
                        />
                        <div className="sidebar_tag">
                            {/* <div>{value.name}</div> */}
                            {/* <div>{value.count}</div> */}
                            ThousandWords
                        </div>
                    </div>
                </Link>
                <Link to="/entertainment">
                    <div>
                        <div
                            style={{ backgroundColor: "var(--blue)" }}
                            className={
                                window.location.hash === "#/entertainment"
                                    ? "sidebar_color active"
                                    : "sidebar_color"
                            }
                        />
                        <div className="sidebar_tag">
                            {/* <div>{value.name}</div> */}
                            {/* <div>{value.count}</div> */}
                            Entertainment
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Sidebar;
