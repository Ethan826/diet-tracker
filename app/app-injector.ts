import {Injector} from "angular2/core";

let appInjectorRef: Injector;

/**
 * This is a hack to ensure that dependency injection can work in
 * non-components, particularly @CanActivate decorators and link hiding
 * the NavComponent. This singleton injector has been initialized in time
 * to be used by those components. See the discussion
 * [here](https://github.com/angular/angular/issues/4112).
 */
export const appInjector = (injector?: Injector): Injector => {
  if (injector) { appInjectorRef = injector; };

  return appInjectorRef;
};
