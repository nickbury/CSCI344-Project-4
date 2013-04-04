/*jslint indent:4*/

var express = require("express"),
    http = require("http"),
    path = require("path"),
    redisClient = require("redis").createClient(),
    app = express(),
    twitterWorker = require("./twitter.js");

app.configure(function () {
    app.use(express.static(path.join(__dirname, 'public')));
});

var happyWords = ["awesome", "great", "good", "sunshine", "unicorns"];
var sadWords = ["lame", "horrible", "sad", "troll", "depressed"];

twitterWorker(happyWords);
twitterWorker(sadWords);

http.createServer(app).listen(3000, function () {
    console.log("Express server listening on port 3000");
});

app.get("/", function (req, res) {
    //send "Hello World" to the client as html
    res.send("Hello World!");
});

app.get("/happyCounts.json", function (req, res) {
    var jsonObject = [], i;
    redisClient.mget(happyWords, function (error, results) {
        if (error !== null) {
            // handle error here
            console.log("ERROR: " + error);
        } else {
            for (i = 0; i < results.length; i++) {
                var key = happyWords[i];
                jsonObject.push({
                    key: results[i]
                });
            }
            res.json(jsonObject);
        }
    });
});

app.get("/sadCounts.json", function (req, res) {
    var jsonObject = [], i;
    redisClient.mget(sadWords, function (error, results) {
        if (error !== null) {
            // handle error here
            console.log("ERROR: " + error);
        } else {
            for (i = 0; i < results.length; i++) {
                var key = sadWords[i];
                jsonObject.push({
                    key: results[i]
                });
            }
            // use res.json to return JSON objects instead of strings
            res.json(jsonObject);
        }
    });
});