System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var appInjectorRef, appInjector;
    return {
        setters:[],
        execute: function() {
            /**
             * This is a hack to ensure that dependency injection can work in
             * non-components, particularly @CanActivate decorators and link hiding
             * the NavComponent. This singleton injector has been initialized in time
             * to be used by those components. See the discussion
             * [here](https://github.com/angular/angular/issues/4112).
             */
            exports_1("appInjector", appInjector = function (injector) {
                if (injector) {
                    appInjectorRef = injector;
                }
                ;
                return appInjectorRef;
            });
        }
    }
});
