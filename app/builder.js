var path = require("path");
var Builder = require("systemjs-builder");

var builder = new Builder();

builder
.bundle("main.js", "/home/ethan/Desktop/foo.js")
.then(function() {
console.log("Build complete")
})
.catch(function(err) {
console.error(err);
});

