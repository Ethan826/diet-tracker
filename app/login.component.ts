import {Component} from "angular2/core";
import {FormBuilder, Validators, ControlGroup} from "angular2/common";

@Component({
  templateUrl: "app/login.component.html"
})
export class Login {
  private loginForm: ControlGroup;

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required, Validators.minLength(8)]
    });
  }

  doLogin(event: Event) {
    console.log(event);
  }
}
