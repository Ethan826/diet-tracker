System.register(["angular2/core", "angular2/common", "angular2/router"], function(exports_1, context_1) {
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
    var core_1, common_1, router_1;
    var NAV_OPTIONS, NavComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            exports_1("NAV_OPTIONS", NAV_OPTIONS = [
                { text: "Daily Tracker", available: true, active: false, route: "DailyForm" },
                { text: "Monthly View", available: true, active: false, route: "MonthlyForm" },
                { text: "Login", available: true, active: false, route: "Login" },
                { text: "Account Info", available: true, active: false, route: "AccountInfo" },
                { text: "Admin Panel", available: false, active: false, route: "AdminPanel" }
            ]);
            NavComponent = (function () {
                function NavComponent() {
                    this.navOptions = NAV_OPTIONS;
                }
                NavComponent.prototype.handleNavSelection = function (option) {
                    this.navOptions.forEach(function (o) {
                        o.active = false;
                    });
                    option.active = true;
                };
                NavComponent = __decorate([
                    core_1.Component({
                        selector: "nav-component",
                        templateUrl: "app/nav.component.html",
                        directives: [common_1.NgClass, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], NavComponent);
                return NavComponent;
            }());
            exports_1("NavComponent", NavComponent);
        }
    }
});
