(function () {
    var scene = new THREE.Scene();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({color: 0xE84F0E});

    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    scenes.push(scene);

    scene.setCamera = function (camera) {
        camera.position.z = 5;
        camera.position.y = 0;
        camera.position.x = 0;
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
    };

})();

// If you are at the origin
// -X is left
// +X is left
// -Y is down
// +Y is up
// -Z is before you
// +Z is behind you

// A scene is a hierarchical structure of objects

// You need a geometry and a material to build a mesh

// You need add the mesh to the scene to see it

// It is the mesh you manipulate in the scene, not the geometry

// You may share geometries and materials between meshes

// Easier than pure WebGL isn't it ? :)