var SC = SC || [];

SC.viewModel = {
    house_: ko.observable({
        number_: ko.observable(0),
        residents_: ko.observableArray([]),
        remove: function(resident){
		//from residents from resident
 		}
    })
}

ko.applyBindings(SC.viewModel);
