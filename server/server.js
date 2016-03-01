"use strict";
var express = require("express");
var serveIndex = require("serve-index");
var app = express();
app.use("/app", express.static(__dirname + "/../app"));
app.use("/node_modules", express.static(__dirname + "/../node_modules"));
app.use("/.well-known", serveIndex(__dirname + "/../.well-known"));
var PORT = 8080;
app.get("/", function (req, res) {
    res.sendFile("/index.html", { "root": __dirname + "/../" });
});
app.listen(PORT, function () {
    console.log("Listening on " + PORT);
});
