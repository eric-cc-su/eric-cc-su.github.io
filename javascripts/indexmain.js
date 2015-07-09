/**
 * Created by Eric on 5/29/2015.
 * Takes care of toolbar animation on scroll
 */

var body_scroll_height;
var topslide;
var photo_dims = [[]];
var s_factor;
var windowheight = window.innerHeight;
var topslide_height = windowheight;

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// Thanks to http://davidwalsh.name/function-debounce
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

var calc_consts = function() {
    windowheight = window.innerHeight;
    topslide_height = topslide.clientHeight;
    s_factor = Math.round((windowheight/topslide_height)*100)/100;
    body_scroll_height = document.getElementById("index-body").scrollHeight - windowheight;

    //slide_photos
    var slide_photos = document.getElementsByClassName('photoslide');
    for (var p=0; p < slide_photos.length; p++) {
        var indiv_photo_dim = [slide_photos[p].offsetTop, slide_photos[p].clientHeight];
        if (slide_photos[p].offsetTop > 0){
            photo_dims.push(indiv_photo_dim);
        }
    }
    //end slide_photos
};

var calc_cphoto = function() {
    var photos = document.getElementsByClassName('photoslide');

    for (var i=0; i < photos.length; i++) {
        var child_img = photos[i].children[0];
        photos[i].style.height = (windowheight + 60).toString() + "px";

        var child_ar = child_img.naturalWidth/child_img.naturalHeight;
        var invisidiv = photos[i].nextSibling.nextSibling;


        if (window.innerWidth >= 500) {
            if ((window.innerWidth/(window.innerHeight+60)) >= child_ar) {
            photos[i].children[0].style.maxWidth = "100%";
            photos[i].children[0].style.maxHeight = "";
            }
            else {
                photos[i].children[0].style.maxWidth = "";
                photos[i].children[0].style.maxHeight = "100%";
            }
        }
        else {
            if (window.innerHeight < child_img.naturalHeight) {
                child_img.style.maxHeight = (window.innerHeight + 60).toString() + "px";
            }
            else {
                child_img.style.maxHeight = "100%";
            }
        }

        invisidiv.style.height = photos[i].style.height;
    }
};

function bcolor_transform(element, color) {
    element.style.backgroundColor = color;
}

