import React, { Component } from "react";
import "./Modal.css";

class Modal extends Component {
    handleDelete() {
        this.props.handleDeleteClick();
    }

    handleCancel() {
        this.props.handleCancelClick();
    }

    render() {
        return (
            <div className="modal">
                <h1>{this.props.title}</h1>
                <div>{this.props.text}</div>
                <div className="button-container">
                    <button onClick={this.props.fnc2}>Yes</button>
                    <button onClick={this.props.fnc}>No</button>
                </div>
            </div>
        );
    }
}

export default Modal;
