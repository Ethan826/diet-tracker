System.register(["angular2/core", "angular2/common", "./date-picker.component", "./question-data", "angular2/router", "angular2/http", "./login.service"], function(exports_1, context_1) {
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
    var core_1, common_1, date_picker_component_1, question_data_1, router_1, http_1, login_service_1;
    var DailyForm;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (date_picker_component_1_1) {
                date_picker_component_1 = date_picker_component_1_1;
            },
            function (question_data_1_1) {
                question_data_1 = question_data_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            DailyForm = (function () {
                function DailyForm(fb) {
                    this.buttonQuestions = question_data_1.buttonQuestions;
                    var hungerControl = this.buttonQuestions["hungerControl"];
                    console.log(fb.group(this.fbButtonHelper(hungerControl.buttons)));
                }
                DailyForm.prototype.fbButtonHelper = function (buttons) {
                    var result = {};
                    var keys = Object
                        .keys(buttons)
                        .filter(function (button) { return buttons.hasOwnProperty(button); });
                    keys.forEach(function (key) {
                        result[String(key)] = [false];
                    });
                    return result;
                };
                DailyForm.prototype.buttonDataEntered = function (event) {
                    var i = event["index"];
                    this.buttonQuestions[i] = event;
                };
                DailyForm.prototype.checkboxDataEntered = function (event) {
                    var i = event["index"];
                    this.checkboxQuestions[i] = event;
                };
                DailyForm = __decorate([
                    router_1.CanActivate(function (to, fr) {
                        return login_service_1.checkAuth(["standard", "admin"]);
                    }),
                    core_1.Component({
                        selector: "daily-form",
                        directives: [date_picker_component_1.DatePicker],
                        providers: [http_1.HTTP_PROVIDERS],
                        templateUrl: "app/daily-form.template.html"
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], DailyForm);
                return DailyForm;
            }());
            exports_1("DailyForm", DailyForm);
        }
    }
});
