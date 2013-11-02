var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var fieldsize = 30;

var geometry = new THREE.CubeGeometry(1,1,1);
var material = new THREE.MeshPhongMaterial({color: 0x888888});
var amalgam = new THREE.Geometry();
var voxel = new THREE.Mesh(geometry);
var the_fog = new THREE.Fog(0xFEFEFE,1,2000);
var amalgamesh;
var pointLight_2;
var controls = new THREE.FlyControls(camera, renderer.domElement);
var clock = new THREE.Clock();



init();
animate();


function init(){
    var position = THREE.Vector3();
    for(var x=-fieldsize/2;x<fieldsize/2;x++){
	for(var y=-fieldsize/2;y<fieldsize/2;y++){
	    for(var z=-fieldsize/2;z<fieldsize/2;z++){
	    	var position = new THREE.Vector3(x/(fieldsize),y/(fieldsize),z/(fieldsize));

	    //console.log(" " + position.x +", " + position.y + ", " + position.z);
		position = mandelbox(position);
		//console.log(" " + position.x +", " + position.y + ", " + position.z);

		voxel.position.x = position.x*fieldsize;
		voxel.position.y = position.y*fieldsize;
		voxel.position.z = position.z*fieldsize;
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
    pointLight_2 = new THREE.PointLight(0x0000ff,1,1000)
    var directionalLight = new THREE.DirectionalLight( 0xff00aa, 1 ); 
    directionalLight.position.set( 170, 330, -160 ); 
    pointLight_2.position.set( 170, 330, -160 ); 
    scene.add( directionalLight );
    scene.add( the_fog );

    camera.position.x += 100;
    camera.position.y += 100;
    controls.movementSpeed = 25;
    //controls.addEventListener('change', animate);
}



function animate(){

	var delta = clock.getDelta();
    requestAnimationFrame(animate);
    camera.position.z = Math.sin(clock.getElapsedTime()/100)*300;
    //camera.position.y = -Math.sin(2*Math.PI*clock/20) * 10;
    //camera.rotation.x = Math.sin(2*Math.PI*clock/20) * Math.PI/2;
    pointLight_2.position.x = Math.sin(clock.getElapsedTime()/100)*500; 
    renderer.render(scene, camera);
    controls.update(delta);


}
