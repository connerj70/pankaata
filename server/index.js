const express = require("express"),
    axios = require("axios"),
    cors = require("cors");

const app = express();

app.get("/api/posts", function(req, res) {
    axios
        .get(
            "https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2FInterior%2Fstatus%2F507185938620219395"
        )
        .then(resp => {
            res.send(resp.data.html);
        });
});

const PORT = 3030;

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}...`);
});
