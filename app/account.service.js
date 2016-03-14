System.register(["angular2/core", "angular2/http", './app-injector'], function(exports_1, context_1) {
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
    var core_1, http_1, app_injector_1;
    var HEADERS, SUBMIT_CREDS_URL, LOGIN_URL, checkAuth, AccountService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_injector_1_1) {
                app_injector_1 = app_injector_1_1;
            }],
        execute: function() {
            HEADERS = new http_1.Headers({ "Content-Type": "application/json" });
            SUBMIT_CREDS_URL = "app/submitcreds";
            LOGIN_URL = "app/dologin";
            exports_1("checkAuth", checkAuth = function (permittedAudiences) {
                var injector = app_injector_1.appInjector();
                var accountService = injector.get(AccountService);
                return accountService.isAuthorized(permittedAudiences);
            });
            AccountService = (function () {
                function AccountService(http) {
                    this.http = http;
                    this.HEADERS = HEADERS;
                    this.SUBMIT_CREDS_URL = SUBMIT_CREDS_URL;
                    this.LOGIN_URL = "app/dologin";
                    this.JWT_CHECK_URL = "app/checkjwt";
                    this.doCheckJWT();
                }
                AccountService.prototype.doCheckJWT = function () {
                    var jwt = this.checkJWT();
                    this.audiencesMap = {
                        "standard": jwt.map(function (audience) { return audience === "standard"; }),
                        "admin": jwt.map(function (audience) { return audience === "standard"; })
                    };
                    jwt.map(function (audience) { return audience === "[]" ? "" : audience; });
                };
                AccountService.prototype.submitNewCreds = function (username, password) {
                    return this.submitHelper(username, password, this.SUBMIT_CREDS_URL);
                };
                AccountService.prototype.submitLogin = function (username, password) {
                    return this.submitHelper(username, password, this.LOGIN_URL);
                };
                AccountService.prototype.checkJWT = function () {
                    return this.http.post(this.JWT_CHECK_URL, JSON.stringify({ jwt: localStorage.getItem("jwt") }), { headers: this.HEADERS })
                        .map(function (res) { return res.text(); });
                };
                AccountService.prototype.isAuthorized = function (audiences) {
                    var _this = this;
                    return new Promise(function (resolve) {
                        _this.audience
                            .subscribe(function (actualAudience) {
                            resolve(audiences.indexOf(actualAudience) >= 0);
                        });
                    });
                };
                AccountService.prototype.submitHelper = function (username, password, url) {
                    var creds = JSON.stringify({ username: username, password: password });
                    return this.http.post(url, creds, { headers: this.HEADERS });
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
