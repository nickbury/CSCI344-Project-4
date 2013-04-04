/*jslint indent:4*/

var worker = function (trackedWords) {
    var Twitter = require("ntwitter"),
        redis = require("redis"),
        credentials = require("./credentials.js"),
        client = redis.createClient(),
        i;

    var t = new Twitter({
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
                for (i = 0; i < trackedWords.length; i++) {
                    if (tweet.text.indexOf(trackedWords[i]) > -1) {
                        client.incr(trackedWords[i]);
                    }
                }
            });
        }
    );
};

module.exports = worker;