"use strict";
var crypto = require("crypto");
var es6_promise_1 = require("es6-promise");
var HASHING_CONSTANTS = {
    HASH_LENGTH: 128,
    ITERATIONS: 50000,
    KEYLEN: 512,
    DIGEST: "sha512",
};
var Credentials = (function () {
    function Credentials() {
    }
    Credentials.hashNewCredentials = function (username, password) {
        var salt = this.makeSalt();
        return this.pbkdf2(username, password, salt);
    };
    Credentials.getHashedPassword = function (username, password, salt) {
        return this.pbkdf2(username, password, salt);
    };
    Credentials.pbkdf2 = function (username, password, salt) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            crypto.pbkdf2(password, salt, _this.HASHING_CONSTANTS.ITERATIONS, _this.HASHING_CONSTANTS.KEYLEN, _this.HASHING_CONSTANTS.DIGEST, function (err, key) {
                if (err)
                    reject(err);
                else
                    resolve({
                        username: username,
                        password: password,
                        salt: salt,
                        hash: key.toString("Hex")
                    });
            });
        });
    };
    Credentials.makeSalt = function () {
        return crypto.randomBytes(this.HASHING_CONSTANTS.HASH_LENGTH).toString("hex");
    };
    Credentials.HASHING_CONSTANTS = HASHING_CONSTANTS;
    return Credentials;
}());
exports.Credentials = Credentials;
