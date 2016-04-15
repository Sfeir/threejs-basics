var ShadersManager = new function () {

    var manager = this;

    this.programs = {};

    this.load = function loadShader(name, url) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.addEventListener('load', function () {
                manager.programs[name] = request.responseText;
                resolve();
            });
            request.send();
        });
    }


};