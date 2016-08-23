angular.module('MeanHotel')
    .controller('HotelController', HotelController);

    function HotelController($route, $routeParams, HotelFactory) {
        var vm = this;
        var hotelId = $routeParams.hotelId;
        HotelFactory.getOneHotel(hotelId)
            .then(function(response) {
                vm.hotel = response;
                vm.stars = _getStarRating(response.stars);
            });

            // Turn object of stars in to Array
            function _getStarRating(stars) {
                return new Array(stars);
            }

            // Add review function
            vm.addReview = function() {
                var postData = {
                    name: vm.name,
                    rating: vm.rating,
                    review: vm.review
                };
                if (vm.reviewForm.$valid) {
                    HotelFactory.postReview(hotelId, postData)
                        .then(function(response) {
                            $route.reload();
                        })
                        .catch(function(error) {
                            console.log(error);
                        });

                } else {
                    vm.isSubmitted = true;
                }
            }
    }
