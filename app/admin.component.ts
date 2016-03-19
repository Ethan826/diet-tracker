import {Component} from "angular2/core";
import {ComponentInstruction, CanActivate} from "angular2/router";
import {checkAuth} from "./login.service";

/**
 * TODO
 */
@CanActivate(
  (to: ComponentInstruction, fr: ComponentInstruction) => {
    return checkAuth(["admin"]);
  })
@Component({
  template: "Welcome to the Admin Page"
})
export class AdminComponent { }
