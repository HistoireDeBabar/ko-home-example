define(["knockout-3.3.0"], function (ko) {
    "use strict";

    ko.extenders.targetIsGreaterThanOption = function(target, option){
        target.hasError = ko.observable();

        function validate(newValue){
            target.hasError(newValue <= option);
            console.log(target.hasError());
        };

        target.subscribe(function(newValue) {
             validate(newValue);
        });

        validate(target());
        return target;
    };

    ko.extenders.targetIsEven = function(target, option){
        target.hasError = ko.observable();

        function validate(newValue) {
            var result = newValue % 2;
            option ? target.hasError(result !== 0) : target.hasError(result === 0);
        }
        target.subscribe(function(newValue) {
            validate(newValue);
        });

        validate(target());
        return target;
    };

});