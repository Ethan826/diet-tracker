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
                    var dateString = new Date().toLocaleDateString();
                    this.dailyGroup = fb.group({
                        // This is a tradeoff: this permits validation, but does so at the cost
                        // of switching from date to string to date.
                        "date": [dateString, common_1.Validators.required],
                        "buttonGroup": this.buttonGroupBuilder(this.buttonQuestions),
                        "checkboxGroup": this.checkboxGroupBuilder(this.checkboxQuestions)
                    });
                }
                /**********************************************
                 * Event handlers and submits                 *
                 *********************************************/
                DailyForm.prototype.ngOnInit = function () {
                    var self = this;
                    $("#date-picker").val();
                    $("#date-picker").datepicker({
                        onSelect: function () {
                            // handle the date
                        }
                    });
                };
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
                        console.log(this.dailyGroup);
                    }
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
                DailyForm = __decorate([
                    router_1.CanActivate(function (to, fr) {
                        return login_service_1.checkAuth(["standard", "admin"]);
                    }),
                    core_1.Component({
                        selector: "daily-form",
                        directives: [date_picker_component_1.DatePicker],
                        providers: [http_1.HTTP_PROVIDERS],
                        template: "\n  <!-- Header material -->\n  <h1>Daily Tracker</h1>\n  <br>\n\n  <form [ngFormModel]=\"dailyGroup\">\n\n    <!-- Date -->\n    <legend>Date</legend>\n\n    <input type=\"text\"\n           [ngFormControl]=\"dailyGroup.controls['date']\"\n           readonly=\"readonly\"\n           id=\"date-picker\">\n    <br><br>\n\n    <!-- Button Questions -->\n\n    <div *ngFor=\"#outer of getKeys(buttonQuestions)\">\n      <legend>{{buttonQuestions[outer].legend}}</legend>\n      <label>{{buttonQuestions[outer].explanatoryText}}</label>\n      <br>\n      <div class=\"btn-group\" data-toggle=\"buttons\">\n        <label *ngFor=\"#inner of getKeys(buttonQuestions[outer].buttons)\"\n               class=\"btn btn-default\"\n               [class.error]=\"submitAttempted | async\"\n               (click)=\"handleButtonSelection(outer, inner)\">\n          <input type=\"radio\"\n                 name=\"{{outer}}\">\n            {{buttonQuestions[outer].buttons[inner]}}\n        </label>\n      </div>\n      <br>\n      <br>\n      <div class=\"form-group\">\n        <!-- This is getting a little hairy. Consider refactoring. -->\n        <input [ngFormControl]=\"dailyGroup.controls.buttonGroup.controls[outer].controls['textField']\"\n               placeholder=\"{{buttonQuestions[outer].placeholderText}}\"\n               class=\"form-control\"\n               type=\"text\">\n      </div>\n      <br>\n    </div>\n\n    <!-- Checkbox Questions -->\n\n    <div *ngFor=\"#outer of getKeys(checkboxQuestions)\">\n      <label>\n        <input type=\"checkbox\"\n               (click)=\"handleCheckboxSelection(outer)\">\n          &emsp; {{checkboxQuestions[outer][\"checkboxPrompt\"]}}\n      </label>\n      <div *ngIf=\"checkShowText(outer)\">\n        <div class=\"form-group\">\n          <input [ngFormControl]=\"dailyGroup.controls.checkboxGroup.controls[outer].controls['textPrompt']\"\n                 placeholder=\"{{checkboxQuestions[outer].textPrompt}}\"\n                 class=\"form-control\"\n                 type=\"text\">\n      </div>\n      </div>\n    </div>\n    <br>\n\n    <!-- Form Submit -->\n\n    <button type=\"submit\"\n            class=\"btn btn-primary\"\n            (click)=submitForm()\n            [class.disabled]=\"!dailyGroup.valid\">Submit</button>\n  </form>\n  "
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], DailyForm);
                return DailyForm;
            }());
            exports_1("DailyForm", DailyForm);
        }
    }
});
