System.register(["angular2/core", "./daily-form.component", "./monthly-form.component", "./login.component", "./create-user.component", "./admin.component", "./account.service", "./nav.component", "angular2/router"], function(exports_1, context_1) {
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
    var core_1, daily_form_component_1, monthly_form_component_1, login_component_1, create_user_component_1, admin_component_1, account_service_1, nav_component_1, router_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (daily_form_component_1_1) {
                daily_form_component_1 = daily_form_component_1_1;
            },
            function (monthly_form_component_1_1) {
                monthly_form_component_1 = monthly_form_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (create_user_component_1_1) {
                create_user_component_1 = create_user_component_1_1;
            },
            function (admin_component_1_1) {
                admin_component_1 = admin_component_1_1;
            },
            function (account_service_1_1) {
                account_service_1 = account_service_1_1;
            },
            function (nav_component_1_1) {
                nav_component_1 = nav_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            /**
             * Main app component. Sets the overall template, establishes routing.
             */
            AppComponent = (function () {
                function AppComponent(accountService) {
                    this.accountService = accountService;
                }
                AppComponent = __decorate([
                    core_1.Injectable(),
                    core_1.Component({
                        selector: "app",
                        directives: [nav_component_1.NavComponent, daily_form_component_1.DailyForm, monthly_form_component_1.MonthlyForm, router_1.ROUTER_DIRECTIVES, create_user_component_1.CreateUser],
                        providers: [router_1.ROUTER_PROVIDERS, account_service_1.AccountService],
                        template: "\n    <nav-component></nav-component>\n    <router-outlet></router-outlet>\n  "
                    }),
                    router_1.RouteConfig([
                        { path: "/diet/daily", name: "DailyForm", component: daily_form_component_1.DailyForm },
                        { path: "/diet/monthly", name: "MonthlyForm", component: monthly_form_component_1.MonthlyForm },
                        { path: "/diet/admin", name: "Admin", component: admin_component_1.AdminComponent },
                        { path: "/diet/login", name: "Login", component: login_component_1.Login },
                        { path: "/diet/createuser", name: "CreateUser", component: create_user_component_1.CreateUser }
                    ]), 
                    __metadata('design:paramtypes', [account_service_1.AccountService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
