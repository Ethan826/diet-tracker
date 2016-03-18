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
                // Consider reimplementing with Sweet.js macros to transform
                // the data structure directly into the fb.group() call
                function DailyForm(fb) {
                    this.fb = fb;
                    this.buttonQuestions = question_data_1.buttonQuestions;
                    this.checkboxQuestions = question_data_1.checkboxQuestions;
                    this.dailyGroup = fb.group({
                        "buttonGroup": this.buttonGroupBuilder(this.buttonQuestions),
                        "checkboxGroup": this.checkboxGroupBuilder(this.checkboxQuestions)
                    });
                    console.log(this.dailyGroup);
                }
                DailyForm.prototype.handleButtonSelection = function (outer, inner) {
                    // Hack to suppress type error (temp is a Control)
                    var temp = this.buttonGroup.controls[outer];
                    var controls = temp.controls.buttons.controls;
                    for (var c in controls) {
                        if (controls.hasOwnProperty(c)) {
                            controls[c].updateValue(false);
                        }
                    }
                    controls[inner].updateValue(true);
                    controls[inner].markAsTouched();
                    controls[inner].markAsDirty();
                };
                DailyForm.prototype.handleCheckboxSelection = function (outer) {
                    // Hack to suppress type error (temp is a Control)
                    var temp = this.dailyGroup.controls["checkboxGroup"];
                    var control = temp.controls[outer].controls["checkboxPrompt"];
                    control.updateValue(!control.value);
                    control.markAsTouched();
                    control.markAsDirty();
                };
                DailyForm.prototype.buttonGroupBuilder = function (buttonQuestions) {
                    var _this = this;
                    // Accumulator of outer ControlGroup
                    var finalResult = {};
                    // Loop over questions by key to build up outer ControlGroup
                    var questionKeys = this.getKeys(buttonQuestions);
                    questionKeys.forEach(function (questionKey) {
                        var intermediateResult = {};
                        var buttonQuestion = buttonQuestions[questionKey];
                        var buttonKeys = _this.getKeys(buttonQuestion.buttons);
                        // Loop over buttons to build inner ControlGroups
                        var tertiaryResult = {};
                        buttonKeys.forEach(function (buttonKey) {
                            tertiaryResult[buttonKey] = [false];
                        });
                        // Add the text field
                        intermediateResult["buttons"] = _this.fb.group(tertiaryResult);
                        intermediateResult["textField"] = [""];
                        finalResult[questionKey] = _this.fb.group(intermediateResult);
                    });
                    return this.fb.group(finalResult);
                };
                DailyForm.prototype.checkboxGroupBuilder = function (checkboxQuestions) {
                    var _this = this;
                    var finalResult = {};
                    this.getKeys(checkboxQuestions).forEach(function (outer) {
                        var intermediateResult = {};
                        _this.getKeys(checkboxQuestions[outer]).forEach(function (inner) {
                            // TODO: Refactor to avoid matching the string
                            if (inner === "textPrompt") {
                                intermediateResult[inner] = [""];
                            }
                            else {
                                intermediateResult[inner] = [false];
                            }
                        });
                        finalResult[outer] = _this.fb.group(intermediateResult);
                    });
                    return this.fb.group(finalResult);
                };
                DailyForm.prototype.getKeys = function (objects) {
                    return Object
                        .keys(objects)
                        .filter(function (object) { return objects.hasOwnProperty(object); });
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
