/**
 * Created by Eric on 5/7/2015.
 */
var screenheight = window.innerHeight;   //measures the height of the user's screen

//calculate the heights of page divs
var calculate_win = function() {
    screenheight = window.innerHeight;

    var landing = [$('.landing:first'), $('.infoslide')];
    var smallScreenWidth = 768;
    var navbarHeight = 60;

    if (screenheight > landing[0].outerHeight()) {
        for (i=0; i<landing.length; i++) {
            var diff2 = (screenheight - landing[i].height())/3;
            landing[i].css("height", screenheight.toString() + "px");
            if (window.innerWidth > smallScreenWidth && (diff2 - navbarHeight) > navbarHeight) {
                landing[i].css("padding-top", (diff2 - navbarHeight).toString() + "px");
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
