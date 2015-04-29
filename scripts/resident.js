define(["knockout-3.3.0"],function (ko) {

    function Resident(name){
    	this.name_ = ko.observable(name || "");

	};

	return {
		createResident : Resident,
	}

});