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
    var SubForm, DailyForm, HungerControl, CravingControl, Satiety, EnergyLevel, WellBeing;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SubForm = (function () {
                function SubForm() {
                    this.score = null;
                    this.selection = null;
                    this.enteredText = "";
                }
                SubForm.prototype.onSelect = function (option) {
                    this.selection = option;
                    this.score = option.points;
                };
                return SubForm;
            }());
            DailyForm = (function () {
                function DailyForm() {
                    this.subForms = [];
                    this.totalScore = 0;
                    this.enableSubmit = false;
                    this.subForms.push(new HungerControl);
                    this.subForms.push(new CravingControl);
                    this.subForms.push(new Satiety);
                    this.subForms.push(new EnergyLevel);
                    this.subForms.push(new WellBeing);
                }
                DailyForm.prototype.onSelect = function (option, classType) {
                    var classInstance = this.getMatchingClassInstance(classType);
                    classInstance.selection = option;
                    classInstance.onSelect(option);
                    this.totalScore = this.getScore();
                    this.enableSubmit = this.getEnableSubmit();
                    console.log(this.subForms);
                };
                ;
                DailyForm.prototype.handleSubmit = function () {
                    if (!this.getEnableSubmit()) {
                        alert("You must select an answer for each category.");
                    }
                    else {
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
                    for (var form in this.subForms) {
                        score += this.subForms[form].score;
                    }
                    return score;
                };
                DailyForm.prototype.getEnableSubmit = function () {
                    var result = true;
                    this.subForms.forEach(function (form) {
                        if (!form.selection) {
                            result = false;
                        }
                    });
                    console.log(result);
                    return result;
                };
                DailyForm = __decorate([
                    core_1.Component({
                        selector: "daily-form",
                        templateUrl: "app/daily-form.component.html"
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
                    this.subjectiveText = "I felt hungriest these times";
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
                    this.subjectiveText = "I craved the following foods";
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
                    this.subjectiveText = "I felt most satisfied after the following meals";
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
                    this.subjectiveText = "Comments";
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
                    this.subjectiveText = "Comments";
                }
                return WellBeing;
            }(SubForm));
        }
    }
});
