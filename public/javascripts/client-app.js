/*jslint indent:4*/
/*global $, document */

var main = function () {
    var happyTotal = 0,
        sadTotal = 0,
        happyWidth,
        sadWidth;

    $.getJSON("/happyCounts.json", function (response) {
        response.forEach(function (result) {
            happyTotal = happyTotal + JSON.parse(result.value);
        });
    });

    $.getJSON("/sadCounts.json", function (response) {
        response.forEach(function (result) {
            sadTotal = sadTotal + JSON.parse(result.value);
            happyWidth = (happyTotal / (happyTotal + sadTotal)) * 100;
            sadWidth = 100 - happyWidth;
            $(".happy").width(happyWidth + '%');
            $(".sad").width(sadWidth + '%');
            $("#happyCount").html(happyTotal);
            $("#sadCount").html(sadTotal);
        });
    });

};

$(document).ready(main);