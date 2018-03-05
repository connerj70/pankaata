require("dotenv").config();
const express = require("express"),
    axios = require("axios"),
    cors = require("cors"),
    massive = require("massive");

const app = express();

massive(process.env.CONNECTION_STRING).then(db => app.set("db", db));

app.get("/api/posts", function(req, res) {
    const db = req.app.get("db");
    const offset = req.query.offset;
    console.log(offset);
    db
        .get_posts([offset])
        .then(resp => {
            res.status(200).send(resp);
        })
        .catch(err => {
            console.log(err);
        });
});

const PORT = 3030;

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}...`);
});
