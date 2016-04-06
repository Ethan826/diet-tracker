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
    var SUBMIT_DAILY_URL, ENTRIES_URL, FormsService;
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
            SUBMIT_DAILY_URL = "app/submitdaily";
            ENTRIES_URL = "app/entries";
            /**
             * Service to facilitate submitting and retrieving form data from the server.
             */
            FormsService = (function () {
                function FormsService(http, accountService, loginService) {
                    this.http = http;
                    this.accountService = accountService;
                    this.loginService = loginService;
                    this.SUBMIT_DAILY_URL = SUBMIT_DAILY_URL;
                    this.ENTRIES_URL = ENTRIES_URL;
                }
                /**
                 * Submits the output of the DailyForm to the server, returns response.
                 */
                FormsService.prototype.submitDaily = function (formOutput) {
                    return this.httpHelper(this.SUBMIT_DAILY_URL, formOutput, function (jwt, request) {
                        request["userId"] = jwt.userId;
                        return request;
                    }, http_1.RequestMethod.Post);
                };
                /**
                 * Retrieves the entries associated with the logged in user.
                 */
                FormsService.prototype.getUserEntries = function () {
                    return this.httpHelper(this.ENTRIES_URL, {}, function (jwt, request) {
                        request["userId"] = jwt.userId;
                        return request;
                    }, http_1.RequestMethod.Get);
                };
                FormsService.prototype.deleteEntry = function (id) {
                    return this.httpHelper(this.ENTRIES_URL, { entryid: id }, function (jwt, request) {
                        request["userId"] = jwt.userId;
                        return request;
                    }, http_1.RequestMethod.Delete);
                };
                /**
                 * @internal  Accepts a url, the request body, and a callback that executes
                 *            once the JWT is updated and in scope. The callback takes a
                 *            JWT and a request.
                 */
                FormsService.prototype.httpHelper = function (url, paramsOrBody, codeThatNeedsJWT, method) {
                    var _this = this;
                    var result = new Promise(function (resolve, reject) {
                        var handle = _this.loginService.loginEvent.subscribe(function (jwt) {
                            var requestOptions = {};
                            requestOptions.method = method;
                            if (method === http_1.RequestMethod.Post) {
                                requestOptions.headers = new http_1.Headers({ "Content-Type": "application/json" });
                                requestOptions.body = JSON.stringify(codeThatNeedsJWT(jwt, paramsOrBody));
                            }
                            else {
                                var headers = codeThatNeedsJWT(jwt, paramsOrBody);
                                requestOptions.headers = new http_1.Headers(headers);
                            }
                            _this.http.request(url, requestOptions)
                                .map(function (r) { return r.json(); })
                                .subscribe(function (r) { return resolve(r); }, function (err) { return resolve(err); });
                            handle.unsubscribe();
                        });
                    });
                    this.accountService.doCheckJWT();
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
