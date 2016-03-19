System.register(["angular2/core", "./account.service", "./login.service", "angular2/http"], function(exports_1, context_1) {
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
    var core_1, account_service_1, login_service_1, http_1;
    var HEADERS, SUBMIT_DAILY_URL, FormsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (account_service_1_1) {
                account_service_1 = account_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            HEADERS = new http_1.Headers({ "Content-Type": "application/json" });
            SUBMIT_DAILY_URL = "app/submitdaily";
            FormsService = (function () {
                function FormsService(http, accountService, loginService) {
                    var _this = this;
                    this.http = http;
                    this.accountService = accountService;
                    this.loginService = loginService;
                    this.HEADERS = HEADERS;
                    this.SUBMIT_DAILY_URL = SUBMIT_DAILY_URL;
                    if (!(this.jwtResult && this.jwtResult.userId)) {
                        this.loginService.loginEvent.subscribe(function (j) { return _this.jwtResult = j; });
                        this.accountService.doCheckJWT();
                    }
                }
                FormsService.prototype.submitDaily = function (formOutput) {
                    var _this = this;
                    var result = new Promise(function (resolve, reject) {
                        console.log(_this.jwtResult);
                        formOutput["userId"] = _this.jwtResult.userId;
                        console.log(JSON.stringify(formOutput));
                        console.log("Submitting form in forms.service.ts");
                        _this.http.post(_this.SUBMIT_DAILY_URL, JSON.stringify(formOutput), { headers: _this.HEADERS }).subscribe(function (res) { return console.log(res); }, function (err) { return console.log(err); });
                    });
                    return result;
                };
                FormsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, account_service_1.AccountService, login_service_1.LoginService])
                ], FormsService);
                return FormsService;
            }());
            exports_1("FormsService", FormsService);
        }
    }
});
