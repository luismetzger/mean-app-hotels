// var dbconn = require('../data/dbconnection.js');
// var ObjectId = require('mongodb').ObjectId;
// var hotelData = require('../data/hotel-data.json');
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


// Controller function to get all hotel json data
module.exports.hotelsGetAll = function(req, res) {

    // Get the connection from MongoDB using Mongo NPM package
    // var db = dbconn.get();
    // Define a new variable for the specific collection in MongoDB using Mongo NPM Package
    // var collection = db.collection('hotels');

    // Setup and allow searching via queries params
    var offset = 0;
    var count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    // end

    // Getting from Mongoose Model
    Hotel
      .find()
      .skip(offset)
      .limit(count)
      .exec(function(err, hotels) {
          console.log("Found hotels", hotels.length);
          res
            .json(hotels);
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
            res
              .status(200)
              .json(doc);
        });
};

// Controller function to create a new hotel
module.exports.hotelsAddOne = function(req, res) {
    // Get the connection from MongoDB
    var db = dbconn.get();
    // Define a new variable for the specific collection in MongoDB
    var collection = db.collection('hotels');
    // Creating a new empty variable for new hotel
    var newHotel;

    console.log("POST new hotel");


    // Check to confirm all keys have values in body or else return 400 error message
    if (req.body && req.body.name && req.body.stars) {
        newHotel = req.body;
        // Hotel star rating needs to be an integer in my DB, need to convert from string
        newHotel.stars = parseInt(req.body.stars, 10);

        // Using mongoDB method to POST my newHotel variable to body to DB
        collection.insertOne(newHotel, function(err, response) {
            console.log(response);
            console.log(response.ops);
            res
                .status(201)
                .json(response.ops);
        });

    } else {
        console.log("Data missing from body of hotelsDB");
        res
          .status(400)
          .json({"message": "Required data missing from body"});
    }


};
