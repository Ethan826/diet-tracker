/// <reference path="./typings/main/ambient/node/node.d.ts"/>
import * as express from "express";

let app = express();

app.use("/app", express.static(`${__dirname}/../app`));
app.use("/node_modules", express.static(`${__dirname}/../node_modules`));
app.use("/.well-known", express.static(`${__dirname}/../.well-known`))

let PORT = 8080;

app.get("/", (req, res) => {
  res.sendFile("/index.html", {"root": __dirname + "/../"});
});

app.get("/.well-known", (req, res) => {
  res.sendFile("/.well-known")
});


app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
