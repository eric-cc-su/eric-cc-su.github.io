/**
 * Created by Eric on 5/29/2015.
 * Firefox detection taken from stackoverflow.com by user rob-w
 * http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
 * http://stackoverflow.com/users/938089/rob-w
 */
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+

var main = function() {
    window.onscroll = function() {
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