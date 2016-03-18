/// <reference path="../typings/main/ambient/jquery/jquery.d.ts"/>
/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="../typings/main/ambient/jqueryui/jqueryui.d.ts"/>
System.register(["angular2/core", "angular2/common", "./question-data", "angular2/router", "angular2/http", "./login.service", "./forms.service"], function(exports_1, context_1) {
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
    var core_1, common_1, question_data_1, router_1, http_1, login_service_1, forms_service_1;
    var DailyForm;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
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
            },
            function (forms_service_1_1) {
                forms_service_1 = forms_service_1_1;
            }],
        execute: function() {
            DailyForm = (function () {
                // Consider reimplementing with Sweet.js macros to transform
                // the data structure directly into the fb.group() call
                function DailyForm(fb, formsService) {
                    this.fb = fb;
                    this.formsService = formsService;
                    this.buttonQuestions = question_data_1.buttonQuestions;
                    this.checkboxQuestions = question_data_1.checkboxQuestions;
                    var dateString = new Date().toLocaleDateString();
                    this.dailyGroup = fb.group({
                        // Date is a string in sqlite, so nothing lost here
                        "date": [dateString, common_1.Validators.required],
                        "buttonGroup": this.buttonGroupBuilder(this.buttonQuestions),
                        "checkboxGroup": this.checkboxGroupBuilder(this.checkboxQuestions)
                    });
                }
                /**********************************************
                 * Event handlers and submits                 *
                 *********************************************/
                DailyForm.prototype.handleButtonSelection = function (outer, inner) {
                    // Hack to suppress type error (temp is a Control)
                    var temp = this.dailyGroup.controls["buttonGroup"];
                    var controls = temp.controls[outer].controls["buttons"].controls;
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
                DailyForm.prototype.submitForm = function () {
                    if (!this.dailyGroup.valid) {
                        alert("You must click on at least one button in each set.");
                    }
                    else {
                        var form = this.processForm();
                        this.formsService.submitDaily(form).then().catch();
                        console.log("Submitting form in daily-form.component.ts");
                    }
                };
                DailyForm.prototype.processForm = function () {
                    // Shorten the names (plus hack to avoid type error)
                    var temp = this.dailyGroup.controls["buttonGroup"];
                    var bc = temp.controls;
                    temp = this.dailyGroup.controls["checkboxGroup"];
                    var cc = temp.controls;
                    var result = {};
                    // User ID will be added / checked server-side
                    result["date"] = new Date(Date.parse(this.dailyGroup.controls["date"].value))
                        .toISOString()
                        .slice(0, 10);
                    result["hungerscore"] = this.getPoints(bc["hungerControl"]);
                    result["hungertext"] = bc["hungerControl"].value["textField"];
                    result["cravingscore"] = this.getPoints(bc["cravingControl"]);
                    result["cravingtext"] = bc["cravingControl"].value["textField"];
                    result["satietyscore"] = this.getPoints(bc["satiety"]);
                    result["satietytext"] = bc["satiety"].value["textField"];
                    result["energyscore"] = this.getPoints(bc["energyLevel"]);
                    result["energytext"] = bc["energyLevel"].value["textField"];
                    result["wellbeingscore"] = this.getPoints(bc["wellBeing"]);
                    result["wellbeingtext"] = bc["wellBeing"].value["textField"];
                    result["carbsscore"] = this.getPoints(bc["processedCarbs"]);
                    result["carbstext"] = bc["processedCarbs"].value["textField"];
                    result["stressambool"] = cc["amStress"].value["checkboxPrompt"] ? 1 : 0;
                    result["stresspmbool"] = cc["pmStress"].value["checkboxPrompt"] ? 1 : 0;
                    result["walksbool"] = cc["walks"].value["checkboxPrompt"] ? 1 : 0;
                    result["movementbool"] = cc["movement"].value["checkboxPrompt"] ? 1 : 0;
                    result["movementtext"] = cc["movement"].value["textPrompt"];
                    result["bedtimebool"] = cc["bedtime"].value["checkboxPrompt"] ? 1 : 0;
                    result["bedtimetext"] = cc["bedtime"].value["textPrompt"];
                    return result;
                };
                /**********************************************
                 * Set up form                                *
                 *********************************************/
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
                        intermediateResult["buttons"] = _this.fb.group(tertiaryResult, { validator: _this.oneControlIsChecked });
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
                /**********************************************
                 * Validators and helpers                     *
                 *********************************************/
                // Validator
                DailyForm.prototype.oneControlIsChecked = function (group) {
                    var counter = 0;
                    for (var key in group.controls) {
                        if (group.controls.hasOwnProperty(key)) {
                            counter += group.controls[key].value ? 1 : 0;
                        }
                    }
                    if (counter === 1) {
                        return null;
                    }
                    else {
                        return { "mustSelectExactlyOneButton": true };
                    }
                    ;
                };
                DailyForm.prototype.getKeys = function (objects) {
                    return Object
                        .keys(objects)
                        .filter(function (object) { return objects.hasOwnProperty(object); });
                };
                DailyForm.prototype.checkShowText = function (outer) {
                    var temp = this.dailyGroup.controls["checkboxGroup"];
                    var control = temp.controls[outer].controls["checkboxPrompt"];
                    return Boolean(control.value && temp.controls[outer].controls["textPrompt"]);
                };
                DailyForm.prototype.getPoints = function (buttonGroup) {
                    var keys = this.getKeys(buttonGroup.value["buttons"]);
                    var result = null;
                    keys.forEach(function (key) {
                        if (buttonGroup.value["buttons"][key]) {
                            result = Number(key);
                        }
                    });
                    return result;
                };
                DailyForm = __decorate([
                    router_1.CanActivate(function (to, fr) {
                        return login_service_1.checkAuth(["standard", "admin"]);
                    }),
                    core_1.Component({
                        selector: "daily-form",
                        providers: [http_1.HTTP_PROVIDERS, forms_service_1.FormsService],
                        template: "\n  <!-- Header material -->\n  <h1>Daily Tracker</h1>\n  <br>\n\n  <form [ngFormModel]=\"dailyGroup\">\n\n    <!-- Date -->\n    <legend>Date</legend>\n\n    <input type=\"text\"\n           [ngFormControl]=\"dailyGroup.controls['date']\"\n           readonly=\"readonly\"\n           id=\"date-picker\">\n    <br><br>\n\n    <!-- Button Questions -->\n\n    <div *ngFor=\"#outer of getKeys(buttonQuestions)\">\n      <legend>{{buttonQuestions[outer].legend}}</legend>\n      <label>{{buttonQuestions[outer].explanatoryText}}</label>\n      <br>\n      <div class=\"btn-group\" data-toggle=\"buttons\">\n        <label *ngFor=\"#inner of getKeys(buttonQuestions[outer].buttons)\"\n               class=\"btn btn-default\"\n               [class.error]=\"submitAttempted | async\"\n               (click)=\"handleButtonSelection(outer, inner)\">\n          <input type=\"radio\"\n                 name=\"{{outer}}\">\n            {{buttonQuestions[outer].buttons[inner]}}\n        </label>\n      </div>\n      <br>\n      <br>\n      <div class=\"form-group\">\n        <!-- This is getting a little hairy. Consider refactoring. -->\n        <input [ngFormControl]=\"dailyGroup.controls.buttonGroup.controls[outer].controls['textField']\"\n               placeholder=\"{{buttonQuestions[outer].placeholderText}}\"\n               class=\"form-control\"\n               type=\"text\">\n      </div>\n      <br>\n    </div>\n\n    <!-- Checkbox Questions -->\n\n    <div *ngFor=\"#outer of getKeys(checkboxQuestions)\">\n      <label>\n        <input type=\"checkbox\"\n               (click)=\"handleCheckboxSelection(outer)\">\n          &emsp; {{checkboxQuestions[outer][\"checkboxPrompt\"]}}\n      </label>\n      <div *ngIf=\"checkShowText(outer)\">\n        <div class=\"form-group\">\n          <input [ngFormControl]=\"dailyGroup.controls.checkboxGroup.controls[outer].controls['textPrompt']\"\n                 placeholder=\"{{checkboxQuestions[outer].textPrompt}}\"\n                 class=\"form-control\"\n                 type=\"text\">\n      </div>\n      </div>\n    </div>\n    <br>\n\n    <!-- Form Submit -->\n\n    <button type=\"submit\"\n            class=\"btn btn-primary\"\n            (click)=submitForm()\n            [class.disabled]=\"!dailyGroup.valid\">Submit</button>\n  </form>\n  "
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, forms_service_1.FormsService])
                ], DailyForm);
                return DailyForm;
            }());
            exports_1("DailyForm", DailyForm);
        }
    }
});
