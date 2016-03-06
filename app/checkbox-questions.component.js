System.register(["angular2/core", "angular2/common"], function(exports_1, context_1) {
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
    var core_1, common_1;
    var CheckboxQuestions;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            CheckboxQuestions = (function () {
                function CheckboxQuestions() {
                    this.onDataEntered = new core_1.EventEmitter();
                    this.inputTextControl = new common_1.Control();
                    this.hasText = false;
                }
                CheckboxQuestions.prototype.ngOnInit = function () {
                    this.hasText = this.cbox.textPrompt ? true : false;
                };
                CheckboxQuestions.prototype.clicked = function () {
                    this.cbox.checkboxInput = !this.cbox.checkboxInput;
                    this.dataEntered();
                };
                CheckboxQuestions.prototype.dataEntered = function () {
                    this.cbox.textInput = this.inputTextControl.value;
                    this.onDataEntered.emit(this.cbox);
                };
                CheckboxQuestions = __decorate([
                    core_1.Component({
                        inputs: ["cbox"],
                        outputs: ["onDataEntered"],
                        selector: "checkbox-questions",
                        template: "\n    <div>\n      <label>\n        <input type=\"checkbox\"\n               (change)=\"clicked()\">\n          &emsp;\n          {{cbox.checkboxPrompt}}\n      </label>\n    </div>\n    <div *ngIf=\"hasText && cbox.checkboxInput\" class=\"form-group\">\n      <input type=\"text\"\n             placeholder=\"{{cbox.textPrompt}}\"\n             [ngFormControl]=\"inputTextControl\"\n             (keyup)=\"dataEntered()\"\n             class=\"form-control\">\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], CheckboxQuestions);
                return CheckboxQuestions;
            }());
            exports_1("CheckboxQuestions", CheckboxQuestions);
        }
    }
});
