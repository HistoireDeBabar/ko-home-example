SC = SC || {};

define(["knockout-3.3.0"],function (ko) {

    function Resident(name){
    	this.name_ = ko.observable(name || "");

	};

	var loadResidents = function(){
		var paul = new Resident("Paul");
		var si = new Resident("Si");
		var anth = new Resident("Anth");
		var kourosh = new Resident("Kourosh");
		return [paul, si, anth, kourosh];

	};

	return {
		Resident : Resident,
		loadResidents: loadResidents
	}

});