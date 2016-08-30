angular.module('soap-client-ui', [
    //modulos principais
    'ngRoute','ngTouch', 'ngAnimate', 'ngMaterial', 'comum-ui',

    //serviços
    //-------------
    'data','utilService',

    //filtros
    //-------------
    'defaultFilters',

    //diretivas
    //-------------

    //sub-modulos
    'page','usuario'

]);

//filtros
angular.module('defaultFilters',[]);

//Serviços
angular.module('utilService', []);
angular.module('data', []);

//sub-modulos
angular.module('page', ['data']);
angular.module('usuario', []);
angular.module('comum-ui', []);
