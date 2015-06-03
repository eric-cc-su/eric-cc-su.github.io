/**
 * Created by Eric on 5/29/2015.
 * Takes care of toolbar animation on scroll
 */

var main = function() {
    var fork_banner = true;
    var check_fork = function() {
        if (window.innerWidth < 768) {
            $('#forkme_banner').css("display","none");
            fork_banner = false;
        }
    };

    check_fork();
    window.onresize = function() {
        check_fork();
    };

    window.onscroll = function() {
        var fork = $('#forkme_banner');
        var nvb = $('#navb');
        if ($(window).scrollTop() != 0) {
            nvb.stop().animate( {backgroundColor:'#FFF'}, {duration:300});
            nvb.css("box-shadow", "0 0 10px rgba(0,0,0,0.5)");
            $('.navtext').css('color','#60695C');
            $('.icon-bar').css('background-color','#60695C');
            if (fork_banner) {
                fork.stop().animate( {height: '61px', right: "0"}, {duration:300});
                fork.css({
                    "box-shadow": "none",
                    "border-radius": "0"
                });
                $('#forkme_banner > p').css('margin', "10px 0");
            }
        }
        else {
            nvb.stop().animate( {backgroundColor:"transparent"}, {duration:300});
            nvb.css("box-shadow", "none");
            $('.navtext').css('color','');
            $('.icon-bar').css('background-color','');
            if (fork_banner) {
                fork.stop().animate( {height: '44px', right: "10px"}, {duration:300});
                fork.css({
                    "box-shadow": "",
                    "border-radius": ""
                });
                $('#forkme_banner > p').css('margin', "0");
            }
        }
    };

    $('button[class="navbar-toggle collapsed"]').on('click', function() {
        var navb = $('#navb');
        if ($('#navco').css('display') == 'none') {
            navb.css('background-color','#FFF');
        }
        else {
            if ($(window).scrollTop() == 0) {
                navb.stop().animate({backgroundColor:"transparent"}, {duration:300});
            }
        }
    })
};

$(document).ready(main);