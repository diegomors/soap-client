var app = angular.module('soap-client-ui');

app.
config(function ($routeProvider, $locationProvider,$httpProvider, $mdThemingProvider, $sceDelegateProvider){
    config.routes($routeProvider);


    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://localhost:8001/comum-ui/**'
      ]);

    $mdThemingProvider.theme('default')
    .primaryPalette('blue', {'default': '800'})
    .accentPalette('grey');
}).
run(['$location','$rootScope', function($location,$rootScope) {
    //configurando localização do momentjs
    moment.locale('pt-br');

    //acionando evento de inciação
    $rootScope.$broadcast('appInitSucess');
    console.log('Iniciou angular!')
}]);
