/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>
System.register(["angular2/core", "angular2/router", "angular2/http", "./login.service", "./forms.service"], function(exports_1, context_1) {
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
    var core_1, router_1, http_1, login_service_1, forms_service_1;
    var Entries;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (forms_service_1_1) {
                forms_service_1 = forms_service_1_1;
            }],
        execute: function() {
            Entries = (function () {
                function Entries(formsService) {
                    this.formsService = formsService;
                    // this.entries = new Promise((res, rej) => {
                    this.entries = new Promise(function (resolve, _) {
                        var array = [];
                        formsService.getUserEntries()
                            .then(function (result) {
                            console.log(result);
                            for (var r in result) {
                                if (result.hasOwnProperty(r)) {
                                    console.log(result[r]);
                                    array.push(result[r]);
                                }
                            }
                        });
                        resolve(array);
                    });
                }
                Entries.prototype.handleDelete = function (event, id) {
                    event.preventDefault();
                    this.formsService.deleteEntry(id);
                    console.log(id);
                };
                Entries = __decorate([
                    router_1.CanActivate(function (to, fr) {
                        return login_service_1.checkAuth(["standard", "admin"]);
                    }),
                    core_1.Component({
                        template: "\n    <h1>Entries</h1>\n    <table class=\"table table-responsive\">\n      <tr>\n        <th>Date</th>\n        <th>Score</th>\n        <th>Carbs</th>\n        <th></th>\n      </tr>\n      <tr *ngFor=\"#entry of entries | async\">\n        <td>{{entry.date}}</td>\n        <td>\n          {{entry.cravingscore + entry.energyscore + entry.hungerscore +\n            entry.satietyscore + entry.wellbeingscore}}\n        </td>\n        <td>{{entry.carbsscore}}</td>\n        <td><a (click)=\"handleDelete($event, entry.id)\" href=\"#\">Delete</a></td>\n      </tr>\n    </table>\n  ",
                        providers: [http_1.HTTP_PROVIDERS, forms_service_1.FormsService],
                    }), 
                    __metadata('design:paramtypes', [forms_service_1.FormsService])
                ], Entries);
                return Entries;
            }());
            exports_1("Entries", Entries);
        }
    }
});
