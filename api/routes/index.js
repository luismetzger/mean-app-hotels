var express = require('express');
var router = express.Router();
var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

// GET  and POST - All hotels
router
    .route('/hotels')
        .get(ctrlHotels.hotelsGetAll)
        .post(ctrlHotels.hotelsAddOne);

// GET - A hotel
router
    .route('/hotels/:hotelId')
        .get(ctrlHotels.hotelsGetOne);


// GET - All reviews
router
    .route('/hotels/:hotelId/reviews')
        .get(ctrlReviews.reviewsGetAll)
        .post(ctrlReviews.reviewsAddOne);


// GET - A review
router
    .route('/hotels/:hotelId/reviews/:reviewId')
        .get(ctrlReviews.reviewsGetOne);

module.exports = router;
