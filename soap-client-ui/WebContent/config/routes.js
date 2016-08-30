if(config==undefined)var config={};

config.routes=function ($routeProvider) {
    //$locationProvider.html5Mode(false);
    //$httpProvider.interceptors.push( pservicosInterceptor );

    $routeProvider.
        when('/', {
            templateUrl: 'views/home.html',
            caseInsensitiveMatch: true
        }).
        when('/usuarios', {
            templateUrl: 'views/usuario/listagem.html',
            caseInsensitiveMatch: true
        }).
        when('/usuario/', {
            templateUrl: 'views/usuario/cadastro.html',
            caseInsensitiveMatch: true
        }).
        when('/usuario/:id', {
            templateUrl: 'views/usuario/cadastro.html',
            caseInsensitiveMatch: true
        }).
        otherwise({
            //templateUrl: 'views/404.html',
            template: "<div>página não encontrada</div>",
        });
};
