import {Component} from "angular2/core";
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from "angular2/common";

declare let zxcvbn: any;

let MIN_LENGTH = 8;

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
    <div *ngIf="username.hasError('required') && username.touched" class="alert alert-danger">
      <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      Username cannot be blank.
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
    <div *ngIf="password.hasError('required') && username.touched" class="alert alert-danger">
      <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      Password cannot be blank.
    </div>
    <div *ngIf="password.hasError('minlength') && username.touched" class="alert alert-danger">
      <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      Password must be at least ${MIN_LENGTH} characters.
    </div>
    <div *ngIf="password.hasError('weakPassword') && username.touched" class="alert alert-danger">
      <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      Password is too weak.
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
  private username: any; // Actually it's AbstractControl, but error
  private password: any;

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      "username": ["", Validators.required],
      "password": ["", Validators.compose([Validators.required, Validators.minLength(MIN_LENGTH), this.passwordValidator])]
    });

    this.username = this.loginForm.controls["username"];
    this.password = this.loginForm.controls["password"];
  }

  onSubmit(f: ControlGroup) {
    if(!f.valid) {
      alert("Invalid submission. Correct errors and resubmit.");
    } else {
      // Handle
    }
  }

  private passwordValidator(control: Control): { [s: string]: boolean } {
    if (zxcvbn(control.value).score < 2) {
      return { weakPassword: true }
    }
  }
}
