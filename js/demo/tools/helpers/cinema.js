function buildCinema(scene, groundMaterial, armchairMaterial, screenMaterial) {

    var wallGeometry = new THREE.BoxGeometry(1, 40, 50);
    var wallMaterial = new THREE.MeshLambertMaterial({color: 0x222222});

    var leftWallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWallMesh.position.z = -20;
    leftWallMesh.position.x = -20;
    leftWallMesh.position.y = 0;
    scene.add(leftWallMesh);

    var rightWallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
    rightWallMesh.position.z = -20;
    rightWallMesh.position.x = 20;
    rightWallMesh.position.y = 0;
    scene.add(rightWallMesh);

    var screenWallGeometry = new THREE.BoxGeometry(40, 7, 2);

    var screenWallMesh = new THREE.Mesh(screenWallGeometry, wallMaterial);
    screenWallMesh.position.z = -40;
    screenWallMesh.position.x = 0;
    screenWallMesh.position.y = -14;
    scene.add(screenWallMesh);

    var groundGeometry = new THREE.BoxGeometry(40, 1, 50);

    var groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.position.z = -20;
    groundMesh.position.x = 0;
    groundMesh.position.y = -11;
    groundMesh.rotation.x = -0.22;
    scene.add(groundMesh);

    var groundMeshEnd = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMeshEnd.position.z = -20;
    groundMeshEnd.position.x = 0;
    groundMeshEnd.position.y = -13;
    scene.add(groundMeshEnd);

    var ceilingMaterial = new THREE.MeshBasicMaterial({color: 0x333333});
    var ceilingMesh = new THREE.Mesh(groundGeometry, ceilingMaterial);
    ceilingMesh.position.z = -20;
    ceilingMesh.position.x = 0;
    ceilingMesh.position.y = 11;
    scene.add(ceilingMesh);

    var screenGeometry = new THREE.PlaneGeometry(40, 22, 1, 1);
    var screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.z = -40;
    screenMesh.position.x = 0;
    screenMesh.position.y = 0;
    scene.add(screenMesh);

    for (var x = -10; x <= 10; x += 1.5) {
        for (var z = -20; z <= 0; z += 2) {
            var seat = buildSeat(armchairMaterial);

            seat.position.x = x;
            seat.position.y = -5.4 + z / 4.4;
            seat.position.z = z;

            seat.scale.z = 0.7;
            seat.scale.y = 0.8;
            seat.scale.x = 0.8;

            scene.add(seat);
        }
    }

}