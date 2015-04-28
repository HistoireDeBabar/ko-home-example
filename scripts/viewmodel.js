var SC = SC || {};

require(["knockout-3.3.0", "resident"], function(ko, resident) {

    SC.viewModel = {
	    house_: ko.observable({
	        number_: ko.observable(1),
	        residents_: ko.observableArray(resident.loadResidents() || []),
	        remove: function(resident){
				this.residents_.remove(resident);
			}

    	})
	}

	ko.applyBindings(SC.viewModel);

});

