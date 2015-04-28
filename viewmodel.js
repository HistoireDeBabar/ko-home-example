var SC = SC || [];

SC.viewModel = {
    house: ko.observable({
        number: ko.observable(0),
        residents: ko.observableArray([]),
        remove: function(resident){
		//from residents from resident
 		}
    })
}

ko.applyBindings(SC.viewModel);