(function () {

    var scene = new THREE.Scene();

    var light = new THREE.DirectionalLight(new THREE.Color(0xFFFFFF), 1);
    light.position.set(0, 20, -5);
    scene.add(light);

    var ambientLight = new THREE.AmbientLight(0xE84F0E, 0.3);
    scene.add(ambientLight);

    var groundMaterial = new THREE.MeshLambertMaterial({color: 0x540000});
    var armchairMaterial = new THREE.MeshLambertMaterial({color: 0xE84F0E});
    var screenMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});

    buildCinema(scene, groundMaterial, armchairMaterial, screenMaterial);

    scene.setCamera = function (camera) {
        camera.position.z = 0;
        camera.position.y = -5;
        camera.rotation.x = 0;
    };

    scene.animateCamera = function (time, camera) {
        camera.position.z = Math.cos(time) * 10 - 10;
        camera.rotation.y = Math.sin(time) / 4;
        camera.rotation.x = Math.sin(time) / 2;
    };

    scenes.push(scene);

})();

// With groups, you can move all children at once, making it far easier to build scenes or replicate elements

// From the root of a group, you can recursively traverse the graph using the traverse method on it