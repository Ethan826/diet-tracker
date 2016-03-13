System.register(['angular2/core', './app-injector', './account.service'], function(exports_1, context_1) {
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
    var core_1, app_injector_1, account_service_1;
    var CheckLogin;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_injector_1_1) {
                app_injector_1 = app_injector_1_1;
            },
            function (account_service_1_1) {
                account_service_1 = account_service_1_1;
            }],
        execute: function() {
            CheckLogin = (function () {
                function CheckLogin() {
                }
                CheckLogin.getAuthorized = function (audiences) {
                    var _this = this;
                    var injector = app_injector_1.appInjector();
                    var accountService = injector.get(account_service_1.AccountService);
                    return new Promise(function (resolve) {
                        accountService.audience
                            .subscribe(function (actualAudiences) {
                            resolve(_this.authorizedHelper(audiences, actualAudiences));
                        });
                    });
                };
                CheckLogin.authorizedHelper = function (permittedAudiences, actualAudiences) {
                    var result = false;
                    if (permittedAudiences.indexOf("any") >= 0) {
                        result = true;
                    }
                    else {
                        permittedAudiences.forEach(function (audience) {
                            if (actualAudiences.indexOf(audience) >= 0) {
                                result = true;
                            }
                        });
                    }
                    return result;
                };
                ;
                CheckLogin = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CheckLogin);
                return CheckLogin;
            }());
            exports_1("CheckLogin", CheckLogin);
        }
    }
});
