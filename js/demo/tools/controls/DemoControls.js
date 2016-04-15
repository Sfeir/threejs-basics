var DemoControls = new function () {

    var demoControls = this;

    var isMovingForward = false;
    var isMovingBackward = false;
    var isMovingLeft = false;
    var isMovingRight = false;
    var isSprinting = false;
    var isJumping = false;
    var isCrouching = false;
    var isAutoRun = false;
    var isPlaying = false;
    var mustResetCamera = true;
    var isCameraAnimationEnabled = true;

    var time = 0;
    var elapsed = 0;

    var vrControls = new THREE.VRControls(camera);

    demoControls.vrEffect = new THREE.VREffect(renderer, function (error) {
        fullScreenButton.innerHTML = error;
        fullScreenButton.classList.add('error');
    });

    demoControls.vrEffect.enteringVR = function () {
        mustResetCamera = true;
        isCameraAnimationEnabled = false;
    };

    demoControls.vrEffect.exitingVR = function () {
        mustResetCamera = true;
        isCameraAnimationEnabled = true;
    };

    var fullScreenButton = document.querySelector('.full-screen');
    var demoModeButton = document.querySelector('.demo-mode');
    var nextSceneButton = document.querySelector('.next-scene');
    var previousSceneButton = document.querySelector('.previous-scene');
    var cameraModeButton = document.querySelector('.camera-mode');

    if (navigator.getVRDisplays === undefined && navigator.getVRDevices === undefined) {
        fullScreenButton.innerHTML = 'Your browser doesn\'t support WebVR';
        fullScreenButton.classList.add('error');
    }

    fullScreenButton.onclick = function () {
        demoControls.vrEffect.setFullScreen(true);
    };

    nextSceneButton.onclick = function () {
        currentScene = (currentScene + 1) % scenes.length;
        mustResetCamera = true;
    };

    previousSceneButton.onclick = function () {
        currentScene = (currentScene - 1) % scenes.length;
        mustResetCamera = true;
    };

    cameraModeButton.onclick = function () {
        isCameraAnimationEnabled = !isCameraAnimationEnabled;
        if (isCameraAnimationEnabled) {
            cameraModeButton.innerHTML = 'Auto camera';
            mustResetCamera = true;
        } else {
            cameraModeButton.innerHTML = 'Free camera';
        }
    };

    demoModeButton.onclick = function () {
        isPlaying = !isPlaying;
        if (isPlaying) {
            demoModeButton.innerHTML = 'Playing...';
        } else {
            demoModeButton.innerHTML = 'Paused';
        }
    };

    function onWindowResize() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        camera.aspect = width / height;
        demoControls.vrEffect.setSize(width, height);
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', onWindowResize, false);

    window.addEventListener('keydown', function (event) {

        var key = (String.fromCharCode(event.keyCode)).toUpperCase();
        if (key == "N") {
            mustResetCamera = true;
            currentScene = (currentScene + 1) % scenes.length;
        }
        if (key == "P") {
            mustResetCamera = true;
            currentScene = (currentScene - 1) % scenes.length;
        }
        if (key == "A") {
            isAutoRun = !isAutoRun;
        }
        if (key == "Z") {
            isMovingForward = true;
        }
        if (key == "S") {
            isMovingBackward = true;
        }
        if (key == "Q") {
            isMovingLeft = true;
        }
        if (key == "D") {
            isMovingRight = true;
        }
        if (key == "") {
            isSprinting = true;
        }
        if (key == " ") {
            isJumping = true;
        }
        if (key == "") {
            isCrouching = true;
        }
    });

    window.addEventListener('keyup', function (event) {
        var key = (String.fromCharCode(event.keyCode)).toUpperCase();
        if (key == "Z") {
            isMovingForward = false;
        }
        if (key == "S") {
            isMovingBackward = false;
        }
        if (key == "Q") {
            isMovingLeft = false;
        }
        if (key == "D") {
            isMovingRight = false;
        }
        if (key == "") {
            isSprinting = false;
        }
        if (key == "") {
            isSprinting = false;
        }
        if (key == " ") {
            isJumping = false;
        }
        if (key == "") {
            isCrouching = false;
        }
    });

    this.handleControls = function (scene) {

        if (scene.setCamera && mustResetCamera) {
            scene.setCamera(camera);
            mustResetCamera = false;
        }

        if (scene.animateScene) {
            scene.animateScene(time, camera);
        }

        if (isCameraAnimationEnabled) {
            if (scene.animateCamera) {
                scene.animateCamera(time, camera);
            }
        } else {
            vrControls.update();

            var speed = isSprinting ? 0.1 : 0.02;
            if (isMovingForward) {
                camera.translateZ(-speed);
            }
            if (isMovingBackward) {
                camera.translateZ(speed);
            }
            if (isMovingLeft) {
                camera.translateX(-speed);
            }
            if (isMovingRight) {
                camera.translateX(speed);
            }
            if (isJumping) {
                camera.translateY(speed);
            }
            if (isCrouching) {
                camera.translateY(-speed);
            }
            if (isAutoRun) {
                camera.translateZ(-0.02);
            }
        }

        if (isPlaying) {
            if (elapsed > 5) {
                elapsed = 0;
                mustResetCamera = true;
                currentScene = (currentScene + 1) % scenes.length;
            }
            elapsed += 0.01;
        }

        time += 0.01;
    }
};

// You can use the VREffect wrapper to enable virtual reality to your projects