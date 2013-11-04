var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var fieldsize = 20;
var ts = fieldsize/2.0;

var geometry = new THREE.CubeGeometry(1,1,1);
var material = new THREE.MeshPhongMaterial({color: 0x888888});
var amalgam = new THREE.Geometry();
var voxel = new THREE.Mesh(geometry);
var the_fog = new THREE.Fog(0xFEFEFE,1,1000);
var amalgamesh;
var pointLight_2;
var controls = new THREE.FlyControls(camera, renderer.domElement);
var clock = new THREE.Clock();



init();
animate();


function init(){
    var position = THREE.Vector3();
    for(var x=-ts;x<ts;x++){
	for(var y=-ts;y<ts;y++){
	    for(var z=-ts;z<ts;z++){
	    	var position = new THREE.Vector3(x/ts,y/ts,z/ts);

	    //console.log(" " + position.x +", " + position.y + ", " + position.z);
		position = mandelbox(position);
		//console.log(" " + position.x +", " + position.y + ", " + position.z);

		voxel.position.x = position.x*ts;
		voxel.position.y = position.y*ts;
		voxel.position.z = position.z*ts;
		THREE.GeometryUtils.merge(amalgam, voxel);
	    }
	}
    }

    amalgamesh = new THREE.Mesh(amalgam,material);
    console.log("Adding mesh");
    scene.add(amalgamesh);
    console.log("Finished adding");
    camera.position.z = 400;

    var pointLight = new THREE.PointLight(0x00ff00,1,1000);
    scene.add(pointLight);
    pointLight_2 = new THREE.PointLight(0x0000ff,1,3000)
    var directionalLight = new THREE.DirectionalLight( 0xff00aa, 1 ); 
    directionalLight.position.set( 170, 330, -160 ); 
    pointLight_2.position.set( 170, 330, -160 ); 
    scene.add( directionalLight );
    scene.add( the_fog );

    camera.position.x += 1;
    camera.position.y += 1;
    controls.movementSpeed = 25;
    //controls.addEventListener('change', animate);
}



function animate(){
    var xseize = 0;
    var delta = clock.getDelta();
    requestAnimationFrame(animate);
    camera.position.z = Math.sin(clock.getElapsedTime()/100)*(5*fieldsize);
    //camera.position.y = -Math.sin(2*Math.PI*clock/20) * 10;
    if(camera.position.z >= 0){
	if(camera.rotation.x>0){
	    camera.rotation.x -= Math.PI/256.0;
	}
    } else {
	if(camera.rotation.x<Math.PI){
	    camera.rotation.x += Math.PI/256.0;
	}
    }

    camera.rotation.y = Math.sin(clock.getElapsedTime()/12.5)/6.0
    camera.rotation.z = Math.sin(clock.getElapsedTime()/12.5)/8.0

    pointLight_2.position.x = Math.sin(clock.getElapsedTime()/100)*500; 
    renderer.render(scene, camera);
    controls.update(delta);


}
