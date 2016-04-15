(function () {
    var scene = new THREE.Scene();

    var geometry = new THREE.BoxGeometry(1, 1, 1);

    var orangeMaterial = new THREE.MeshBasicMaterial({color: 0xE84F0E});
    var grayMaterial = new THREE.MeshBasicMaterial({color: 0x333333});
    var whitishMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});

    var materials = [];
    var materialIndex = 0;
    materials.push(orangeMaterial);
    materials.push(grayMaterial);
    materials.push(whitishMaterial);

    for (var x = -10; x < 10; x += 2) {
        for (var y = -10; y < 10; y += 2) {
            materialIndex = (materialIndex + 1) % materials.length;
            var cube = new THREE.Mesh(geometry, materials[materialIndex]);
            cube.position.x = x;
            cube.position.y = y;
            scene.add(cube);
        }
        materialIndex = (materialIndex + 1) % materials.length;
    }

    scenes.push(scene);

    scene.setCamera = function (camera) {
        camera.position.z = 5;
        camera.position.y = 0;
        camera.position.x = 0;
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
    };

    scene.animateCamera = function (time, camera) {
        camera.rotation.y = Math.sin(time) / 4;
        camera.rotation.z = Math.sin(time) / 2;
    };

})();

// The camera is an object

// Camera will be used to give your scene point of view to the renderer

// A scene may contain as many cameras as you need

// Many operations depend on the camera position

// You can set the position and rotation of an object using position and rotation fields

// You can move along your position using translateX,translateY,translateZ methods

// You can rotate around your position using rotateX,rotateY,rotateZ methods