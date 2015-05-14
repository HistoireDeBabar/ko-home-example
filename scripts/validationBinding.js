define(["knockout-3.3.0"], function (ko) {
    "use strict";

    ko.bindingHandlers.validate = {
        update: function(element, valueAccessor, allBindings) {
            var observable = valueAccessor();
            var className = allBindings.get('className') || 'error';
            var value = ko.unwrap(observable);
            if(observable.hasError()) {
                element.className = className;
            } 
            else {
                element.classList.remove(className);
            }
        }
    };

});