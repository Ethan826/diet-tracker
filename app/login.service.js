System.register(["angular2/core", "./app-injector"], function(exports_1, context_1) {
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
    var core_1, app_injector_1;
    var checkAuth, checkLoggedOut, LoginService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_injector_1_1) {
                app_injector_1 = app_injector_1_1;
            }],
        execute: function() {
            exports_1("checkAuth", checkAuth = function (permittedAudiences) {
                var injector = app_injector_1.appInjector();
                var loginService = injector.get(LoginService);
                return loginService.isAuthorized(permittedAudiences);
            });
            exports_1("checkLoggedOut", checkLoggedOut = function () {
                var injector = app_injector_1.appInjector();
                var loginService = injector.get(LoginService);
                return new Promise(function (resolve, reject) {
                    loginService.loggedOut.subscribe(function (loggedOut) { resolve(loggedOut); }, function (err) { reject(err); });
                });
            });
            /**
             * Service to maintain Event Listener on login events and to check permissions
             * by comparing the logged in user to an array of permitted audiences. Could
             * be integrated with `accountService`, but it is useful to maintain a
             * singleton Event Emitter for injection elsewhere.
             */
            LoginService = (function () {
                function LoginService() {
                    var _this = this;
                    this.loginEvent = new core_1.EventEmitter();
                    // If I implement revocation of JWTs from the server side, make sure to
                    // cache JWTs that are revoked until they expire.
                    this.loginEvent.subscribe(function (jwtResult) {
                        _this.jwtResult = jwtResult;
                    });
                    this.loggedIn = this.loginEvent
                        .map(function (jwtResult) {
                        return Boolean(jwtResult && jwtResult.aud);
                    });
                    // Necessary because you can't negate an Observable<boolean> or assign
                    // within a map function inside a template
                    this.loggedOut = this.loggedIn.map(function (b) { return !b; });
                }
                /**
                 * Given an array of permitted audiences, verify the audiences in the JWT
                 * in `localStorage`, returning a Promise<boolean> with whether the logged
                 * in user has the permission to access.
                 */
                LoginService.prototype.isAuthorized = function (permittedAudiences) {
                    var _this = this;
                    // A jwtResult is at the ready
                    if (this.jwtResult) {
                        return Promise.resolve(permittedAudiences.indexOf(this.jwtResult.aud) >= 0);
                    }
                    else {
                        // There is a jwt but jwtResult is not in yet. Subscribe to the event
                        // emitter and wait for the result.
                        if (localStorage.getItem("jwt")) {
                            return new Promise(function (resolve, reject) {
                                _this.loginEvent.subscribe(function (jwtResult) { resolve(jwtResult); }, function (err) { reject(err); });
                            });
                        }
                        else {
                            return Promise.resolve(false);
                        }
                    }
                };
                LoginService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], LoginService);
                return LoginService;
            }());
            exports_1("LoginService", LoginService);
        }
    }
});
