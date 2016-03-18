"use strict";
var crypto = require("crypto");
var es6_promise_1 = require("es6-promise");
var jwt = require("jwt-simple");
var CREDENTIAL_CONSTANTS = {
    HASH_LENGTH: 128,
    ITERATIONS: 50000,
    KEYLEN: 512,
    DIGEST: "sha512",
    JWT_DURATION: 86400000,
    SECRET: "Db4gG8tdLXlkvfetHAnkizXn72OulTj68BN1AbXxuKEZrxQexa0aApzPcNH0OvwFMK75ASTKDKpRUNupQjoW3r+rcyPeNf/jJ8nCnWU+033WfBwocMyL5preLR7XGbCIRjeSDrMENixyEYn5GmKqhBBzxkOmp6BBijfmLmDQyCc=",
    ISS: "https://flashbangsplat.com"
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
    Credentials.makeJWT = function (username, userId, admin) {
        var now = Date.now();
        var aud = admin === 1 ? "admin" : "standard";
        return jwt.encode({
            iss: CREDENTIAL_CONSTANTS.ISS,
            iat: now,
            aud: aud,
            exp: now + CREDENTIAL_CONSTANTS.JWT_DURATION,
            userId: userId,
            username: username
        }, CREDENTIAL_CONSTANTS.SECRET);
    };
    Credentials.checkJWT = function (myJwt) {
        if (myJwt) {
            var creds = jwt.decode(myJwt, CREDENTIAL_CONSTANTS.SECRET);
            if (Date.now() < creds.exp && creds.iss === CREDENTIAL_CONSTANTS.ISS) {
                return creds;
            }
            else {
                return {};
            }
        }
        else {
            return {};
        }
    };
    Credentials.pbkdf2 = function (username, password, salt) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            crypto.pbkdf2(password, salt, _this.CREDENTIAL_CONSTANTS.ITERATIONS, _this.CREDENTIAL_CONSTANTS.KEYLEN, _this.CREDENTIAL_CONSTANTS.DIGEST, function (err, key) {
                if (err)
                    reject(err);
                else
                    resolve({
                        username: username,
                        password: password,
                        salt: salt,
                        hash: key.toString("base64")
                    });
            });
        });
    };
    Credentials.makeSalt = function () {
        return crypto.randomBytes(this.CREDENTIAL_CONSTANTS.HASH_LENGTH).toString("base64");
    };
    Credentials.CREDENTIAL_CONSTANTS = CREDENTIAL_CONSTANTS;
    return Credentials;
}());
exports.Credentials = Credentials;
