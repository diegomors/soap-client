(function () {
    var app = angular.module('soap-client-ui');
    app.directive('longPress', function ($timeout) {
    return {
        restrict: 'A',
        //template: '<div ng-transclude></div>{{message}}',
        link: function(scope, element, attrs, ctrl) {
        var timeout = null
        scope.message = "Don't press me to hard"
        element.bind('mousedown', function (e) {
            timeout = $timeout(function(){
            scope.message = "Ouch"
            console.log('long press')
            }, 500)
            
     
        })
        element.bind('mouseup', function (e) {
            timeout = null
        })
        }
    }
    });
})();