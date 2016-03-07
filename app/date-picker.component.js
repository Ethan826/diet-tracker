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
    var DatePicker;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DatePicker = (function () {
                function DatePicker() {
                    this.date = new Date();
                    this.onDataEntered = new core_1.EventEmitter();
                }
                DatePicker.prototype.ngOnInit = function () {
                    var self = this;
                    $("#date-picker").val(this.date.toLocaleDateString());
                    $("#date-picker").datepicker({
                        onSelect: function () {
                            self.handleDate($(this).datepicker("getDate"));
                        }
                    });
                };
                DatePicker.prototype.handleDate = function (date) {
                    this.date = date;
                    this.onDataEntered.emit(date);
                };
                DatePicker = __decorate([
                    core_1.Component({
                        selector: "date-picker",
                        outputs: ["onDataEntered"],
                        template: "\n    <input type=\"text\"\n           readonly=\"readonly\"\n           id=\"date-picker\">\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], DatePicker);
                return DatePicker;
            }());
            exports_1("DatePicker", DatePicker);
        }
    }
});
