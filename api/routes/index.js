var express = require('express');
var router = express.Router();
var ctrlHotels = require('../controllers/hotels.controllers.js');

// GET - All hotels
router
    .route('/hotels')
        .get(ctrlHotels.hotelsGetAll);

// GET - A hotel
router
    .route('/hotels/:hotelId')
        .get(ctrlHotels.hotelsGetOne);

// POST - a new hotel
router
    .route('/hotels/new')
        .post(ctrlHotels.hotelsAddOne);


module.exports = router;
