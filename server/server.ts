/// <reference path="./typings/main/ambient/node/node.d.ts"/>
import * as express from "express";
let serveIndex = require("serve-index");

let app = express();

app.use("/app", express.static(`${__dirname}/../app`));
app.use("/node_modules", express.static(`${__dirname}/../node_modules`));

let PORT = 8080;

app.get("/", (req, res) => {
  res.sendFile("/index.html", {"root": __dirname + "/../"});
});

app.get("/.well-known/acme-challenge/l4iDo50t4F2RCS0d3wB4KEIYJe-urHb5FtHDGUPkJEM", (req, res) => {
  res.send("l4iDo50t4F2RCS0d3wB4KEIYJe-urHb5FtHDGUPkJEM.bLOPm_rh6Oz2YvKm5McIcpMVetZGeMEjQ40fFLN5fdI");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
