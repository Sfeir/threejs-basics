(function () {
    var scene = new THREE.Scene();

    var geometry = new THREE.SphereGeometry(0.5, 32, 32);

    var sun = new THREE.DirectionalLight(new THREE.Color(0xffffff), 0.3);
    sun.position.set(0, 0, 20);
    scene.add(sun);

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    var hemisphereLight = new THREE.HemisphereLight(0xcccccc, 0x333333, 0.25);
    scene.add(hemisphereLight);

    var pointLight = new THREE.PointLight(0xffffff, 1.2, 60);
    pointLight.position.x = 0;
    pointLight.position.y = 0;
    pointLight.position.z = 20;
    scene.add(pointLight);
    var pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
    scene.add(pointLightHelper);

    var path = "textures/cube/";
    var format = '.jpg';
    var urls = [
        path + 'posx' + format, path + 'negx' + format,
        path + 'posy' + format, path + 'negy' + format,
        path + 'posz' + format, path + 'negz' + format
    ];

    var reflectionCube = new THREE.CubeTextureLoader().load(urls);
    reflectionCube.format = THREE.RGBFormat;

    var refractionCube = new THREE.CubeTextureLoader().load(urls);
    refractionCube.mapping = THREE.CubeRefractionMapping;
    refractionCube.format = THREE.RGBFormat;

    var shader = THREE.ShaderLib["cube"];
    shader.uniforms["tCube"].value = reflectionCube;

    var worldBackgroundMaterial = new THREE.ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    });

    var worldBackgroundMesh = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), worldBackgroundMaterial);
    scene.add(worldBackgroundMesh);

    var materials = [];
    var materialIndex = 0;

    var mirrorMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        envMap: reflectionCube,
        combine: THREE.MixOperation,
        reflectivity: 1
    });
    materials.push(mirrorMaterial);

    var orangeMaterial = new THREE.MeshPhongMaterial({
        color: 0xE84F0E,
        shading: THREE.SmoothShading
    });
    materials.push(orangeMaterial);

    var grayMaterial = new THREE.MeshLambertMaterial({
        color: 0x333333
    });
    materials.push(grayMaterial);

    var glassMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        envMap: refractionCube,
        refractionRatio: 0.85
    });
    materials.push(glassMaterial);

    var whitishMaterial = new THREE.MeshPhongMaterial({
        color: 0xcccccc,
        shading: THREE.FlatShading
    });
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

    scene.animateScene = function (time) {
        pointLight.position.x = Math.sin(time) * 20;
        pointLight.position.y = Math.sin(time) * 20;
        pointLight.position.z = Math.cos(time) * 20;
        pointLight.intensity = Math.cos(time) + 1.5;
    };

    scene.animateCamera = function (time, camera) {
        camera.rotation.y = Math.sin(time) / 4;
    };

})();

// If you want your objects shaded, you will have to use special materials

// Without lights, many materials will be black

// Lights do not affect basic materials

// Ambient light prevents pitch black darkness when direct light is not applied

// Directional light is like the sun

// Point light is omnidirectional

// Phong is for shiny objects

// Lambert is for the others

// Difference between those materials is bigger when they have more faces

// You need en environment map to use effects as reflection or refraction

// Materials used in this scene are shaders based, these shaders are provided by Three.js engine