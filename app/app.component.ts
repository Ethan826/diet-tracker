import {Component} from "angular2/core";
import {DailyForm} from "./daily-form.component";
import {NavComponent} from "./nav.component";

@Component({
    selector: "app",
    inputs: [],
    directives: [NavComponent, DailyForm],
    template: `<nav-component></nav-component><daily-form></daily-form>`
})
export class AppComponent { }
