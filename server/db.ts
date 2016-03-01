let pg = require("pg");

let connectString = "postgres://diet:X01DxRF6zWln@localhost/diet";

pg.connect(connectString, (err: any, client: any, done: any) => {
    client.query("drop schema diet cascade;", (err: any, result: any) => {
        if (err) { console.log(err); }
        done();
    });
    client.query("create schema diet;", (err: any, result: any) => {
        if (err) { console.log(err); }
        done();
    });
    client.query(
        "create table diet.user (id serial primary key, name text);",
        (err: any, result: any) => {
            if (err) { console.log(err); }
            done();
        }
    )
});

pg.end();
