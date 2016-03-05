import {Component, EventEmitter, OnInit} from "angular2/core";
import {Control} from "angular2/common"
import {ICheckboxQuestion} from "./interfaces";

@Component({
  inputs: ["cbox"],
  outputs: ["onDataEntered"],
  selector: "checkbox-questions",
  template: `
    <div>
      <label>
        <input type="checkbox"
               (change)="clicked()">
          &emsp;
          {{cbox.checkboxPrompt}}
      </label>
    </div>
    <div *ngIf="hasText && cbox.checkboxInput" class="form-group">
      <input type="text"
             placeholder="{{cbox.textPrompt}}"
             class="form-control">
    </div>
  `
})
export class CheckboxQuestions implements OnInit {
  cbox: ICheckboxQuestion;
  onDataEntered: EventEmitter<ICheckboxQuestion>;
  hasText: boolean;

  constructor() {
    this.onDataEntered = new EventEmitter();
    this.hasText = false;
  }

  ngOnInit() {
    this.hasText = this.cbox.textPrompt ? true : false;
  }

  clicked() {
    this.cbox.checkboxInput = !this.cbox.checkboxInput;
    this.onDataEntered.emit(this.cbox);
  }
}
