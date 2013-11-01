var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

var fieldsize = 20;

var geometry = new THREE.CubeGeometry(.1,.1,.1);
var voxel = new THREE.Mesh(geometry);
var amalgam = new THREE.Geometry();
var material = new THREE.MeshPhongMaterial({color: 0x282828 });
var amalgamesh;


renderer.setSize( window.innerWidth, window.height );
document.body.appendChild( renderer.domElement );

init();
anim();


function init(){
    var position = THREE.Vector3();
    for(var x=0;x<fieldsize;x++){
	for(var y=0;y<fieldsize;y++){
	    for(var z=0;z<fieldsize;z++){
		position.set(x,y,z);


		// Procedural Fractal Generation Here

		voxel.setPosition(position);
		THREE.GeometryUtils.merge(amalgam, voxel);
	    }
	}
    }

    almagamesh = new THREE.Mesh(almalgam,material);
    scene.add(amalgam);

}



function anim(){

    requestAnimationFrame(anim);
    renderer.render(scene, camera);


}
