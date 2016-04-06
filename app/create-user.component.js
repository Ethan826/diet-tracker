System.register(["angular2/core", "angular2/common", "./account.service", "angular2/http", "angular2/router"], function(exports_1, context_1) {
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
    var core_1, common_1, account_service_1, http_1, router_1;
    var CreateUser;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (account_service_1_1) {
                account_service_1 = account_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            /**
             * Permits creating a new user. Uses AccountService to communicate with the
             * server.
             */
            CreateUser = (function () {
                function CreateUser(fb, accountService, router, routeParams) {
                    var _this = this;
                    this.accountService = accountService;
                    this.router = router;
                    this.routeParams = routeParams;
                    this.passwordStrengthValidator = function (control) {
                        if (_this.hasOwnProperty("passwordControl")) {
                            // This is a hack to make sure the passwordsMatchValidator updates on entry of data in the
                            // password field, not just the matching passwords field
                            _this.confirmPasswordControl.updateValueAndValidity();
                        }
                        if (zxcvbn(control.value).score < 2) {
                            return { weakPassword: true };
                        }
                    };
                    this.passwordsMatchValidator = function (control) {
                        if (_this.hasOwnProperty("passwordControl") && control.value !== _this.passwordControl.value) {
                            return { passwordMismatch: true };
                        }
                    };
                    this.createUserForm = fb.group({
                        "username": ["", common_1.Validators.required],
                        "password": ["", common_1.Validators.compose([common_1.Validators.required, this.passwordStrengthValidator])],
                        "confirmPassword": ["", this.passwordsMatchValidator]
                    });
                    this.usernameControl = this.createUserForm.controls["username"];
                    this.passwordControl = this.createUserForm.controls["password"];
                    this.confirmPasswordControl = this.createUserForm.controls["confirmPassword"];
                }
                CreateUser.prototype.handleSubmit = function () {
                    var _this = this;
                    if (this.createUserForm.valid) {
                        this.accountService.submitNewCreds(this.usernameControl.value, this.passwordControl.value)
                            .subscribe(function (data) {
                            console.log("Received response from handleSubmit " + data);
                            _this.router.parent.navigate(["/Login"]);
                        }, function (error) {
                            console.error(error);
                        });
                    }
                    else {
                        alert("Correct the errors in the form, then resubmit.");
                    }
                };
                CreateUser = __decorate([
                    core_1.Injectable(),
                    core_1.Component({
                        selector: "create-user",
                        providers: [account_service_1.AccountService, http_1.HTTP_PROVIDERS],
                        template: "\n    <h1>Create User</h1>\n    <br>\n    <form [ngFormModel]=\"createUserForm\" (ngSubmit)=\"handleSubmit(createUserForm.value)\">\n    <div class=\"form-group\">\n      <div [class.has-error]=\"!usernameControl.valid && usernameControl.touched\"\n           [class.has-success]=\"usernameControl.valid\">\n        <input id=\"usernameInput\"\n               [ngFormControl]=\"usernameControl\"\n               class=\"form-control\"\n               type=\"text\"\n               placeholder=\"Username\">\n      </div>\n      <br>\n      <div *ngIf=\"usernameControl.hasError('required') && usernameControl.touched\"\n           class=\"alert alert-danger\">\n        <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>\n        Username cannot be blank.\n      </div>\n      <div [class.has-error]=\"!passwordControl.valid && passwordControl.touched\"\n           [class.has-success]=\"passwordControl.valid\">\n        <input id=\"passwordInput\"\n               class=\"form-control\"\n               type=\"password\"\n               placeholder=\"Password\"\n               [ngFormControl]=\"passwordControl\">\n      </div>\n      <br>\n      <div *ngIf=\"passwordControl.hasError('required') && passwordControl.touched\"\n           class=\"alert alert-danger\">\n        <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>\n        Password cannot be blank.\n      </div>\n      <div *ngIf=\"passwordControl.hasError('weakPassword') && passwordControl.touched\"\n           class=\"alert alert-danger\">\n        <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>\n        Password is too weak\n      </div>\n      <div [class.has-error]=\"!confirmPasswordControl.valid && confirmPasswordControl.touched\"\n           [class.has-success]=\"confirmPasswordControl.valid && confirmPasswordControl.touched\">\n        <input id=\"confirmPasswordInput\"\n               class=\"form-control\"\n               type=\"password\"\n               placeholder=\"Confirm Password\"\n               [ngFormControl]=\"confirmPasswordControl\">\n      </div>\n      <br>\n      <div *ngIf=\"confirmPasswordControl.hasError('passwordMismatch') && confirmPasswordControl.touched\"\n           class=\"alert alert-danger\">\n        <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>\n        Passwords do not match\n      </div>\n      <input type=\"submit\"\n             value=\"Submit\"\n             class=\"btn btn-primary\"\n             [class.disabled]=\"!createUserForm.valid\">\n    </div>\n    </form>\n  "
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, account_service_1.AccountService, router_1.Router, router_1.RouteParams])
                ], CreateUser);
                return CreateUser;
            }());
            exports_1("CreateUser", CreateUser);
        }
    }
});
