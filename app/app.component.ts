import {Component} from "angular2/core";
import {DailyForm} from "./daily-form.component";

@Component({
    selector: "app",
    directives: [DailyForm],
    template: `<daily-form></daily-form>`
})
export class AppComponent { }
