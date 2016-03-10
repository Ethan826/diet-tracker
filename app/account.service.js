System.register(["angular2/core", "angular2/http"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var HEADERS, SUBMIT_CREDS_URL, AccountService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            HEADERS = new http_1.Headers({ "Content-Type": "application/json" });
            SUBMIT_CREDS_URL = "app/submitcreds";
            AccountService = (function () {
                function AccountService(http) {
                    this.http = http;
                    this.HEADERS = HEADERS;
                    this.SUBMIT_CREDS_URL = SUBMIT_CREDS_URL;
                }
                AccountService.prototype.submitNewCreds = function (username, password) {
                    console.log("Inside the submitNewCreds() method in account.service.ts");
                    var creds = JSON.stringify({ username: username, password: password });
                    var headers = new http_1.Headers({ "Content-Type": "application/json" });
                    return this.http.post(this.SUBMIT_CREDS_URL, creds, { headers: this.HEADERS });
                };
                AccountService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AccountService);
                return AccountService;
            }());
            exports_1("AccountService", AccountService);
        }
    }
});
