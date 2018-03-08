import React, { Component } from "react";
import "./CustomForm.css";

const CustomForm = ({ status, message, onValidated }) => {
    let email, name;
    const submit = () =>
        email &&
        name &&
        email.value.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email.value,
            NAME: name.value
        });

    return (
        <div
            style={{
                background: "#efefef",
                borderRadius: 2,
                width: "320px",
                height: "270px",
                margin: "10px auto",
                padding: 10,
                display: "flex",
                flexDirection: "column"
            }}
        >
            {status === "sending" && (
                <div style={{ color: "blue" }}>sending...</div>
            )}
            {status === "error" && (
                <div style={{ color: "red" }}>{message}</div>
            )}
            {status === "success" && (
                <div style={{ color: "green" }}>{message}</div>
            )}
            <h1 style={{ fontSize: "20px", marginBottom: "20px" }}>
                Subscribe for daily updates
            </h1>
            <input
                style={{ fontSize: "2em", padding: 5 }}
                ref={node => (name = node)}
                type="text"
                placeholder="Your name"
            />
            <br />
            <input
                style={{ fontSize: "2em", padding: 5 }}
                ref={node => (email = node)}
                type="email"
                placeholder="Your email"
            />
            <br />
            <button
                className="chimp-mail-button"
                style={{ fontSize: "2em", padding: 5 }}
                onClick={submit}
            >
                Submit
            </button>
        </div>
    );
};

export default CustomForm;
