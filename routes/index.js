var express = require('express');
var router = express.Router();
var redis = require("redis");

var subscriber = redis.createClient(); // gets commands and executes function
var publisher = redis.createClient(); // publishes commands

/**
 * Nucleus function 
 * @details: Main and initial function of the file 
 * @returns {void}
 */
function init() {
    redisConnectionTest(); // tesing if connection is set with redis
    subscribersAction(); // initialize subscriber actions
}

/**
 * Checking conneciton establishment with redis 
 * @params {} 
 * @returns {void}
 */
function redisConnectionTest() {
    /**
     * subscriber connection test 
     * @params {params} 
     * @returns {logs string}
     */
    subscriber.on("connect", function() {
        console.log('subscriber connected');
    }, function(err) {
        console.log('subscriber not connected with code ' + err);
    });
    /**
     * publisher connection test 
     * @params {params} 
     * @returns {logs string}
     */
    publisher.on("connect", function() {
        console.log('publisher connected');
    }, function(err) {
        console.log('publisher not connected with code ' + err);
    });
}
/**
 * Making ready subscriber to subscribe and execute actions 
 * @params {} 
 * @returns {void}
 */
function subscribersAction() {
    subscriber.subscribe("test");
    subscriber.on("message", function(channel, message) {
        console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
    });
}


/**
 * Main route function which handles request 
 * @params {params} 
 * @returns {returns}
 */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    // res.json({ name: 'hello' });
    publisher.publish("test", "hello");
    //res.send(getAll());
});

/**
 * Getting all data of list 
 * @params {} 
 * @returns {list}
 */
function getAll() {
    return [{
        Name: 'customer1',
        Salutation: 'Mr',
        Company: 'Selise'
    }, {
        Name: 'customer2',
        Salutation: 'Mr',
        Company: 'Selise1'
    }, {
        Name: 'customer3',
        Salutation: 'Mr',
        Company: 'Selise2'
    }, {
        Name: 'customer4',
        Salutation: 'Mr',
        Company: 'Selise3'
    }]
}

module.exports = router;