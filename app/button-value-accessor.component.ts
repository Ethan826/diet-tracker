import {
  Directive,
  Renderer,
  ElementRef,
  Self,
  forwardRef,
  Provider
} from "angular2/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "angular2/common";
import {CONST_EXPR} from "angular2/src/facade/lang";

// Pure cargo cult programming from http://goo.gl/t9P64s
// (though this should be a library function in ng2 Gold)

const BUTTON_VALUE_ACCESSOR = CONST_EXPR(new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => ButtonControlValueAccessor),
    multi: true
  })
  );

@Directive({
  selector:
  "input[type=button][ngControl],input[type=button][ngFormControl],input[type=radio][ngModel]",
  host: {
    "(change)": "onChange($event.target.value)",
    "(blur)": "onTouched()"
  },
  bindings: [BUTTON_VALUE_ACCESSOR]
})
export class ButtonControlValueAccessor implements ControlValueAccessor {
  onChange = (_: any) => { };
  onTouched = () => { };

  constructor(private _renderer: Renderer, private _elementRef: ElementRef) { }

  writeValue(value: any): void {
    this._renderer.setElementProperty(
      this._elementRef.nativeElement,
      "checked",
      value === this._elementRef.nativeElement.value
      );
  }
  registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
  registerOnTouched(fn: () => {}): void { this.onTouched = fn; }
}
