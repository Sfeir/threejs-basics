function buildCatPedestal(cat, maximumScore, font) {

    var catPicturePedestal = new THREE.Group();

    var score = (cat.score / maximumScore) * 1.618;

    var scoreMaterial = new THREE.MeshPhongMaterial({color: 0xE84F0E});
    var scoreGeometry = new THREE.BoxGeometry(0.1, score, 0.1);
    var scoreMesh = new THREE.Mesh(scoreGeometry, scoreMaterial);
    scoreMesh.position.x = -0.4;
    scoreMesh.position.y = score / 2 - 1.618 / 2.0;
    scoreMesh.position.z = 0.5;
    catPicturePedestal.add(scoreMesh);
    catPicturePedestal.score = scoreMesh;

    var catInfoLabelMaterial = new THREE.MeshPhongMaterial({color: 0xE84F0E});

    var catGenderLabelGeometry = new THREE.TextGeometry(cat.gender, {
        font: font,
        size: 0.15,
        height: 0.025
    });
    var catGenderLabelMesh = new THREE.Mesh(catGenderLabelGeometry, catInfoLabelMaterial);
    catGenderLabelMesh.position.x = -0.3;
    catGenderLabelMesh.position.y = 0.2;
    catGenderLabelMesh.position.z = 0.5;
    catPicturePedestal.add(catGenderLabelMesh);
    catPicturePedestal.gender = catGenderLabelMesh;

    var catAge = cat.age + " year" + (cat.age > 1 ? "s" : "");
    var catAgeLabelGeometry = new THREE.TextGeometry(catAge, {
        font: font,
        size: 0.15,
        height: 0.025
    });
    var catAgeLabelMesh = new THREE.Mesh(catAgeLabelGeometry, catInfoLabelMaterial);
    catAgeLabelMesh.position.x = -0.3;
    catAgeLabelMesh.position.y = 0.4;
    catAgeLabelMesh.position.z = 0.5;
    catPicturePedestal.add(catAgeLabelMesh);
    catPicturePedestal.age = catAgeLabelMesh;


    var pedestalMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
    var pedestalGeometry = new THREE.BoxGeometry(1, 1.618, 1);
    var pedestalMesh = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
    catPicturePedestal.add(pedestalMesh);

    var catNameLabelMaterial = new THREE.MeshBasicMaterial({
        color: 0x333333
    });
    var catNameLabelGeometry = new THREE.TextGeometry(cat.name, {
        font: font,
        size: 0.2,
        height: 0.025
    });
    catNameLabelGeometry.center();
    var catNameLabelMesh = new THREE.Mesh(catNameLabelGeometry, catNameLabelMaterial);
    catNameLabelMesh.position.y = 1.618 - 0.7;
    catNameLabelMesh.position.z = 0.5;
    catPicturePedestal.add(catNameLabelMesh);

    var catPictureTexture = new THREE.TextureLoader().load("textures/cats/" + cat.picture);
    var catPictureGeometry = new THREE.PlaneGeometry(1, 1, 1);
    var catPictureMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: catPictureTexture,
        transparent: true,
        opacity: 0.95
    });
    var catPictureMesh = new THREE.Mesh(catPictureGeometry, catPictureMaterial);
    catPictureMesh.position.y = 1.618;
    catPicturePedestal.add(catPictureMesh);

    var frameMaterial = new THREE.MeshPhongMaterial({color: 0x333333});
    var frameGeometry = new THREE.BoxGeometry(1, 0.05, 0.05);

    var frameTopMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    frameTopMesh.position.y = 1.618 + 0.5;
    catPicturePedestal.add(frameTopMesh);

    var frameBottomMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    frameBottomMesh.position.y = 1.618 - 0.5;
    catPicturePedestal.add(frameBottomMesh);

    var frameLeftMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    frameLeftMesh.position.x = -0.5;
    frameLeftMesh.position.y = 1.618;
    frameLeftMesh.rotation.z = Math.PI / 2.0;
    frameLeftMesh.scale.x = 1.05;
    catPicturePedestal.add(frameLeftMesh);

    var frameRightMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    frameRightMesh.position.x = 0.5;
    frameRightMesh.position.y = 1.618;
    frameRightMesh.rotation.z = Math.PI / 2.0;
    frameRightMesh.scale.x = 1.05;
    catPicturePedestal.add(frameRightMesh);

    //catPicturePedestal.

    return catPicturePedestal;
}