System.register(["angular2/core", "angular2/common"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var MIN_LENGTH, Login;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            MIN_LENGTH = 8;
            Login = (function () {
                function Login(fb) {
                    this.loginForm = fb.group({
                        "username": ["", common_1.Validators.required],
                        "password": ["", common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(MIN_LENGTH), this.passwordValidator])]
                    });
                    this.username = this.loginForm.controls["username"];
                    this.password = this.loginForm.controls["password"];
                }
                Login.prototype.onSubmit = function (f) {
                    if (!f.valid) {
                        alert("Invalid submission. Correct errors and resubmit.");
                    }
                    else {
                    }
                };
                Login.prototype.passwordValidator = function (control) {
                    if (zxcvbn(control.value).score < 2) {
                        return { weakPassword: true };
                    }
                };
                Login = __decorate([
                    core_1.Component({
                        directives: [common_1.FORM_DIRECTIVES],
                        template: "\n<h1>Login</h1>\n<br>\n<form [ngFormModel]=\"loginForm\" (ngSubmit)=\"onSubmit(loginForm.value)\">\n  <div class=\"form-group\">\n    <div [class.has-error]=\"username.touched && !username.valid\"\n         [class.has-success]=\"username.valid\">\n      <input id=\"usernameInput\"\n             class=\"form-control\"\n             type=\"text\"\n             placeholder=\"Username\"\n             [ngFormControl]=\"loginForm.controls['username']\">\n    </div>\n    <br>\n    <div *ngIf=\"username.hasError('required') && username.touched\" class=\"alert alert-danger\">\n      <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>\n      Username cannot be blank.\n    </div>\n    <br>\n    <div [class.has-error]=\"password.touched && !password.valid\"\n         [class.has-success]=\"password.valid\">\n      <input id=\"passwordInput\"\n             class=\"form-control\"\n             type=\"password\"\n             placeholder=\"Password\"\n             [ngFormControl]=\"loginForm.controls['password']\">\n    </div>\n    <br>\n    <div *ngIf=\"password.hasError('required') && username.touched\" class=\"alert alert-danger\">\n      <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>\n      Password cannot be blank.\n    </div>\n    <div *ngIf=\"password.hasError('minlength') && username.touched\" class=\"alert alert-danger\">\n      <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>\n      Password must be at least " + MIN_LENGTH + " characters.\n    </div>\n    <div *ngIf=\"password.hasError('weakPassword') && username.touched\" class=\"alert alert-danger\">\n      <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>\n      Password is too weak.\n    </div>\n    <br>\n    <button type=\"submit\"\n            class=\"btn btn-primary\"\n            [class.disabled]=\"!loginForm.valid\">Submit</button>\n  </div>\n</form>\n"
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], Login);
                return Login;
            }());
            exports_1("Login", Login);
        }
    }
});
