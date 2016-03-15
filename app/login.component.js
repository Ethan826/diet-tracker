System.register(["angular2/core", "./account.service", "angular2/common", "angular2/http", "angular2/router", "./login.service"], function(exports_1, context_1) {
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
    var core_1, account_service_1, common_1, http_1, router_1, login_service_1;
    var Login;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (account_service_1_1) {
                account_service_1 = account_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            Login = (function () {
                function Login(fb, accountService, router, loginService) {
                    this.accountService = accountService;
                    this.router = router;
                    this.loginService = loginService;
                    this.loginForm = fb.group({
                        "username": ["", common_1.Validators.required],
                        "password": ["", common_1.Validators.required]
                    });
                    this.username = this.loginForm.controls["username"];
                    this.password = this.loginForm.controls["password"];
                }
                Login.prototype.onSubmit = function () {
                    var _this = this;
                    this.error = null;
                    if (this.loginForm.valid) {
                        this.accountService.submitLogin(this.username.value, this.password.value)
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            localStorage.setItem("jwt", data.jwt);
                            _this.accountService.doCheckJWT();
                            _this.loginService.loginEvent.subscribe(function () {
                                _this.router.parent.navigate(["/DailyForm"]);
                            });
                        }, function (error) {
                            _this.error = error.json().error;
                        });
                    }
                    else {
                        alert("Invalid submission. Correct errors and resubmit.");
                    }
                };
                Login = __decorate([
                    router_1.CanActivate(function (to, fr) {
                        var loggedOut = login_service_1.checkLoggedOut();
                        console.log(loggedOut);
                        return loggedOut;
                    }),
                    core_1.Component({
                        directives: [common_1.FORM_DIRECTIVES],
                        providers: [account_service_1.AccountService, http_1.HTTP_PROVIDERS],
                        template: "\n<h1>Login</h1>\n<br>\n<form [ngFormModel]=\"loginForm\" (ngSubmit)=\"onSubmit(loginForm.value)\">\n  <div class=\"form-group\">\n    <div [class.has-error]=\"username.touched && !username.valid\"\n         [class.has-success]=\"username.valid\">\n      <input id=\"usernameInput\"\n             class=\"form-control\"\n             type=\"text\"\n             placeholder=\"Username\"\n             [ngFormControl]=\"loginForm.controls['username']\">\n    </div>\n    <br>\n    <div *ngIf=\"username.hasError('required') && username.touched\" class=\"alert alert-danger\">\n      <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>\n      Username cannot be blank.\n    </div>\n    <br>\n    <div [class.has-error]=\"password.touched && !password.valid\"\n         [class.has-success]=\"password.valid\">\n      <input id=\"passwordInput\"\n             class=\"form-control\"\n             type=\"password\"\n             placeholder=\"Password\"\n             [ngFormControl]=\"loginForm.controls['password']\">\n    </div>\n    <br>\n    <div *ngIf=\"password.hasError('required') && password.touched\"\n         class=\"alert alert-danger\">\n      <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>\n      Password cannot be blank.\n    </div>\n    <div *ngIf=\"error\"\n         class=\"alert alert-danger\">\n      <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>\n      Incorrect credentials\n    </div>\n    <br>\n    <input type=\"submit\"\n           class=\"btn btn-primary\"\n           value=\"Submit\"\n           [class.disabled]=\"!loginForm.valid\">\n  </div>\n</form>\n"
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, account_service_1.AccountService, router_1.Router, login_service_1.LoginService])
                ], Login);
                return Login;
            }());
            exports_1("Login", Login);
        }
    }
});
