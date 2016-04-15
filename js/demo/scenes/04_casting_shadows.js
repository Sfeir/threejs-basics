(function () {

    var scene = new THREE.Scene();

    //scene.camera = camera;

    var geometry = new THREE.BoxGeometry(1, 1, 1);


    var groundGeometry = new THREE.BoxGeometry(22, 1, 22);
    var groundMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 1,
        shading: THREE.SmoothShading
    });
    var groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.position.z = -1;
    groundMesh.position.x = -1;
    groundMesh.position.y = -1;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    /*var orangeMaterial = new THREE.MeshPhongMaterial({color: 0xE84F0E});
     var grayMaterial = new THREE.MeshPhongMaterial({color: 0x333333});
     var whitishMaterial = new THREE.MeshPhongMaterial({color: 0xcccccc});*/

    var orangeMaterial = new THREE.MeshLambertMaterial({color: 0xE84F0E});
    var grayMaterial = new THREE.MeshPhongMaterial({color: 0x333333});
    var whitishMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});

    var materials = [];
    var materialIndex = 0;
    materials.push(orangeMaterial);
    materials.push(grayMaterial);
    materials.push(whitishMaterial);

    var cubes = [];

    for (var x = -10; x < 10; x += 2) {
        for (var y = -10; y < 10; y += 2) {
            materialIndex = (materialIndex + 1) % materials.length;
            var cube = new THREE.Mesh(geometry, materials[materialIndex]);
            cube.position.x = x;
            cube.position.z = y;
            cube.position.y = 2;
            cube.castShadow = true;
            cube.receiveShadow = true;
            scene.add(cube);
            cubes.push(cube);
        }
        materialIndex = (materialIndex + 1) % materials.length;
    }

    var light = new THREE.DirectionalLight(new THREE.Color(0xFFFFFF), 1);
    light.position.set(0, 20, 0);
    light.castShadow = true;

    var shadowTextureDefinition = 2048;
    light.shadow.mapSize.width = shadowTextureDefinition;
    light.shadow.mapSize.height = shadowTextureDefinition;
    light.shadow.camera.right = 20;
    light.shadow.camera.left = -20;
    light.shadow.camera.top = 20;
    light.shadow.camera.bottom = -20;
    light.shadow.camera.near = 10;
    light.shadow.camera.fov = 75;
    light.shadow.camera.far = 100;
    light.shadow.bias = -0.005;

    scene.add(light);

    scene.add(new THREE.CameraHelper(light.shadow.camera));

    var hemisphereLight = new THREE.HemisphereLight(0xcccccc, 0x333333, 0.05);
    scene.add(hemisphereLight);

    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
    scene.add(ambientLight);

    scene.setCamera = function (camera) {
        camera.position.z = 20;
        camera.position.y = 10;
        camera.position.x = 0;
        camera.rotation.x = -0.4;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
    };

    scene.animateCamera = function (time, camera) {
        camera.rotation.y = Math.sin(time) / 4;
    };

    scene.animateScene = function (time) {
        light.position.x = 50 * Math.cos(time);
        light.position.z = 10 * Math.sin(time);

        for (var i = cubes.length - 1; i >= 0; i--) {
            var cube = cubes[i];
            cube.position.y = (Math.sin(cube.position.x + time) * Math.cos(cube.position.z + time)) * 0.5 + 2;
        }

    };

    scenes.push(scene);
})();

// You must set the renderer shadow parameters

// Getting you shadows right is tricky, beware the frustum dimensions !

// The shadow bias needs to be calibrated according to your scene or shadows will suffer from acne

// A bigger shadow texture is heavier GPU wise but is far nicer than a low resolution one