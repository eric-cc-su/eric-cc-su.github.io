/**
 * Created by Eric on 5/7/2015.
 */
var screenheight = window.innerHeight;   //measures the height of the user's screen

//calculate the heights of page divs
var calculate_win = function() {
    screenheight = window.innerHeight;

    var landing = [$('.landing:first'), $('.infoslide')];

    if (screenheight > landing[0].outerHeight()) {
        for (i=0; i<landing.length; i++) {
            var diff2 = (screenheight - landing[i].height())/2;
            landing[i].css("height", screenheight.toString() + "px");
            if (window.innerWidth > 768 && (diff2 - 60) > 60) {
                landing[i].css("padding-top", (diff2 - 60).toString() + "px");
            }
        }
    }
    else {
      $('.invisible-infoslide').css("height", (landing[0].outerHeight()).toString() + "px");
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
