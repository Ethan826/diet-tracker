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
    var checkAuth, LoginService;
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
            LoginService = (function () {
                function LoginService() {
                    var _this = this;
                    this.loginEvent = new core_1.EventEmitter();
                    this.loginEvent.subscribe(function (audience) { return _this.audience = audience; });
                }
                LoginService.prototype.isAuthorized = function (permittedAudiences) {
                    if (this.audience) {
                        return permittedAudiences.indexOf(this.audience) >= 0;
                    }
                    else {
                        return false;
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