var main = function() {
    $(window).scrollTop(0);
    window.addEventListener("resize", function() {
        calc_consts();
        calc_cphoto();
    });

    var nvb = $('#navb');

    var navopen = false;
    var trylast = 0;

    topslide = document.getElementById('home-top');
    var stickies = document.getElementsByClassName('sticky');

    var nav_min = function(color, minimize) {
        if (window.innerWidth >= 500) {
            var navbar = document.getElementById('navb');
            if (color == undefined) {
                color = "#FFF";
            }

            navbar.style.backgroundColor = color;

            if (minimize || minimize == undefined) {
                if (navbar.className.indexOf('navmin') < 0) {
                    navbar.className = navbar.className + " navmin";
                }
            }
            else {
                navbar.className = navbar.className.replace(" navmin", "");
            }
        }
    };

    var stickystart = 0;
    var brobar = document.getElementsByClassName('brogress-top')[0];

    window.onscroll = debounce(function() {
        var win_stop = $(window).scrollTop();
        var scroll_delta = win_stop - trylast;
        if (window.innerWidth >= 500) {
            //Progress bar
            var progress = (win_stop / body_scroll_height) * 100;
            brobar.style.width = progress.toString() + "%";

            //TopSlide stuff
            var ovalue = 1 - ((win_stop * 1.3) / topslide_height);
            var work_text = document.getElementById("work").children;
            if (ovalue >= 0) {
                topslide.style.opacity = ovalue.toString();
                for (var i = 0; i < work_text.length; i++) {

                }
            }
            else if (ovalue < 0) {
                console.log("negative");
                topslide.style.opacity = "0";
            }

            if (windowheight < topslide_height) {
                topslide.style.top = (-(win_stop * s_factor)).toString() + "px";
            }
            else {
                topslide.style.top = (-(win_stop * 0.4)).toString() + "px";
            }
            //End TopSlide

            if (document.getElementById('navb').className != "navbar navbar-static-top") {
                if (ovalue < 0) {
                    nav_min("#60695C");
                    bcolor_transform(brobar, "#F44336");
                    document.getElementById('home-top').style.display = "";
                    console.log("hello");
                    if (win_stop >= windowheight) {
                        document.getElementById('home-top').style.display = "none";
                    }
                }
                else if (navopen == false || win_stop <= windowheight - 80) {
                    nav_min("transparent", false);
                    nvb.css("box-shadow","none");
                    $('.navtext').css('color','');
                    $('.icon-bar').css('background-color','');

                    if (win_stop <= windowheight) {
                        bcolor_transform(brobar, "transparent");
                        document.getElementById('home-top').style.display = "";
                    }
                }
                else {
                    console.log(navopen);
                }
            }

            //stickies
            for (var s = 0; s < stickies.length; s++) {
                //fix load-on-photo-navbar-color bug step2
                for (var st = 0; st < photo_dims.length; st++) {
                    if (photo_dims[st][1] == stickies[s].children[0].naturalHeight) {
                        photo_dims[st][1] = stickies[s].clientHeight;
                    }
                }
                const stickytop = stickies[s].nextElementSibling.offsetTop;
                if (win_stop >= stickies[s].offsetTop) {
                    var t_offset = stickies[s].offsetTop;
                    var sfactor = Math.min(Math.max((win_stop - stickytop) * 0.2, 0), stickies[s].clientHeight * 0.2);
                    stickies[s].style.position = "fixed";
                    stickies[s].nextElementSibling.style.display = "";
                    if (sfactor != (win_stop - stickytop) * 0.2 && (win_stop - stickytop) * 0.2 > (win_stop - stickies[s].offsetTop) * 0.2) {
                        sfactor = scroll_delta * 1.3;
                        stickystart = sfactor;
                    }
                    if (sfactor >= stickystart && sfactor <= (Math.max(t_offset, stickytop) + stickies[s].clientHeight)) {
                        stickies[s].style.top = (-sfactor).toString() + "px";
                        //Fixes tearing on load
                        if (stickies[s].clientHeight == stickies[s].children[0].naturalHeight) {
                            stickies[s].style.top = -((win_stop - t_offset) * 0.2).toString() + "px";
                            //load-on-photo-navbar-color bug step1
                            if (t_offset > 0) {
                                photo_dims = [[t_offset, stickies[s].clientHeight]];
                            }
                        }
                    }
                    if (win_stop <= stickytop) {
                        stickies[s].style.position = "relative";
                        stickies[s].style.top = "";
                        stickies[s].nextElementSibling.style.display = "none";
                    }
                    else if (win_stop > (Math.max(t_offset, stickytop) + stickies[s].clientHeight)) {
                        sfactor = stickies[s].clientHeight * 0.2;
                    }
                }
            }
            //end stickies
        }

        trylast = win_stop;
    }, 0.5);

    $('button[class="navbar-toggle collapsed"]').on('click', function() {
        if ($('#navco').css('display') == 'none') {
            navopen = true;
            try{
                document.getElementById('naveric').hidden = false;
            }
            catch(err){}
            nvb.css('background-color','#FFF');
            nvb.css("box-shadow", "0 0 10px rgba(0,0,0,0.5)");
            $('.navtext').css('color','#60695C');
            $('.icon-bar').css('background-color','#60695C');
        }
        else {
            //if ($(window).scrollTop() == 0 || window.innerWidth <= 500) {
            if (window.innerWidth <= 500) {
                navopen = false;
                try{
                    document.getElementById('naveric').hidden = true;
                }
                catch(err){}
                nvb.stop().animate({backgroundColor:""}, {duration:300});
                //nvb.css("box-shadow", "none");
                $('.navtext').css('color','');
                $('.icon-bar').css('background-color','');
            }
        }
    })
};

$(document).ready(main);
window.onload = function() {
    calc_cphoto();
    calc_consts();
};