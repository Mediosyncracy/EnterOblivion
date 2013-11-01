function mandelbox (v){

	var magnitude;
	var scale = 3;
	var folding_val = 2;
	var folding_limit = 1;
	var fixed_radius = 1;
	var min_radius = 0.5;
	var mag_sum = 0;
	var constant = 0;

	for (var i = 0; i < 3; i++){
		var element = v.getComponent(i);
		if (element > folding_limit){
			v.setComponent(i, folding_val - element);
		}
		else if (element < -folding_limit){
			v.setComponent(i, (-folding_val - element));
		}
		// Prepare magnitude
		mag_sum += Math.pow(element,2);
	}

	// Generate magnitude
	magnitude = Math.pow(mag_sum,0.5);

	if (magnitude < min_radius){
		v.multiplyScalar(Math.pow(fixed_radius,2)/Math.pow(min_radius,2));
	}
	else if (magnitude < fixed_radius){
		var x = Math.pow(magnitude,2);
		v.multiplyScalar(Math.pow(fixed_radius,2)/Math.pow(magnitude,2));
	}

	v.multiplyScalar(scale * v);
	v += constant;
	console.log("mandelbox worked");
	return v;
}	
