function mandelbrot_white (v){

	var mag_sum = 0;
	var phi;
	var theta;
	var magnitude;
	var n = 8;

	// Generate magnitude, 'r'
	mag_sum += Math.pow(v.getComponent(0),2);
	mag_sum += Math.pow(v.getComponent(1),2);
	mag_sum += Math.pow(v.getComponent(2),2);
	magnitude = Math.pow(mag_sum,0.5);

	phi = Math.atan(v.getComponent(0)/v.getComponent(1));
	theta = Math.acos(v.z/magnitude);

	var x_1 = Math.sin(n*phi)*Math.cos(n*theta);
	var y_1 = Math.sin(n*theta)*Math.sin(n*phi);
	var z_1 = Math.cos(n*theta);

	v.set(x_1,y_1,z_1);
	v.multiplyScalar(Math.pow(magnitude,n));
	return v;
}
