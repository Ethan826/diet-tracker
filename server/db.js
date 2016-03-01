var pg = require("pg");
var connectString = "postgres://diet:X01DxRF6zWln@localhost/diet";
pg.connect(connectString, function (err, client, done) {
    client.query("drop schema diet cascade;", function (err, result) {
        if (err) {
            console.log(err);
        }
        done();
    });
    client.query("create schema diet;", function (err, result) {
        if (err) {
            console.log(err);
        }
        done();
    });
    client.query("create table diet.user (id serial primary key, name text);", function (err, result) {
        if (err) {
            console.log(err);
        }
        done();
    });
});
pg.end();
