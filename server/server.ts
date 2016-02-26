/// <reference path="./typings/main/ambient/node/node.d.ts"/>
import * as express from "express";

let app = express();

let PORT = 8080;

app.use("/app", express.static(__dirname + "/../app"));
app.use("/node_modules", express.static(__dirname + "/../node_modules"));

app.get("/", (req, res) => {
  res.sendFile("/index.html", {"root": __dirname + "/../"});
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
