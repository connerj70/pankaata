require("dotenv").config();
const express = require("express"),
    axios = require("axios"),
    cors = require("cors"),
    massive = require("massive"),
    session = require("express-session"),
    bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING).then(db => {
    app.set("db", db);
    console.log("massive connected");
});

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
);

//ADMIN ENDPOINTS
app.post("/api/admin", function(req, res) {
    const db = req.app.get("db");
    db
        .check_admin([req.body.username, req.body.password])
        .then(resp => {
            console.log(resp);
            if (resp.length !== 0) {
                req.session.user = { username: resp[0].username };
                console.log(req.session);
                res.status(200).send(resp);
            } else {
                res.status(401).send(resp);
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get("/api/admin", function(req, res) {
    console.log(req.session.user);
    if (req.session.user) {
        res.status(200).send(true);
    } else {
        res.send(false);
    }
});

//POST ENDPOINTS
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
