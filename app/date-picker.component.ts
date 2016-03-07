/// <reference path="../typings/main/ambient/jquery/jquery.d.ts"/>
/// <reference path="../typings/main/ambient/jqueryui/jqueryui.d.ts"/>
import {Component, OnInit, EventEmitter} from "angular2/core";
import {FORM_DIRECTIVES, Control} from "angular2/common";

@Component({
  selector: "date-picker",
  outputs: ["onDataEntered"],
  template: `
    <input type="text"
           readonly="readonly"
           id="date-picker">
  `
})
export class DatePicker implements OnInit {
  onDataEntered: EventEmitter<Date>;
  private date: Date;

  constructor() {
    this.date = new Date();
    this.onDataEntered = new EventEmitter();
  }

  ngOnInit() {
    let self = this;
    $("#date-picker").val(this.date.toLocaleDateString());
    $("#date-picker").datepicker({
      onSelect: function() {
        self.handleDate($(this).datepicker("getDate"));
      }
    });
  }

  private handleDate(date: Date) {
    this.date = date;
    this.onDataEntered.emit(date);
  }
}
