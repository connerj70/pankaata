import React from "react";
import { Link } from "react-router-dom";

export default function FourOhFour() {
    return (
        <div>
            The page your are trying to view does not exist.<Link to="/">
                <button>Return To Home Page</button>
            </Link>
        </div>
    );
}
