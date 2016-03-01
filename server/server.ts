/// <reference path="./typings/main/ambient/node/node.d.ts"/>
import * as express from "express";
let serveIndex = require("serve-index");

let app = express();

app.use("/app", express.static(`${__dirname}/../app`));
app.use("/node_modules", express.static(`${__dirname}/../node_modules`));
app.use("/.well-known", serveIndex(`${__dirname}/../.well-known`))

let PORT = 8080;

app.get("/", (req, res) => {
  res.sendFile("/index.html", {"root": __dirname + "/../"});
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});