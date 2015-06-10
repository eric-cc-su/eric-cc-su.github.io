/**
 * Created by Eric on 5/29/2015.
 * Takes care of toolbar animation on scroll
 */

var main = function() {
    var nvb = $('#navb');
    var nvb_orig_height = Number(nvb.css('height').replace("px",""));
    window.onscroll = function() {
        var nehid= document.getElementById('naveric');

        if (document.getElementById('navb').className != "navbar navbar-static-top"){
            if ($(window).scrollTop() != 0) {
                if ($(window).clientWidth < 768){
                    nehid.hidden = false;
                }
                nvb.css({
                    "background-color": "#FFF",
                    "box-shadow": "0 0 10px rgba(0,0,0,0.5)"
                });
                $('.navtext').css('color','#60695C');
                $('.icon-bar').css('background-color','#60695C');
            }
            else {
                var nvb_height = Number(nvb.css('height').replace("px",""));
                if (nvb_height <= nvb_orig_height) {
                    if ($(window).clientWidth < 768){
                        nehid.hidden = true;
                    }
                    nvb.css({
                        "background-color": "",
                        "box-shadow": "none"
                    });
                    $('.navtext').css('color','');
                    $('.icon-bar').css('background-color','');
                }
            }
        }
    };

    $('button[class="navbar-toggle collapsed"]').on('click', function() {
        var navb = $('#navb');
        try {
            var nehid= document.getElementById('naveric');
                if ($(window).scrollTop() == 0) {
                    if (nehid.hidden) {
                        nehid.hidden = false;
                    }
                    else {
                        nehid.hidden = true;
                    }
                }
        }
        catch(err){}

        if ($('#navco').css('display') == 'none') {
            navb.css('background-color','#FFF');
            navb.css("box-shadow", "0 0 10px rgba(0,0,0,0.5)");
            $('.navtext').css('color','#60695C');
            $('.icon-bar').css('background-color','#60695C');
        }
        else {
            if ($(window).scrollTop() == 0) {
                navb.stop().animate({backgroundColor:"transparent"}, {duration:300});
                navb.css("box-shadow", "none");
                $('.navtext').css('color','');
                $('.icon-bar').css('background-color','');
            }
        }
    })
};

$(document).ready(main);