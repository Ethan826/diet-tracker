"use strict";
var express = require("express");
var path = require("path");
var app = express();
var PORT = 8080;
app.use("/node_modules", express.static(__dirname + "/../node_modules"));
app.use("/app", express.static(__dirname + "/../client/app"));
app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
});
app.listen(PORT, function () { console.log("Listening on port " + PORT); });
