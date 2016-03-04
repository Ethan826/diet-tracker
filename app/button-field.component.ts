import {Component, EventEmitter} from "angular2/core";

interface IButton {
  buttonText: string;
  buttonPoints: number;
}

interface IButtonField {
  legend: string;
  explanatoryText: string;
  placeholderText: string;
  buttons: IButton[];
}

let tester: IButtonField = {
  legend: "Legendary",
  explanatoryText: "Explainy",
  placeholderText: "Place",
  buttons: [
    { buttonText: "Foo", buttonPoints: 0 },
    { buttonText: "Bar", buttonPoints: 1 }
  ]
}

@Component({
  selector: "button-field",
  template: `
    <div>
      <fieldset>
        <legend>{{buttonField.legend}}</legend>
        <label>{{buttonField.explanatoryText}}</label>
        <div class="form-group">
          <div *ngFor="#b of buttonField.buttons"
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
                 type="text" placeholder="{{buttonField.placeholderText}}">
        </div>
      </fieldset>
    </div>
  `
})
export class ButtonField {
  private score: number;
  private buttonField: IButtonField;
  private selected: IButton;
  private onButtonClicked: EventEmitter<IButton>;

  constructor() {
    this.buttonField = tester;
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
