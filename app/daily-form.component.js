System.register(["angular2/core", "./date-picker.component", "./button-questions.component", "./checkbox-questions.component", "./question-data", "angular2/router", "angular2/http", "./check-login.service"], function(exports_1, context_1) {
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
    var core_1, date_picker_component_1, button_questions_component_1, checkbox_questions_component_1, question_data_1, router_1, http_1, check_login_service_1;
    var DailyForm;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (date_picker_component_1_1) {
                date_picker_component_1 = date_picker_component_1_1;
            },
            function (button_questions_component_1_1) {
                button_questions_component_1 = button_questions_component_1_1;
            },
            function (checkbox_questions_component_1_1) {
                checkbox_questions_component_1 = checkbox_questions_component_1_1;
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
            function (check_login_service_1_1) {
                check_login_service_1 = check_login_service_1_1;
            }],
        execute: function() {
            DailyForm = (function () {
                function DailyForm() {
                    this.score = 0;
                    this.buttonQuestions = question_data_1.buttonQuestions;
                    this.checkboxQuestions = question_data_1.checkboxQuestions;
                    this.buttonQuestions.forEach(function (b, i) {
                        b["index"] = i;
                    });
                    this.checkboxQuestions.forEach(function (c, i) {
                        c["index"] = i;
                    });
                }
                DailyForm.prototype.dateDataEntered = function (event) {
                    console.log(event);
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
                        return check_login_service_1.checkAuth(["standard", "admin"]);
                    }),
                    core_1.Component({
                        selector: "daily-form",
                        directives: [button_questions_component_1.ButtonQuestions, checkbox_questions_component_1.CheckboxQuestions, date_picker_component_1.DatePicker],
                        providers: [http_1.HTTP_PROVIDERS],
                        template: "\n    <form>\n      <h1>Daily Tracker</h1>\n      <br>\n      <legend>Date</legend>\n      <date-picker (onDataEntered)=\"dateDataEntered($event)\"></date-picker>\n      <br>\n      <br>\n      <button-questions\n        *ngFor=\"#b of buttonQuestions\"\n        [btn]=\"b\"\n        (onDataEntered)=\"buttonDataEntered($event)\">\n      </button-questions>\n      <checkbox-questions\n        *ngFor=\"#c of checkboxQuestions\"\n        [cbox]=\"c\"\n        (onDataEntered)=\"checkboxDataEntered($event)\">\n      </checkbox-questions>\n      <br>\n      <input type=\"submit\" value=\"Submit\" class=\"btn btn-primary\">\n    </form>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], DailyForm);
                return DailyForm;
            }());
            exports_1("DailyForm", DailyForm);
        }
    }
});
