System.register(["angular2/core", "./button-field.component", "./button-data"], function(exports_1, context_1) {
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
    var core_1, button_field_component_1, button_data_1;
    var DailyForm;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (button_field_component_1_1) {
                button_field_component_1 = button_field_component_1_1;
            },
            function (button_data_1_1) {
                button_data_1 = button_data_1_1;
            }],
        execute: function() {
            DailyForm = (function () {
                function DailyForm() {
                    this.score = 0;
                    this.buttonForms = button_data_1.buttonForms;
                    this.buttonForms.forEach(function (b, i) {
                        b["index"] = i;
                    });
                }
                DailyForm.prototype.dataEntered = function (event) {
                    var i = event["index"];
                    this.buttonForms[i] = event;
                    console.log(this.buttonForms[i]);
                };
                DailyForm = __decorate([
                    core_1.Component({
                        selector: "daily-form",
                        directives: [button_field_component_1.ButtonField],
                        template: "\n    <h1>Daily Tracker</h1>\n    <br>\n    <button-field\n      *ngFor=\"#b of buttonForms\"\n      [btn]=\"b\"\n      (onDataEntered)=\"dataEntered($event)\">\n    </button-field>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], DailyForm);
                return DailyForm;
            }());
            exports_1("DailyForm", DailyForm);
        }
    }
});
