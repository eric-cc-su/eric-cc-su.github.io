/**
 * Created by eric on 5/30/15.
 */
var calc_foot = function() {
    var foot = document.getElementById("footer_wrap");
    var foot_off = foot.firstElementChild.offsetHeight;
    foot.style.bottom = "0";
    foot.style.top = (window.innerHeight - foot_off).toString() + "px";
};

var main = function() {
    calc_foot();
    window.onresize = function() {
        calc_foot();
    }
};

$(document).ready(main);