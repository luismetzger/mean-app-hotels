angular.module('MeanHotel')
    .factory('HotelFactory', HotelFactory);

function HotelFactory($http) {
    return {
        getAllHotels: getAllHotels,
        getOneHotel: getOneHotel,
        postReview: postReview
    };

    function getAllHotels() {
        return $http
                .get('http://localhost:3000/api/hotels')
                .then(complete)
                .catch(failed);
    }

    function getOneHotel(hotelId) {
        return $http
                .get('http://localhost:3000/api/hotels/' + hotelId)
                .then(complete)
                .catch(failed);
    }

    function postReview(hotelId, review) {
        return $http
            .post('http://localhost:3000/api/hotels/' + hotelId + '/reviews', review)
            .then(complete)
            .catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.statusText;
    }
}
