angular.module('MeanHotel', ['ngRoute'])
    .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/hotel-list/hotels.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })
            .when('/hotel/:hotelId', {
                templateUrl: 'templates/hotel.html',
                controller: 'HotelController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
