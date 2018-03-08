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

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.props.handleSearchEnter();
        }
    }

    handleSearchClear() {
        this.props.clearSearch();
        this.setState({
            search: false
        });
    }

    render() {
        return (
            <div className="secondary-nav">
                {this.state.search ? (
                    <div className="secondary-nav_search-open-div">
                        <div>
                            <i className="fas fa-search" />
                            <input
                                value={this.props.searchTerm}
                                onKeyPress={e => this.handleKeyPress(e)}
                                onChange={e =>
                                    this.props.handleSearchTerm(e.target.value)
                                }
                                autoFocus="autoFocus"
                                className="secondary-nav-input"
                                type="text"
                            />
                        </div>
                        <span onClick={() => this.handleSearchClear()}>
                            Clear
                        </span>
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
