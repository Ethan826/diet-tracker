"use strict";
var crypto = require("crypto");
var es6_promise_1 = require("es6-promise");
var Credentials = (function () {
    function Credentials() {
    }
    Credentials.getHashedPassword = function (password, salt) {
        crypto;
    };
    Credentials.passwordHelper = function (password, salt) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            crypto.pbkdf2(password, salt, _this.ITERATIONS, _this.KEYLEN, _this.DIGEST, function (err, key) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(key.toString("hex"));
                }
            });
        });
    };
    Credentials.makeSalt = function () {
        return crypto.randomBytes(this.HASH_LENGTH).toString("hex");
    };
    Credentials.HASH_LENGTH = 128;
    Credentials.ITERATIONS = 50000;
    Credentials.KEYLEN = 512;
    Credentials.DIGEST = "sha512";
    return Credentials;
}());
exports.Credentials = Credentials;
Credentials.hashNewPassword("Happy")
    .then(function (key) { console.log(key); })
    .catch(function (err) { console.log(err); });
