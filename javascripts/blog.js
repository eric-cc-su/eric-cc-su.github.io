/**
 * Created by eric on 5/30/15.
 */
var calc_foot = function() {
    var foot = document.getElementById("footer_wrap");
    var jumbo = document.getElementById('maincontain');
    var foot_off = foot.firstElementChild.offsetHeight;
    foot.style.bottom = "0";
    if (window.innerHeight >= (jumbo.clientHeight + 100)) {
        foot.style.top = (window.innerHeight - foot_off).toString() + "px";
    }
    else {
        foot.style.top = jumbo.clientHeight.toString() + "px";
    }
};

var main = function() {
    calc_foot();
    window.onresize = function() {
        calc_foot();
    }
};

$(document).ready(main);