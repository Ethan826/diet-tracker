System.register(["angular2/core", "angular2/common", "angular2/src/facade/lang"], function(exports_1, context_1) {
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
    var core_1, common_1, lang_1;
    var BUTTON_VALUE_ACCESSOR, ButtonControlValueAccessor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            // Pure cargo cult programming from http://goo.gl/t9P64s
            // (though this should be a library function in ng2 Gold)
            BUTTON_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
                useExisting: core_1.forwardRef(function () { return ButtonControlValueAccessor; }),
                multi: true
            }));
            ButtonControlValueAccessor = (function () {
                function ButtonControlValueAccessor(_renderer, _elementRef) {
                    this._renderer = _renderer;
                    this._elementRef = _elementRef;
                    this.onChange = function (_) { };
                    this.onTouched = function () { };
                }
                ButtonControlValueAccessor.prototype.writeValue = function (value) {
                    this._renderer.setElementProperty(this._elementRef.nativeElement, "checked", value === this._elementRef.nativeElement.value);
                };
                ButtonControlValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
                ButtonControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
                ButtonControlValueAccessor = __decorate([
                    core_1.Directive({
                        selector: "input[type=button][ngControl],input[type=button][ngFormControl],input[type=radio][ngModel]",
                        host: {
                            "(change)": "onChange($event.target.value)",
                            "(blur)": "onTouched()"
                        },
                        bindings: [BUTTON_VALUE_ACCESSOR]
                    }), 
                    __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
                ], ButtonControlValueAccessor);
                return ButtonControlValueAccessor;
            }());
            exports_1("ButtonControlValueAccessor", ButtonControlValueAccessor);
        }
    }
});
