define(["knockout-3.3.0", "resident"], function(ko, resident) {

    var House = function(number, residents){
    	this.number_ = ko.observable(number || 0);
    	this.residents_ = ko.observableArray(residents || []);

    }

    House.prototype.remove = function(resident) {
    	this.residents_.remove(resident);
    };

    return {
    	createHouse: House
    }

});