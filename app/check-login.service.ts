/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>
import {Injector, Injectable} from 'angular2/core';
import {appInjector} from './app-injector';
import {AccountService} from './account.service';
import {Router, ComponentInstruction} from 'angular2/router';

export const checkAuth = (permittedAudiences: string[]) => {
  let injector = appInjector();
  let accountService = injector.get(AccountService);

  return accountService.isAuthorized(permittedAudiences);
};
