System.register(["angular2/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
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
    var MONTHS, SubForm, DailyForm, HungerControl, CravingControl, Satiety, EnergyLevel, WellBeing, ProcessedCarbs, stressReductionAM, stressReductionPM, walks, movement, bedtime;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MONTHS = [
                { number: 0, name: "Jan" },
                { number: 1, name: "Feb" },
                { number: 2, name: "Mar" },
                { number: 3, name: "Apr" },
                { number: 4, name: "May" },
                { number: 5, name: "Jun" },
                { number: 6, name: "Jul" },
                { number: 7, name: "Aug" },
                { number: 8, name: "Sep" },
                { number: 9, name: "Oct" },
                { number: 10, name: "Nov" },
                { number: 11, name: "Dec" }
            ];
            SubForm = (function () {
                function SubForm() {
                    this.score = null;
                    this.selection = null;
                }
                SubForm.prototype.onSelect = function (option) {
                    this.selection = option;
                    this.score = option.points;
                };
                return SubForm;
            }());
            DailyForm = (function () {
                function DailyForm() {
                    this.MONTHS = MONTHS;
                    this.DAYS = [];
                    this.YEARS = [];
                    this.subForms = [];
                    this.checklists = [];
                    this.totalScore = 0;
                    this.enableSubmit = false;
                    this.date = new Date;
                    this.setUpDate();
                    this.subForms.push(new HungerControl);
                    this.subForms.push(new CravingControl);
                    this.subForms.push(new Satiety);
                    this.subForms.push(new EnergyLevel);
                    this.subForms.push(new WellBeing);
                    this.subForms.push(new ProcessedCarbs);
                    this.checklists.push(stressReductionAM);
                    this.checklists.push(stressReductionPM);
                    this.checklists.push(walks);
                    this.checklists.push(movement);
                    this.checklists.push(bedtime);
                }
                DailyForm.prototype.setUpDate = function () {
                    var today = new Date();
                    this.date = today;
                    for (var i = 1; i <= 31; ++i) {
                        this.DAYS.push(i);
                    }
                    var currentYear = new Date().getFullYear();
                    for (var i = currentYear - 4; i < currentYear + 5; ++i) {
                        this.YEARS.push(i);
                    }
                };
                DailyForm.prototype.onSelect = function (option, classType) {
                    var classInstance = this.getMatchingClassInstance(classType);
                    classInstance.selection = option;
                    classInstance.onSelect(option);
                    this.totalScore = this.getScore();
                    this.enableSubmit = this.getEnableSubmit();
                };
                DailyForm.prototype.handleSubmit = function () {
                    if (!this.getEnableSubmit()) {
                        alert("You must select an answer for each category.");
                    }
                    else {
                        console.log(this.subForms);
                        console.log(this.checklists);
                    }
                };
                DailyForm.prototype.getMatchingClassInstance = function (classType) {
                    var result = null;
                    this.subForms.forEach(function (form) {
                        if (form.classType === classType) {
                            result = form;
                        }
                    });
                    return result;
                };
                DailyForm.prototype.getScore = function () {
                    var score = 0;
                    this.subForms.forEach(function (form) {
                        if (form.contributesToScore) {
                            score += form.score;
                        }
                    });
                    return score;
                };
                DailyForm.prototype.getEnableSubmit = function () {
                    var result = true;
                    this.subForms.forEach(function (form) {
                        if (!form.selection) {
                            result = false;
                        }
                    });
                    return result;
                };
                DailyForm = __decorate([
                    core_1.Component({
                        selector: "daily-form",
                        template: "\n    <h1>Daily Tracker</h1>\n\n    <form>\n\n      <fieldset class=\"form-inline\">\n        <legend>Date</legend>\n        <select class=\"form-control\">\n          <option *ngFor=\"#month of MONTHS\" [value]=\"month.number\" [selected]=\"date.getMonth() === month.number\">{{month.name}}</option>\n        </select>\n        <select class=\"form-control\">\n          <option *ngFor=\"#day of DAYS\" [value]=\"day\" [selected]=\"date.getDate() === day\">{{day}}</option>\n        </select>\n        <select class=\"form-control\">\n          <option *ngFor=\"#year of YEARS\" [value]=\"year\" [selected]=\"date.getFullYear() === year\">{{year}}</option>\n        </select>\n      </fieldset>\n      <br>\n\n      <div *ngFor=\"#subForm of subForms\">\n        <fieldset>\n          <legend>{{subForm.categoryName}}</legend>\n          <label>{{subForm.explanatoryText}}</label>\n          <div class=\"form-group\">\n            <div class=\"btn-group\">\n              <button\n                type=\"button\"\n                [ngClass]=\"{\n                  'btn': true,\n                  'btn-primary': option === subForm.selection,\n                  'btn-default': option !== subForm.selection}\"\n                *ngFor=\"#option of subForm.options\"\n                (click)=\"onSelect(option, subForm.classType)\">\n                {{option.text}}\n              </button>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label class=\"sr-only\">{{subForm.subjectiveText}}</label>\n            <input class=\"form-control\" type=\"text\" placeholder=\"{{subForm.textEntry.prompt}}\" [(ngModel)]=\"subForm.textEntry.userEntry\"/>\n          </div>\n        </fieldset>\n      </div>\n\n      <legend>Activities</legend>\n      <div class=\"form-group\">\n        <div *ngFor=\"#checklist of checklists\" class=\"form-group\">\n          <label><input type=\"checkbox\" [(ngModel)]=\"checklist.answer\"/>&emsp;{{checklist.question}}</label>\n          <div *ngIf=\"checklist.textEntry && checklist.answer === true\">\n            <label class=\"sr-only\">{{checklist.textEntry.prompt}}</label>\n            <input class=\"form-control\" type=\"text\" placeholder=\"{{checklist.textEntry.prompt}}\"/>\n          </div>\n        </div>\n      </div>\n\n      <br/>\n\n      <button type=\"submit\" [ngClass]=\"{disabled: !enableSubmit, 'btn btn-primary': true}\" (click)=\"handleSubmit()\">\n        Submit\n      </button>\n      <br><br>\n    </form>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], DailyForm);
                return DailyForm;
            }());
            exports_1("DailyForm", DailyForm);
            HungerControl = (function (_super) {
                __extends(HungerControl, _super);
                function HungerControl() {
                    _super.apply(this, arguments);
                    this.options = [
                        { text: "Starving", points: 0 },
                        { text: "Very Hungry", points: 1 },
                        { text: "Moderately Hungry", points: 2 },
                        { text: "Slightly Hungry", points: 3 },
                        { text: "No Hunger", points: 4 }
                    ];
                    this.classType = "HungerControl";
                    this.categoryName = "Hunger Control";
                    this.explanatoryText = "Today, I felt";
                    this.textEntry = {
                        prompt: "I felt hungriest these times",
                        userEntry: ""
                    };
                    this.contributesToScore = true;
                }
                return HungerControl;
            }(SubForm));
            CravingControl = (function (_super) {
                __extends(CravingControl, _super);
                function CravingControl() {
                    _super.apply(this, arguments);
                    this.options = [
                        { text: "High", points: 0 },
                        { text: "Above Average", points: 1 },
                        { text: "Average", points: 2 },
                        { text: "Below Average", points: 3 },
                        { text: "Absent", points: 4 }
                    ];
                    this.classType = "CravingControl";
                    this.categoryName = "Craving Control";
                    this.explanatoryText = "Today, my cravings were";
                    this.textEntry = {
                        prompt: "I craved the following foods",
                        userEntry: ""
                    };
                    this.contributesToScore = true;
                }
                return CravingControl;
            }(SubForm));
            Satiety = (function (_super) {
                __extends(Satiety, _super);
                function Satiety() {
                    _super.apply(this, arguments);
                    this.options = [
                        { text: "Not at All", points: 0 },
                        { text: "Briefly", points: 1 },
                        { text: "A Couple Hours", points: 2 },
                        { text: "Most of the Time", points: 3 },
                        { text: "Until the Next Meal", points: 4 }
                    ];
                    this.classType = "Satiety";
                    this.categoryName = "Satiety";
                    this.explanatoryText = "I felt satisfied after eating";
                    this.textEntry = {
                        prompt: "I felt most satisfied after the following meals",
                        userEntry: ""
                    };
                    this.contributesToScore = true;
                }
                return Satiety;
            }(SubForm));
            EnergyLevel = (function (_super) {
                __extends(EnergyLevel, _super);
                function EnergyLevel() {
                    _super.apply(this, arguments);
                    this.options = [
                        { text: "Low", points: 0 },
                        { text: "Fair", points: 1 },
                        { text: "Average", points: 2 },
                        { text: "Above Average", points: 3 },
                        { text: "High", points: 4 }
                    ];
                    this.classType = "EnergyLevel";
                    this.categoryName = "Energy Level";
                    this.explanatoryText = "Today, my overall energy level was";
                    this.textEntry = {
                        prompt: "Comments",
                        userEntry: ""
                    };
                    this.contributesToScore = true;
                }
                return EnergyLevel;
            }(SubForm));
            WellBeing = (function (_super) {
                __extends(WellBeing, _super);
                function WellBeing() {
                    _super.apply(this, arguments);
                    this.options = [
                        { text: "Low", points: 0 },
                        { text: "Below Average", points: 1 },
                        { text: "Average", points: 2 },
                        { text: "Above Average", points: 3 },
                        { text: "High", points: 4 }
                    ];
                    this.classType = "WellBeing";
                    this.categoryName = "Well Being";
                    this.explanatoryText = "Today, my overall level of well-being was";
                    this.textEntry = {
                        prompt: "Comments",
                        userEntry: ""
                    };
                    this.contributesToScore = true;
                }
                return WellBeing;
            }(SubForm));
            ProcessedCarbs = (function (_super) {
                __extends(ProcessedCarbs, _super);
                function ProcessedCarbs() {
                    _super.apply(this, arguments);
                    this.options = [
                        { text: "0 to 1 servings", points: 0 },
                        { text: "2 servings", points: 1 },
                        { text: "3 or more servings", points: 2 }
                    ];
                    this.classType = "ProcessedCarbs";
                    this.categoryName = "Processed Carbs";
                    this.explanatoryText = "I had the following number of processed carbohydrates today";
                    this.textEntry = {
                        prompt: "I had the following kinds of processed carbohydrates today",
                        userEntry: ""
                    };
                    this.contributesToScore = false;
                }
                return ProcessedCarbs;
            }(SubForm));
            stressReductionAM = {
                question: "I did my five-minute stress reduction in the AM",
                answer: null
            };
            stressReductionPM = {
                question: "I did my five-minute stress reduction in the PM",
                answer: null
            };
            walks = {
                question: "I did my after-meal walks",
                answer: null
            };
            movement = {
                question: "I did my joyful movement",
                answer: null,
                textEntry: {
                    prompt: "What kind?",
                    userEntry: ""
                }
            };
            bedtime = {
                question: "I did my pre-bedtime routine",
                answer: null,
                textEntry: {
                    prompt: "Describe",
                    userEntry: ""
                }
            };
        }
    }
});
