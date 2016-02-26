"use strict";
var express = require("express");
var app = express();
var PORT = 8080;
app.use("/app", express.static(__dirname + "/../app"));
app.use("/node_modules", express.static(__dirname + "/../node_modules"));
app.get("/", function (req, res) {
    res.sendFile("/index.html", { "root": __dirname + "/../" });
});
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
