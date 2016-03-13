/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>
import {Injector} from 'angular2/core';
import {appInjector} from './app-injector';
import {AccountService} from './account.service';
import {Router, ComponentInstruction} from 'angular2/router';

export const authorized = (audiences: string[]) => {
  let injector: Injector = appInjector(); // get the stored reference to the injector
  let accountService: AccountService = injector.get(AccountService);

  return new Promise((resolve) => {
    accountService.audience
      .subscribe((actualAudiences) => {
      resolve(authorizedHelper(audiences, actualAudiences));
    });
  });
}


let authorizedHelper = (permittedAudiences: string[], actualAudiences: string[]): boolean => {
  let result = false;
  if (permittedAudiences.indexOf("any") >= 0) {
    result = true;
  } else {
    permittedAudiences.forEach((audience) => {
      if (actualAudiences.indexOf(audience) >= 0) {
        result = true;
      }
    });
  }
  return result;
};
