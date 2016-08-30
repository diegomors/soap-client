
(function () {
    app = angular.module("data");

    app.service("ngYdn", function () {
        this.db = new ydn.db.Storage(config.db.name, {stores: config.db.stores});
    });
})();