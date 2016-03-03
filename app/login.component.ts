import {Component} from "angular2/core";
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from "angular2/common";

@Component({
  directives: [FORM_DIRECTIVES],
  template: `
<h1>Login</h1>
<br>
<form [ngFormModel]="loginForm" (ngSubmit)="onSubmit(loginForm.value)">
  <div class="form-group">
    <div [class.has-error]="username.touched && !username.valid"
         [class.has-success]="username.valid">
      <input id="usernameInput"
             class="form-control"
             type="text"
             placeholder="Username"
             [ngFormControl]="loginForm.controls['username']">
    </div>
    <br>
    <div [class.has-error]="password.touched && !password.valid"
         [class.has-success]="password.valid">
      <input id="passwordInput"
             class="form-control"
             type="password"
             placeholder="Password"
             [ngFormControl]="loginForm.controls['password']">
    </div>
    <br>
    <button type="submit"
            class="btn btn-primary"
            [class.disabled]="!loginForm.valid">Submit</button>
  </div>
</form>
`
})
export class Login {
  private loginForm: ControlGroup;
  private username: AbstractControl;
  private password: AbstractControl;

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      "username": ["", Validators.required],
      "password": ["", Validators.required]
    });

    this.username = this.loginForm.controls["username"];
    this.password = this.loginForm.controls["password"];
  }

  onSubmit(f: ControlGroup) {
    console.log(f)
  }
}
