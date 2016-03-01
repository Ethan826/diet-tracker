/// <reference path="./typings/main/ambient/node/node.d.ts"/>
import * as express from "express";
import * as https from "https";
import * as fs from "fs";

let app = express();

let HTTPS_PORT = 8443;

let OPTIONS = {
  key: fs.readFileSync("../../secrets/flashbangsplat/privkey.pem"),
  cert: fs.readFileSync("../../secrets/flashbangsplat/cert.pem")
  // key: fs.readFileSync("/home/ethan/Desktop/temp/privkey.pem"),
  // cert: fs.readFileSync("/home/ethan/Desktop/temp/cert.pem")
}

app.get("/", (req, res) => {
  res.send("Hello");
});

// app.use("/app", express.static(`${__dirname}/../app`));
// app.use("/node_modules", express.static(`${__dirname}/../node_modules`));
//
// app.get("/", (req, res) => {
//   res.sendFile("/index.html", {"root": __dirname + "/../"});
// });

https.createServer(OPTIONS, app).listen(HTTPS_PORT, () => {
  console.log(`Listening on port ${HTTPS_PORT}`);
});

// let PORT = 8080;
//
//
// app.listen(PORT, () => {
//   console.log(`Listening on ${PORT}`);
// });
