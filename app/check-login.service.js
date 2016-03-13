System.register(['./app-injector', './account.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_injector_1, account_service_1;
    var checkAuth;
    return {
        setters:[
            function (app_injector_1_1) {
                app_injector_1 = app_injector_1_1;
            },
            function (account_service_1_1) {
                account_service_1 = account_service_1_1;
            }],
        execute: function() {
            exports_1("checkAuth", checkAuth = function (permittedAudiences) {
                var injector = app_injector_1.appInjector();
                var accountService = injector.get(account_service_1.AccountService);
                return accountService.isAuthorized(permittedAudiences);
            });
        }
    }
});
