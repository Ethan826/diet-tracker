import {Component, EventEmitter} from "angular2/core";
import {IButton, IButtonField} from "./interfaces";

@Component({
  selector: "button-field",
  inputs: ["btn"],
  template: `
    <div>
      <fieldset>
        <legend>{{btn.legend}}</legend>
        <label>{{btn.explanatoryText}}</label>
        <div class="form-group">
          <div *ngFor="#b of btn.buttons"
               class="btn-group">
            <button type="button"
                    class="btn btn-default"
                    (click)="clicked(b)"
                    [class.btn-primary]="isSelected(b)">
              {{b.buttonText}}
            </button>
          </div>
        </div>
        <div class="form-group">
          <label class="sr-only">Subjective Text</label>
          <input class="form-control"
                 type="text" placeholder="{{btn.placeholderText}}">
        </div>
      </fieldset>
      <br>
    </div>
  `
})
export class ButtonField {
  private score: number;
  private btn: IButtonField;
  private selected: IButton;
  private onButtonClicked: EventEmitter<IButton>;

  constructor() {
    this.onButtonClicked = new EventEmitter();
  }

  private clicked(b: IButton) {
    this.selected = b;
    this.onButtonClicked.emit(b);
  }

  private isSelected(b: IButton) {
    return this.selected && this.selected === b ? true : false;
  }
}
