(function () {

    var scene = new THREE.Scene();

    var video = document.getElementById('video');
    video.muted = true;

    if (typeof video.loop == 'boolean') {
        video.loop = true;
    } else {
        video.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    video.play();

    var light = new THREE.DirectionalLight(new THREE.Color(0xFFFFFF), 1);
    light.position.set(0, 20, -5);
    scene.add(light);

    var ambientLight = new THREE.AmbientLight(0xE84F0E, 0.3);
    scene.add(ambientLight);

    var texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    var groundMaterial = new THREE.MeshLambertMaterial({color: 0x540000});
    var armchairMaterial = new THREE.MeshLambertMaterial({color: 0xE84F0E});
    var screenMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture});

    buildCinema(scene, groundMaterial, armchairMaterial, screenMaterial);

    scene.setCamera = function (camera) {
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 0;
        camera.rotation.z = 0;
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

// You can add html5 video elements as textures to your scenes using the same field as regular textures