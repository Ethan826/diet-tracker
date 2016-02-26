import * as express from "express";
let path = require("path");

let app = express();

let PORT = 8080;

app.use("/node_modules", express.static(__dirname + "/../node_modules"));
app.use("/app", express.static(__dirname + "/../client/app"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, () => { console.log("Listening on port " + PORT) });
