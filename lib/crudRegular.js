/**
 * Implements CRUD operations on regular MongoDB
 * collections, i.e. without GridFS functionality.
 *
 * @author Andreas Willems
 * @version 26 MAY 2015
 */
var logger = require('../helpers/logger');

exports.create = function(obj, collection, callback) {
    collection.insertOne(obj, function(err, doc) {
        // on error propagate the error
        if (err) {
            logger(err);
            return callback(err);
        }
        // otherwise return the stored document's id
        callback(doc.ops[0]._id);
    });
};

exports.read = function(criteria, collection, callback) {
    collection.find(criteria).toArray(function(err, docs) {
        if (err) {
            logger(err);
            return callback(err);
        }
        callback(docs[0]);
    });
};

exports.readAll = function(collection, callback) {
    collection.find().toArray(function(err, docs) {
        if (err) {
            logger(err);
            return callback(err);
        }
        callback(docs);
    });
};

exports.update = function(criteria, obj, collection, callback) {
    collection.findOneAndReplace(criteria, obj, function(err, result) {
        if (err) {
            logger('MongoCrud.update(): ' + err);
            return callback(err);
        }
        logger('MongoCrud.update(): ' + result);
        callback(result);
    });
};

exports.delete = function(criteria, collection, callback) {
    collection.findOneAndDelete(criteria, function(err, result) {
        if (err) {
            logger('MongoCrud.delete(): ' + err);
            callback(err);
        }
        logger('MongoCrud.delete(): ' + result);
        callback(result);
    });
};