define(["resident", "house"],function (resident, house) {

    var getNumber = function(data){
    	return data.number;
    };

    var getResidents = function(data){
    	var residents = [];
    	for (var i = data.residents.length - 1; i >= 0; i--) {
    		var r = data.residents[i];
    		residents.push(new resident.createResident(r.name));
    	};
    	return residents;
    };

    var build = function(data){
    	var num = getNumber(data);
    	var residents = getResidents(data);
    	return new house.createHouse(num, residents);
    };

    return {
    	build : build
    }


});