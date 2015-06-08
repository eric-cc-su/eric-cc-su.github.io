/**
 * Created by Eric on 5/7/2015.
 */
var screenheight = window.innerHeight;   //measures the height of the user's screen

//calculate the heights of page divs
var calculate_win = function() {
    screenheight = window.innerHeight;

    var landing = $('.landing:first');

    if (screenheight > landing.outerHeight()) {
        var diff2 = (screenheight - landing.height())/2;
        landing.css("height", screenheight.toString() + "px");
        if (window.innerWidth > 768 && (diff2 - 60) > 60) {
            landing.css("padding-top", (diff2 - 60).toString() + "px");
        }
    }
};

var main = function() {
    screenheight = window.innerHeight;
    calculate_win();

    //recalculate on window resize
    window.onresize = function() {
        calculate_win();
    };
};

$(document).ready(main);