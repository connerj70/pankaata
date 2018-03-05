import React, { Component } from "react";
import "./SecondaryNav.css";

class SecondaryNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false
        };
    }

    handleSearchOpen() {
        this.setState(prevProps => {
            return {
                search: !prevProps.search
            };
        });
    }

    render() {
        return (
            <div className="secondary-nav">
                {this.state.search ? (
                    <div className="secondary-nav_search-open-div">
                        <div>
                            <h6>Search</h6>
                            <input
                                autoFocus="autoFocus"
                                className="secondary-nav-input"
                                type="text"
                            />
                        </div>
                        <span onClick={() => this.handleSearchOpen()}>x</span>
                    </div>
                ) : (
                    <div className="secondary-nav_initial-search">
                        <div>HOME</div>
                        <div
                            className="secondary-nav_search"
                            onClick={() => this.handleSearchOpen()}
                        >
                            <i className="fas fa-search" />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default SecondaryNav;
