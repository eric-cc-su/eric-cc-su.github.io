/**
 * Created by Eric on 5/7/2015.
 */
var screenheight = window.innerHeight;   //measures the height of the user's screen

//calculate the heights of page divs and positioning of text elements
var calculate_win = function() {
    var foot = document.getElementById("footer_wrap");
    var lpg = document.getElementsByClassName("page-landing")[0];
    foot.style.top = lpg.clientHeight.toString() + "px";

    if (window.innerHeight < 600) { //only resize elements if screen is of appropriate height (reduces f**k-ups)
        return;
    }

    var landing = document.getElementById("homecenter");
    var mn = document.getElementById("maincontain");
    screenheight = window.innerHeight;

    foot.style.top = screenheight.toString() + "px";
    landing.style.marginTop = ((0.25*screenheight)-60) + "px";

    var reqheight = landing.scrollHeight + 60 + ((0.25*screenheight)-60);
    lpg.style.height = reqheight.toString() + "px";
    mn.style.height = reqheight.toString() + "px";
    if (screenheight > reqheight) {
        lpg.style.height =  screenheight.toString() + "px";
        mn.style.height =  screenheight.toString() + "px";
    }
};

var main = function() {
    screenheight = window.innerHeight;
    try {
        calculate_win(); //initialize sizes
    }
    catch(err) {}

    //recalculate on window resize
    window.onresize = function() {
        try {
            calculate_win();
        }
        catch(err) {}
    };
};

$(document).ready(main);