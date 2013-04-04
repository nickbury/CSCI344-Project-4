/*jslint indent:4*/

var worker = function () {
    var twitter = require("ntwitter");
    var redis = require("redis");
    var credentials = require("./credentials.js");

    //create redis client                                                                                                                                                                                                                       
    var client = redis.createClient();

    var t = new twitter({
        consumer_key: credentials.consumer_key,
        consumer_secret: credentials.consumer_secret,
        access_token_key: credentials.access_token_key,
        access_token_secret: credentials.access_token_secret
    });

    t.stream(
        'statuses/filter',
        { track: ["awesome", "cool", "rad"] },
        function (stream) {
            stream.on("data", function (tweet) {
                console.log(tweet.text);
                //if awesome is in the tweet text, increment the counter                                                                                                                                                                        
                if (tweet.text.indexOf("awesome") > -1) {
                    client.incr("awesome");
                }
            });
        }
    );
};

module.exports = worker;