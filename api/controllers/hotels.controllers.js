// var dbconn = require('../data/dbconnection.js');
// var ObjectId = require('mongodb').ObjectId;
// var hotelData = require('../data/hotel-data.json');
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function (req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    // A geoJSON object
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };

    var geoOptions = {
        spherical: true,
        maxDistance: 2000,
        num: 5
    };

    Hotel
        .geoNear(point, geoOptions, function(err, results, stats) {
            console.log('Geo results: ', results);
            console.log('Geo stats', stats);
            res
                .status(200)
                .json(results);
        });
};

// Controller function to get all hotel json data
module.exports.hotelsGetAll = function(req, res) {

    // Get the connection from MongoDB using Mongo NPM package
    // var db = dbconn.get();
    // Define a new variable for the specific collection in MongoDB using Mongo NPM Package
    // var collection = db.collection('hotels');

    // Setup and allow searching via queries params
    var offset = 0;
    var count = 5;
    var maxCount = 10;

    if (req.query && req.query.lat & req.query.lng) {
        runGeoQuery(req, res);
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message": "If supplied in querystring count and offset should be numbers"
            });
        return;
    }
    // end

    // Checks for abuse max number of params allowed. Security so someone doesn't overload our server with query params i.e count=15
    if (count > maxCount) {
        res
          .status(400)
          .json({
              "message": "Count limit of " + maxCount + "exceeded"
          });
          return;
    }

    // Getting from Mongoose Model
    Hotel
      .find()
      .skip(offset)
      .limit(count)
      .exec(function(err, hotels) {
          if (err) {
              console.log("Error when finding hotels");
              res
                .status(200)
                .json(err);
          } else {
              console.log("Found hotels", hotels.length);
              res
                .json(hotels);
          }
      });

    // Getting collection date using Mongo NPM package
    // collection
    //     .find()
    //     .skip(offset)
    //     .limit(count)
    //     .toArray(function(err, docs) {
    //         console.log("Found the following hotels: ", docs);
    //         res
    //             .status(200)
    //             .json(docs);
    //     });


    // console.log("db in conroller is working on ", db);
    //
    // console.log("GET the hotels");
    // console.log(req.query);
    //
    // var returnData = hotelData.slice(offset, offset + count);
    //
    // res
    //     .status(200)
    //     .json(returnData);
};


// Controller function to get one hotel json data
module.exports.hotelsGetOne = function(req, res) {
    // Get the connection from MongoDB using Mongo NPM package
    // var db = dbconn.get();
    // Define a new variable for the specific collection in MongoDB using Mongo NPM Package
    // var collection = db.collection('hotels');

    var hotelId = req.params.hotelId;
    // var thisHotel = hotelData[hotelId];
    console.log("GET hotelId ", hotelId);

    // Find single document from mongoDB - Using the ObjectId helper from MongoDB from Mongo NPM Package only
    // collection
    //     .findOne({
    //         _id : ObjectId(hotelId)
    //     }, function(err, doc) {
    //         res
    //           .status(200)
    //           .json(doc);
    //     });

    // Getting from Mongoose Model
    Hotel
        .findById(hotelId)
        .exec(function(err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log("Error when finding hotel");
                  response.status = 500;
                  response.message = err;
            } else if (!doc) {
                  response.status = 404;
                  response.message = {
                      "message" : "Hotel ID not found"
                  };
            }
            res
              .status(response.status)
              .json(response.message);

        });
};

// Helper function to split an array
var _splitArray = function(input) {
    var output;
    if (input && input.length > 0) {
        output = input.split(", ");
    } else {
        output = [];
    }
    return output;
};

// Controller function to create a new hotel
module.exports.hotelsAddOne = function(req, res) {

    Hotel
        .create({
            name: req.body.name,
            description: req.body.description,
            stars: parseInt(req.body.stars, 10),
            services: _splitArray(req.body.services),
            photos: _splitArray(req.body.photos),
            currency: req.body.currency,
            location: {
                location: req.body.address,
                coordinates: [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
            }

        }, function(err, hotel) {
            if(err) {
                console.log("Error creating model");
                res
                  .status(400)
                  .json(err);
            } else {
                console.log("Hotel created", hotel);
                res
                  .status(201)
                  .json(hotel);
            }
        });



};
