System.register(["angular2/core", "angular2/router", "./login.service", "./forms.service"], function(exports_1, context_1) {
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
    var core_1, router_1, login_service_1, forms_service_1;
    var MonthlyForm;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (forms_service_1_1) {
                forms_service_1 = forms_service_1_1;
            }],
        execute: function() {
            MonthlyForm = (function () {
                function MonthlyForm(formsService) {
                    this.formsService = formsService;
                }
                MonthlyForm.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.processData().then(function (data) {
                        data.unshift(["Date", "Score", { "type": "string", "role": "style" }]);
                        google.charts.setOnLoadCallback(_this.drawChart(data));
                        // $(window).resize($.debounce(250, () => this.drawChart(data))); // No JQuery debounce!?
                        $(window).resize(function () { return _this.drawChart(data); });
                    });
                };
                MonthlyForm.prototype.drawChart = function (data) {
                    var table = new google.visualization.arrayToDataTable(data);
                    var chart = new google.visualization.LineChart(document.getElementById("chart"));
                    var options = {
                        "title": "Diet Tracker",
                        "pointSize": 7,
                        "vAxis": {
                            viewWindowMode: "explicit",
                            viewWindow: {
                                min: 0,
                                max: 20
                            }
                        }
                    };
                    chart.draw(table, options);
                };
                MonthlyForm.prototype.processData = function () {
                    var _this = this;
                    return new Promise(function (res, rej) {
                        _this.formsService.getUserEntries().then(function (data) {
                            var dataArray = [];
                            for (var i in data) {
                                if (data.hasOwnProperty(i)) {
                                    var datum = data[i];
                                    var datestring = datum["date"];
                                    var date = new Date(datestring.slice(0, 4), datestring.slice(5, 7), datestring.slice(8, 10));
                                    var color = void 0;
                                    switch (datum["carbsscore"]) {
                                        case 0:
                                            color = "#00ff00";
                                            break;
                                        case 1:
                                            color = "#ffff00";
                                            break;
                                        case 2: color = "#ff0000";
                                    }
                                    var score = datum["cravingscore"] + datum["energyscore"] +
                                        datum["hungerscore"] + datum["satietyscore"] +
                                        datum["wellbeingscore"];
                                    dataArray.push([date, score, ("point { size: 12; fill-color: " + color + "; }")]);
                                }
                            }
                            res(dataArray);
                        });
                    });
                };
                MonthlyForm = __decorate([
                    router_1.CanActivate(function (to, fr) {
                        return login_service_1.checkAuth(["standard", "admin"]);
                    }),
                    core_1.Component({
                        providers: [forms_service_1.FormsService],
                        template: "\n    <div id=\"chart-fixer\">\n      <div id=\"chart\"></div>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [forms_service_1.FormsService])
                ], MonthlyForm);
                return MonthlyForm;
            }());
            exports_1("MonthlyForm", MonthlyForm);
        }
    }
});
