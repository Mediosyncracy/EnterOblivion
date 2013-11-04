function mandelbox (v){

	var magnitude;
	var scale = 3;
	var folding_val = 2;
	var folding_limit = 1;
	var fixed_radius = 1;
	var min_radius = 0.5;
	var mag_sum = 0;
	var constant = 0.0;

	for (var i = 0; i < 3; i++){
		var element = v.getComponent(i);
		if (element > folding_limit){
			v.setComponent(i, folding_val - element);
		}
		else if (element < -folding_limit){
			v.setComponent(i, (-folding_val - element));
		}
		// Prepare magnitude
		//console.log("Twenty One : " + v.x);
		mag_sum += Math.pow(element,2);
	}

	// Generate magnitude
	magnitude = Math.pow(mag_sum,0.5);

	//console.log("Twenty Seven : " + v.x);
	if (magnitude < min_radius){
		//console.log("FIRST IF");
		v.multiplyScalar(Math.pow(fixed_radius,2)/Math.pow(min_radius,2));
		//console.log(v.x);
	}
	else if (magnitude < fixed_radius){
		//console.log("Second IF");
		var x = Math.pow(magnitude,2);
		//console.log(v.x);
		v.multiplyScalar(Math.pow(fixed_radius,2)/Math.pow(magnitude,2));
	}
	
	//console.log("Forty One : " + v.x);
	v.multiplyScalar(scale);
	v.addScalar(constant);
	//console.log("Forty Four : " + v.x);
	//console.log("mandelbox worked");
	return v;
}	
