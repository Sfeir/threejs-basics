var armchairBackGeometry = new THREE.BoxGeometry(1, 1, 0.2);
var armchairArmGeometry = new THREE.BoxGeometry(0.2, 1, 1);
var armchairSeatGeometry = new THREE.BoxGeometry(1, 0.2, 1);
var armchairSeatMaterial = new THREE.MeshLambertMaterial({color: 0x7C0000});

function buildSeat(seatMaterial) {

    var armchair = new THREE.Group();

    var armchairLeftArmMesh = new THREE.Mesh(armchairArmGeometry, seatMaterial);
    armchairLeftArmMesh.position.x = 0.5;
    armchairLeftArmMesh.position.z = -0.5;
    armchairLeftArmMesh.position.y = -0.5;

    var armchairRightArmMesh = new THREE.Mesh(armchairArmGeometry, seatMaterial);
    armchairRightArmMesh.position.x = -0.5;
    armchairRightArmMesh.position.z = -0.5;
    armchairRightArmMesh.position.y = -0.5;

    var armchairBackMesh = new THREE.Mesh(armchairBackGeometry, seatMaterial);
    armchairBackMesh.position.x = 0;
    armchairBackMesh.position.z = 0.1;
    armchairBackMesh.position.y = 0;

    var armchairSeatMesh = new THREE.Mesh(armchairSeatGeometry, armchairSeatMaterial);
    armchairSeatMesh.position.x = 0;
    armchairSeatMesh.position.z = -0.6;
    armchairSeatMesh.position.y = -0.5;

    armchair.add(armchairLeftArmMesh);
    armchair.add(armchairRightArmMesh);
    armchair.add(armchairBackMesh);
    armchair.add(armchairSeatMesh);

    return armchair;
}
