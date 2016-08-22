var hotelData = require('../data/hotel-data.json');


// Controller function to get all hotel json data
module.exports.hotelsGetAll = function(req, res) {
    console.log("GET the hotels");
    console.log(req.query);

    var offset = 0;
    var count = 5;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        offset = parseInt(req.query.offset, 10);
    }

    var returnData = hotelData.slice(offset, offset + count);

    res
        .status(200)
        .json(returnData);
};


// Controller function to get one hotel json data
module.exports.hotelsGetOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var thisHotel = hotelData[hotelId];
    console.log("GET hotelId ", hotelId);
    res
        .status(200)
        .json(thisHotel);
};

// Controller function to create a new hotel
module.exports.hotelsAddOne = function(req, res) {
    console.log("POST new hotel");
    console.log(req.body);
    res
        .status(200)
        .json(req.body);
};
