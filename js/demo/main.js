var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.cullFace = THREE.CullFaceBack;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0xFFFFFF);
document.body.appendChild(renderer.domElement);

var scenes = [];
var currentScene = 0;

function render() {
    requestAnimationFrame(render);

    var scene = scenes[currentScene];

    if (scene) {
        DemoControls.vrEffect.render(scene, camera);
        DemoControls.handleControls(scene);
    }

}

render();

// To see something you only need
// - a renderer
// - a camera
// - a scene to render

// Real time rendering uses the usual requestAnimationFrame function