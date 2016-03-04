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
    var ButtonField;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ButtonField = (function () {
                function ButtonField() {
                    this.onButtonClicked = new core_1.EventEmitter();
                }
                ButtonField.prototype.clicked = function (b) {
                    this.selected = b;
                    this.onButtonClicked.emit(b);
                };
                ButtonField.prototype.isSelected = function (b) {
                    return this.selected && this.selected === b ? true : false;
                };
                ButtonField = __decorate([
                    core_1.Component({
                        selector: "button-field",
                        inputs: ["btn"],
                        template: "\n    <div>\n      <fieldset>\n        <legend>{{btn.legend}}</legend>\n        <label>{{btn.explanatoryText}}</label>\n        <div class=\"form-group\">\n          <div *ngFor=\"#b of btn.buttons\"\n               class=\"btn-group\">\n            <button type=\"button\"\n                    class=\"btn btn-default\"\n                    (click)=\"clicked(b)\"\n                    [class.btn-primary]=\"isSelected(b)\">\n              {{b.buttonText}}\n            </button>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"sr-only\">Subjective Text</label>\n          <input class=\"form-control\"\n                 type=\"text\" placeholder=\"{{btn.placeholderText}}\">\n        </div>\n      </fieldset>\n      <br>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ButtonField);
                return ButtonField;
            }());
            exports_1("ButtonField", ButtonField);
        }
    }
});
