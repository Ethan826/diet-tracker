System.register(['./app-injector', './account.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_injector_1, account_service_1;
    var authorized, authorizedHelper;
    return {
        setters:[
            function (app_injector_1_1) {
                app_injector_1 = app_injector_1_1;
            },
            function (account_service_1_1) {
                account_service_1 = account_service_1_1;
            }],
        execute: function() {
            exports_1("authorized", authorized = function (audiences) {
                var injector = app_injector_1.appInjector();
                var accountService = injector.get(account_service_1.AccountService);
                return new Promise(function (resolve) {
                    accountService.audience
                        .subscribe(function (actualAudiences) {
                        resolve(authorizedHelper(audiences, actualAudiences));
                    });
                });
            });
            authorizedHelper = function (permittedAudiences, actualAudiences) {
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
        }
    }
});
