require(["knockout-3.3.0", "houseBuilder"], function(ko, houseBuilder) {

    viewModel = {
	    house_: houseBuilder.build(data)
	}

	ko.applyBindings(viewModel);

});

var data = {
	number : 4,
	residents : [
	{name : 'paul'},{name: 'anth'},{name:'kourosh'},{name:'si'}
	]
}