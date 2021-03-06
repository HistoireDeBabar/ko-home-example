define(["knockout-3.3.0", "house"], function(ko, house) {

    var HouseEditor = function(house){
    	this.house = house;
        this.number_ = ko.observable(0);
        this.newResidentName_ = ko.observable("");
    }

    HouseEditor.prototype.saveNumber = function() {
    	this.house().number(this.number_());
    };

    HouseEditor.prototype.add = function(){
        this.residents_.push(new resident.createResident(this.newResidentName_()));
    };

    var build = function(house){
        return new HouseEditor(house);
    }

    return {
    	editor: build
    }

});