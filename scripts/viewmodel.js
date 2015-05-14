require(["knockout-3.3.0", "houseBuilder", "validationBinding"], function(ko, houseBuilder) {

    viewModel = {
	    house: houseBuilder.build(data)
	}

	ko.applyBindings(viewModel);

});

var data = {
	number : 4,
	residents : [
	{name : 'paul'},{name: 'anth'},{name:'kourosh'},{name:'si'}
	]
}