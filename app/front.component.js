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
    var FrontComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            FrontComponent = (function () {
                function FrontComponent() {
                }
                FrontComponent = __decorate([
                    core_1.Component({
                        selector: "front",
                        template: "\n    <h1>Diet Tracker</h1>\n    <p>\n      This webapp is an interactive version of the diet tracker worksheets\n      Dr. David Ludwig provides in his <i>Always Hungry</i> diet book. The\n      Daily Form entries are saved and used to create the chart view in\n      Monthly. The chart generally relates to well being: the higher the\n      better. The color of the dot represents the amount of processed\n      carbohydrate you ate that day.\n    </p>\n\n    <p>\n      The chart is useful for spotting how sensitive you are to processed\n      carbohydrates. You may see a connection between days with low well being\n      associated with higher consumption of processed carbohydrates. If you\n      do, that&#8217;s a sign you should cut back. See <a href=\"http://drdavidludwig.com/\">\n      here</a> for more information.\n    </p>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], FrontComponent);
                return FrontComponent;
            }());
            exports_1("FrontComponent", FrontComponent);
        }
    }
});
