System.register(["angular2/http", "angular2/router", "./app.component", "./app-injector", "angular2/platform/browser", "./account.service", "./login.service", "rxjs/Rx"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1, router_1, app_component_1, app_injector_1, browser_1, account_service_1, login_service_1;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (app_injector_1_1) {
                app_injector_1 = app_injector_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (account_service_1_1) {
                account_service_1 = account_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [
                account_service_1.AccountService,
                login_service_1.LoginService,
                router_1.ROUTER_PROVIDERS,
                http_1.HTTP_PROVIDERS
            ]).then(function (appRef) {
                app_injector_1.appInjector(appRef.injector);
            });
        }
    }
});
