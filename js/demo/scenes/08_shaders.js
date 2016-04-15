(function () {

    ShadersManager.load("checkerFloorVertex", "js/demo/shaders/checkerFloor/vertex.c")
        .then(ShadersManager.load.bind(this, "checkerFloorFragment", "js/demo/shaders/checkerFloor/fragment.c"))
        .then(ShadersManager.load.bind(this, "armchairVertex", "js/demo/shaders/armchair/vertex.c"))
        .then(ShadersManager.load.bind(this, "armchairFragment", "js/demo/shaders/armchair/fragment.c"))
        .then(function () {

            var scene = new THREE.Scene();

            var video = document.getElementById('video');
            video.muted = true;

            var light = new THREE.DirectionalLight(new THREE.Color(0xFFFFFF), 1);
            light.position.set(0, 20, -5);
            scene.add(light);

            var ambientLight = new THREE.AmbientLight(0xE84F0E, 0.3);
            scene.add(ambientLight);

            var texture = new THREE.VideoTexture(video);
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBFormat;

            var screenMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture});

            var groundMaterial = new THREE.ShaderMaterial({
                uniforms: null,
                vertexShader: ShadersManager.programs["checkerFloorVertex"],
                fragmentShader: ShadersManager.programs["checkerFloorFragment"]
            });

            var armchairMaterial = new THREE.ShaderMaterial({
                uniforms: null,
                vertexShader: ShadersManager.programs["armchairVertex"],
                fragmentShader: ShadersManager.programs["armchairFragment"]
            });

            buildCinema(scene, groundMaterial, armchairMaterial, screenMaterial);

            scene.setCamera = function (camera) {
                camera.position.z = 2;
                camera.position.y = -5;
                camera.rotation.x = 0;
            };

            scene.animateCamera = function (time, camera) {
                camera.position.z = Math.cos(time * 0.5) * 10 - 10;
                camera.rotation.x = Math.sin(time * 0.5) / 2 - 0.5;
            };

            scenes.push(scene);
        });

})();

// Shaders are the low level way to handle vertices and textures

// It's the most powerful way to add effects to your applications

// Great shaders imply great mathematics, keep an eye on newly released CG papers

// http://www.iquilezles.org/ is the best place to learn

// https://www.shadertoy.com/ is the place to see

// Possibilities are endless !

// You can even use shaders for sound processing