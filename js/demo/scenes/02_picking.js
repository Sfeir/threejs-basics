(function () {

    var scene = new THREE.Scene();
    var rayCaster = new THREE.Raycaster();

    var geometry = new THREE.BoxGeometry(1, 1, 1);

    for (var x = -20; x < 20; x += 2) {
        for (var y = -20; y < 20; y += 2) {
            var disabledMaterial = new THREE.MeshBasicMaterial({color: 0x333333});
            var cube = new THREE.Mesh(geometry, disabledMaterial);
            cube.position.x = x;
            cube.position.y = y;
            scene.add(cube);
        }
    }

    scenes.push(scene);

    function onMouseClick(event) {
        var mouse = new THREE.Vector2();
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

        rayCaster.setFromCamera(mouse, camera);
        var intersects = rayCaster.intersectObjects(scene.children);
        for (var i = 0; i < intersects.length; i++) {
            intersects[i].object.material.color.set(0xE84F0E);
        }
    }

    window.addEventListener('click', onMouseClick, false);

    scene.setCamera = function (camera) {
        camera.position.z = 20;
        camera.position.y = 0;
        camera.position.x = 0;
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
    };

    scene.animateCamera = function (time, camera) {
        camera.rotation.y = Math.sin(time) / 4;
        camera.rotation.z = Math.cos(time) / 2;
        camera.rotation.x = Math.sin(time) / 2;
    };

})();

// Using the ray caster removes all the picking related calculations burden from you

// If you're picking hierarchical objects, don't forget to set the recursive flag to true

// Don't forget to update the ray caster according to the camera when you want to perform picking operations

// You can use the ray caster from different points of view