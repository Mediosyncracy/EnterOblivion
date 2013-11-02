var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var fieldsize = 10;

var geometry = new THREE.CubeGeometry(20,20,20);
var material = new THREE.MeshPhongMaterial({color: 0x282828});
var amalgam = new THREE.Geometry();
var voxel = new THREE.Mesh(geometry,material);
var amalgamesh;




init();
animate();


function init(){
    var position = THREE.Vector3();
    for(var x=0;x<fieldsize;x++){
	for(var y=0;y<fieldsize;y++){
	    for(var z=0;z<fieldsize;z++){
	    	var position = new THREE.Vector3(x,y,z);


		position = mandelbox(position);

		voxel.position.x = position.x;
		voxel.position.y = position.y;
		voxel.position.z = position.z;
		THREE.GeometryUtils.merge(amalgam, voxel);
	    }
	}
    }

    almagamesh = new THREE.Mesh(amalgam,material);
    console.log("Adding mesh");
    scene.add(amalgamesh);
    console.log("Finished adding");
    camera.position.z = 1000;


//    scene.add(voxel);
//    camera.position.z = 50;


}



function animate(){

    requestAnimationFrame(animate);
    renderer.render(scene, camera);


}
