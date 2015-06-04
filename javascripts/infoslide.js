/**
 * Created by Eric on 5/7/2015.
 */
var screenheight = window.innerHeight;   //measures the height of the user's screen

//calculate the heights of page divs
var calculate_win = function() {
    screenheight = window.innerHeight;

    var landing = $(".page-landing:first");
    var content = $("#homecenter");
    var difference = landing.outerHeight() - content.outerHeight();

    if (screenheight >= landing.outerHeight(true)){
        landing.css("height", screenheight.toString() + "px");
        content.css({
            "margin-top": (difference-60).toString() + "px",
            "margin-bottom": difference.toString() + "px"
        });

    }
    else {
        landing.css("height","inherit");
        content.css({
            "margin-top":"",
            "margin-bottom":""
        });

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