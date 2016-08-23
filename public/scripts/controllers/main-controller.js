angular.module('MeanHotel')
    .controller('MainController', MainController);


    function MainController(HotelFactory) {
        var vm = this;
        vm.title = 'MEAN Hotel App'

        HotelFactory.getAllHotels()
            .then(function(response) {
                vm.hotels = response;
            });

    }
