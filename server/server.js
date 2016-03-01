"use strict";
var express = require("express");
var serveIndex = require("serve-index");
var app = express();
app.use("/app", express.static(__dirname + "/../app"));
app.use("/node_modules", express.static(__dirname + "/../node_modules"));
var PORT = 8080;
app.get("/", function (req, res) {
    res.sendFile("/index.html", { "root": __dirname + "/../" });
});
app.get("/.well-known/acme-challenge/l4iDo50t4F2RCS0d3wB4KEIYJe-urHb5FtHDGUPkJEM", function (req, res) {
    res.send("l4iDo50t4F2RCS0d3wB4KEIYJe-urHb5FtHDGUPkJEM.bLOPm_rh6Oz2YvKm5McIcpMVetZGeMEjQ40fFLN5fdI");
});
app.listen(PORT, function () {
    console.log("Listening on " + PORT);
});
