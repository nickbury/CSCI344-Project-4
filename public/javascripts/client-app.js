/*jslint indent:4 plusplus:true*/
/*global $, document, alert */

var main = function () {
    var happyTotal = 0,
        sadTotal = 0,
        happyWidth,
        sadWidth,
        happyWords = [],
        sadWords = [];

    $.getJSON("/happyCounts.json", function (response) {
        response.forEach(function (result) {
            happyTotal = happyTotal + JSON.parse(result.value);
            happyWords.push(" " + result.key);
        });
    });

    $.getJSON("/sadCounts.json", function (response) {
        response.forEach(function (result) {
            sadTotal = sadTotal + JSON.parse(result.value);
            sadWords.push(" " + result.key);
            happyWidth = (happyTotal / (happyTotal + sadTotal)) * 100;
            sadWidth = 100 - happyWidth;
            $(".happy").width(happyWidth + '%');
            $(".sad").width(sadWidth + '%');
            $("#happyCount").html(happyTotal);
            $("#sadCount").html(sadTotal);
        });
    });

    $(".happy").click(function (event) {
        alert(happyWords);
    });

    $(".sad").click(function (event) {
        alert(sadWords);
    });

};

$(document).ready(main);