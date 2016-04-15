(function () {

    var scene = new THREE.Scene();
    var rayCaster = new THREE.Raycaster();

    var light = new THREE.DirectionalLight(new THREE.Color(0xFFFFFF), 1);
    light.position.set(0, 10, 10);
    scene.add(light);

    var hemisphereLight = new THREE.HemisphereLight(0xcccccc, 0x333333, 0.05);
    scene.add(hemisphereLight);

    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    var pedestals = [];

    new THREE.FontLoader().load('js/lib/fonts/droid/droid_sans_regular.typeface.js', function (font) {

        var i;
        var length = CATS_DATABASE.length;
        var maximumScore = 1;
        for (i = 0, length; i < length; i++) {
            maximumScore = CATS_DATABASE[i].score > maximumScore ? CATS_DATABASE[i].score : maximumScore;
        }

        for (i = 0; i < length; i++) {
            var cat = CATS_DATABASE[i];
            var catPedestal = buildCatPedestal(cat, maximumScore, font);
            catPedestal.position.x = i * 2 - length;
            scene.add(catPedestal);
            pedestals.push(catPedestal);
            /*var pedestalBoundingBox = new THREE.BoundingBoxHelper( catPedestal, 0xFF0000 );
             pedestalBoundingBox.update();
             scene.add( pedestalBoundingBox );*/
        }

        var wallMaterial = new THREE.MeshPhongMaterial({color: 0xE84F0E});
        var wallGeometry = new THREE.BoxGeometry((length + 2) * 2, 1.618 * 4, 1);
        var wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
        wallMesh.position.y = 1.618;
        wallMesh.position.z = -2.5;
        scene.add(wallMesh);

        var groundMaterial = new THREE.MeshPhongMaterial({color: 0xdddddd});
        var groundGeometry = new THREE.BoxGeometry((length + 2) * 2, 1, 5);
        var groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        groundMesh.position.y = -1.3;
        scene.add(groundMesh);


    });

    scene.setCamera = function (camera) {
        camera.position.z = 5;
        camera.position.y = 2;
        camera.position.x = 0;
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
    };

    scene.animateCamera = function (time, camera) {
        camera.position.x = Math.cos(time) * 2;
    };

    var center = new THREE.Vector2();
    center.x = 0;
    center.y = 0;

    scene.animateScene = function (time, camera) {
        var i;
        var length = pedestals.length;
        for (i = 0; i < length; i++) {
            pedestals[i].score.visible = false;
            pedestals[i].gender.visible = false;
            pedestals[i].age.visible = false;
        }
        rayCaster.setFromCamera(center, camera);
        var intersects = rayCaster.intersectObjects(scene.children, true);
        for (i = 0; i < intersects.length; i++) {
            if (intersects[i].object.parent.score) {
                intersects[i].object.parent.score.visible = true;
                intersects[i].object.parent.gender.visible = true;
                intersects[i].object.parent.age.visible = true;
            }
        }
    };

    scenes.push(scene);

})();

// To add a texture to a material, you only have to load it and bind it to the map property of you material

// Textures should be power of two sized

// Textures coordinates, known as UV (like XY), are always between 0 and 1, keep it in mind when mapping something
