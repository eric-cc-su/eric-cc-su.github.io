/**
 * Created by Eric on 5/29/2015.
 * Takes care of toolbar animation on scroll
 */

var main = function() {
    var navopen = false;

    window.onscroll = function() {
        var nvb = $('#navb');
        var nvb_orig_height = Number(nvb.css('height').replace("px",""));

        if (document.getElementById('navb').className != "navbar navbar-static-top"){
            if ($(window).scrollTop() != 0) {
                if (window.innerWidth < 768){
                    try{
                        document.getElementById('naveric').hidden = false;
                    }
                    catch(err){}
                }
                nvb.css({
                    "background-color": "#FFF",
                    "box-shadow": "0 0 10px rgba(0,0,0,0.5)"
                });
                $('.navtext').css('color','#60695C');
                $('.icon-bar').css('background-color','#60695C');
            }
            else if (navopen == false){
                var nvb_height = Number(nvb.css('height').replace("px",""));
                if (window.innerWidth < 768){
                    try{
                        document.getElementById('naveric').hidden = true;
                    }
                    catch(err){}
                }
                if (nvb_height <= nvb_orig_height) {
                    nvb.css({
                        "background-color": "",
                        "box-shadow": "none"
                    });
                    $('.navtext').css('color','');
                    $('.icon-bar').css('background-color','');
                }
            }
            else {
                console.log(navopen);
            }
        }
    };

    $('button[class="navbar-toggle collapsed"]').on('click', function() {
        var navb = $('#navb');

        if ($('#navco').css('display') == 'none') {
            navopen = true;
            try{
                document.getElementById('naveric').hidden = false;
            }
            catch(err){}
            navb.css('background-color','#FFF');
            navb.css("box-shadow", "0 0 10px rgba(0,0,0,0.5)");
            $('.navtext').css('color','#60695C');
            $('.icon-bar').css('background-color','#60695C');
        }
        else {
            if ($(window).scrollTop() == 0) {
                navopen = false;
                try{
                    document.getElementById('naveric').hidden = true;
                }
                catch(err){}
                navb.stop().animate({backgroundColor:"transparent"}, {duration:300});
                navb.css("box-shadow", "none");
                $('.navtext').css('color','');
                $('.icon-bar').css('background-color','');
            }
        }
    })
};

$(document).ready(main);
