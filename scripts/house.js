define(["knockout-3.3.0", "resident"], function(ko, resident) {

    var House = function(number, residents){
    	this.number_ = ko.observable(number || 0);
    	this.residents_ = ko.observableArray(residents || []);
        this.newName_ = ko.observable("");
        this.newNumber_ = ko.observable(0);
    }

    House.prototype.remove = function(resident) {
    	this.residents_.remove(resident);
    };

    House.prototype.add = function(){
        var res = new resident.createResident(this.newName_());
        this.residents_.push(res);
    };

    House.prototype.saveNumber = function(){
        this.number_(this.newNumber_());
    }


    return {
    	createHouse: House
    }

});