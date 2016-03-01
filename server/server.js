"use strict";
var express = require("express");
var https = require("https");
var fs = require("fs");
var app = express();
var HTTPS_PORT = 4430;
app.use("/app", express.static(__dirname + "/../app"));
app.use("/node_modules", express.static(__dirname + "/../node_modules"));
app.get("/", function (req, res) {
    res.sendFile("/index.html", { "root": __dirname + "/../" });
});
https.createServer({
    key: fs.readFileSync("../../secrets/flashbangsplat/privkey.pem"),
    cert: fs.readFileSync("../../secrets/flashbangsplat/cert.pem")
}, app).listen(HTTPS_PORT);
