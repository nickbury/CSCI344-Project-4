/*jslint indent:4*/

var worker = function (trackedWords) {
    var twitter = require("ntwitter");
    var redis = require("redis");
    var credentials = require("./credentials.js");
                                                                                                                                                                                                                     
    var client = redis.createClient();

    var t = new twitter({
        consumer_key: credentials.consumer_key,
        consumer_secret: credentials.consumer_secret,
        access_token_key: credentials.access_token_key,
        access_token_secret: credentials.access_token_secret
    });

    t.stream(
        'statuses/filter',
        { track: trackedWords },
        function (stream) {
            stream.on("data", function (tweet) {
                trackedWords.forEach(function (word) {
                    if (tweet.text.indexOf(word) > -1) {
                        client.incr(word);
                    }
                })
            });
        }
    );
};

module.exports = worker;