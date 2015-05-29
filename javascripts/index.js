/**
 * Created by Eric on 5/7/2015.
 * Firefox detection taken from stackoverflow.com by user rob-w
 * http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
 * http://stackoverflow.com/users/938089/rob-w
 */
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var screenheight = window.innerHeight;   //measures the height of the user's screen

//calculate the heights of page divs and positioning of text elements
var calculate_win = function() {
    var lpg = document.getElementById("landing");
    var mn = document.getElementById("maincontain");
    screenheight = window.innerHeight;

    var landing = document.getElementById("homecenter");
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
    calculate_win(); //initialize sizes

    //recalculate on window resize
    window.onresize = function() {
        calculate_win();
    };

    window.onscroll = function() {
        console.log(isFirefox);
        var fork = $('#forkme_banner');
        var nvb = $('#navb');
        if ($(window).scrollTop() != 0) {
            nvb.stop().animate( {backgroundColor:'#FFF'}, {duration:300});
            nvb.css("box-shadow", "0 0 10px rgba(0,0,0,0.5)");
            $('.nav > li > a').css({color:'#60695C'}, {duration:300});
            fork.stop().animate( {height: '60px', borderRadius: "0", right: "0"}, {duration:300});
            fork.css("box-shadow","none");
            if (isFirefox) {
                $('#forkme_banner > p').css('margin', "10px 0");
            }
            else {
                $('#forkme_banner > p').animate( {margin: "10px 0"}, {duration:300});
            }
        }
        else {
            nvb.stop().animate( {backgroundColor:"transparent"}, {duration:300});
            nvb.css("box-shadow", "none");
            $('.nav > li > a').css({color:''}, {duration:300});
            fork.stop().animate( {height: '44px', borderRadius: "0 0 2px 2px", right: "10px"}, {duration:300});
            fork.css("box-shadow", "0 0 10px rgba(0,0,0,0.5)");
            if (isFirefox) {
                $('#forkme_banner > p').css('margin', "0");
            }
            else {
                $('#forkme_banner > p').animate( {margin: "0"}, {duration:300});
            }
        }
    };
};

$(document).ready(main);