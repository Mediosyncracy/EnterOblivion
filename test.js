var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var resolution = 20;

var geometry = new THREE.CubeGeometry(1,1,1);
var material = new THREE.MeshPhongMaterial( {color: 0xeeeeee});
var voxel = new THREE.Mesh(geometry);
var amalgam = new THREE.Geometry();

var amalgamesh;

init();
animate();

function init(){

    var foldingLimit = 1;
    var foldingValue = 2;
    var fixedRadius = 1;
    var minRadius = .5;

    for(var i=-resolution;i<resolution;i++)
    {
	/*voxel.position.x = Math.floor( Math.random() * 200 - 100)/10;
	voxel.position.y = Math.floor( Math.random() * 200 - 100)/10;
	voxel.position.z = Math.floor( Math.random() * 200 - 100)/10;
	voxel.rotation.y = Math.random()*Math.PI*2;*/
	for(var j=-resolution;j<resolution;j++)
	    {
		for(var k=-resolution;k<resolution;k++)
		{
		    x = i / resolution;
		    y = j / resolution;
		    z = k / resolution;
		    //console.log(""+x+","+y+","+z);
		    if(x > foldingLimit){
			x = foldingValue - x;
		    } else if(x < -foldingLimit){
			x = -foldingValue - x;
		    }
		    
		    if(y > foldingLimit){
			y = foldingValue - y;
		    } else if(y < -foldingLimit){
			y = -foldingValue - y;
		    }
		    
		    if(z > foldingLimit){
			z = foldingValue - z;
		    } else if(z < -foldingLimit){
			z = -foldingValue - z;
		    }

		    length = Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2));

		    if(length < minRadius){
			x = x * 4;
			y = y * 4;
			z = z * 4;
		    } else if(length < fixedRadius){
			x = x / Math.pow(length,2);
			y = y / Math.pow(length,2);
			z = z / Math.pow(length,2);
		    } 

		    voxel.position.x = (x * 3 + .01)*resolution;
		    voxel.position.y = (y * 3 + .01)*resolution;
		    voxel.position.z = (z * 3 + .01)*resolution;
		    THREE.GeometryUtils.merge(amalgam,voxel);
		}
	    }

    }

    amalgamesh = new THREE.Mesh(amalgam,material);
    //var test = new THREE.Mesh(geometry,material);
    scene.add(amalgamesh);
    //scene.add(test);
    console.log("adding mesh");
    camera.position.z = 225;
    var pointLight = new THREE.PointLight(0x00ff00,1,100);
    scene.add(pointLight);
    var directionalLight = new THREE.DirectionalLight( 0xff00aa, 1 ); 
    directionalLight.position.set( 170, 330, -160 ); 
    scene.add( directionalLight );

}


function animate(){

    requestAnimationFrame( animate );

//    test.rotation.x += 0.01;
//    test.rotation.y += 0.02;
//    console.log("rendering scene");
//    camera.position.z -= .025;
    //amalgamesh.position.z += .005
    camera.position.z -= .0125
//    camera.position.y = -Math.sin(2*Math.PI*camera.position.z/20) * 10;
//    camera.position.y = 0; 
//    camera.rotation.x = Math.sin(2*Math.PI*camera.position.z/20) * Math.PI/2;

    renderer.render( scene, camera );

}

