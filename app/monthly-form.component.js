System.register(["angular2/core"], function(exports_1, context_1) {
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
    var core_1;
    var MonthlyForm;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MonthlyForm = (function () {
                function MonthlyForm() {
                }
                MonthlyForm.prototype.ngOnInit = function () {
                    google.charts.load('current', { 'packages': ['corechart'] });
                    google.charts.setOnLoadCallback(this.drawChart);
                    window.onresize = this.drawChart;
                };
                MonthlyForm.prototype.drawChart = function () {
                    var data = new google.visualization.DataTable();
                    data.addColumn('date', 'Date');
                    data.addColumn('number', 'Total Score');
                    data.addRows([
                        [new Date(2015, 5, 7), 4],
                        [new Date(2015, 5, 8), 5],
                        [new Date(2015, 5, 9), 8],
                        [new Date(2015, 5, 10), 7],
                        [new Date(2015, 5, 11), 1],
                        [new Date(2015, 5, 12), 14],
                        [new Date(2015, 5, 13), 8],
                        [new Date(2015, 5, 14), 4]
                    ]);
                    var options = {
                        'title': "Diet Tracker",
                        "vAxis": {
                            viewWindowMode: "explicit",
                            viewWindow: {
                                min: 0,
                                max: 20
                            }
                        }
                    };
                    var chart = new google.visualization.LineChart(document.getElementById("chart"));
                    chart.draw(data, options);
                };
                MonthlyForm = __decorate([
                    core_1.Component({
                        template: "\n    <div id=\"chart-fixer\">\n      <div id=\"chart\"></div>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], MonthlyForm);
                return MonthlyForm;
            }());
            exports_1("MonthlyForm", MonthlyForm);
        }
    }
});
