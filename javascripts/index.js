/**
 * Created by Eric on 5/7/2015.
 * All Javascript is written for vertical slide-by-slide scrolling
 */

var screenheight = window.innerHeight;   //measures the height of the user's screen
var pages;                                  //all divs with the "page" class
var toppositioning = 0;                     //the starting position of the next page div
var wheel_queue = 0;                        //the amount of wheel spin requests sent by user, prevents clogging

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
/*
//scrolling animation
var scroll = function(destination) {
    $('html,body').animate({
        scrollTop: destination
    }, 500, function() {
        if (wheel_queue > 0) {
            wheel_queue = 0;
        }
    });
};

//find the Y coordinate to scroll to
var scroll_target = function(upordown) {
    pagediv = $(window).scrollTop() / screenheight;
    if (upordown == "down") {
        if (pagediv%1 == 0) {
            pagediv += 0.1;
        }
        pagediv = Math.ceil(pagediv);
    }
    else {
        if (pagediv%1 == 0) {
            pagediv -= 0.1;
        }
        pagediv = Math.floor(pagediv);
    }

    return pagediv
}
*/
var main = function() {
    screenheight = window.innerHeight;
    calculate_win(); //initialize sizes

    //recalculate on window resize
    window.onresize = function() {
        calculate_win();
    };

    window.onscroll = function() {
        var fork = $('#forkme_banner');
        var nvb = $('#navb');
        if ($(window).scrollTop() != 0) {
            nvb.stop().animate( {backgroundColor:'#FFF'}, {duration:300});
            nvb.css("box-shadow", "0 0 10px rgba(0,0,0,0.5)");
            $('.nav > li > a').animate({color:'#60695C'}, {duration:300});
            fork.animate( {height: '60px', borderRadius: "0", right: "0"}, {duration:300});
            fork.css("box-shadow","none");
            $('#forkme_banner > p').animate( {margin: "10px 0"}, {duration:300});
        }
        else {
            nvb.stop().animate( {backgroundColor:"transparent"}, {duration:300});
            nvb.css("box-shadow", "none");
            $('.nav > li > a').animate({color:'#FFF'}, {duration:300});
            fork.animate( {height: '44px', borderRadius: "0 0 2px 2px", right: "10px"}, {duration:300});
            fork.css("box-shadow", "0 0 10px rgba(0,0,0,0.5)");
            $('#forkme_banner > p').animate( {margin: "0"}, {duration:300});
        }
    };

    /*
    //Link scrolling
    //https://css-tricks.com/snippets/jquery/smooth-scrolling/
    $('a[href*=#]').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            
            if (target.length) {
                scroll((target.offset().top + 50));
                return false;
            }
        }
    });

    //Show or Hide Chefversity link
    window.onscroll = function(s) {
        //scrolling out of page 1
        if (($(window).scrollTop() + 50) > screenheight) {
            $('#home').show("slide");

            //Change link colors
            if ($(window).scrollTop() >= (3*screenheight)) {
                $("li a").each(function() {
                    this.style.color = "#6C756B";
                })
            }
            else {
                $("li a").each(function() {
                    this.style.color = "";
                })
            }

        }
        else {
            $('#home').hide("slide");
        }
    }

    //mousewheel scrolling
    window.onwheel = function(w) {
        wheel_queue += 1; //track wheel spin instances
        w.preventDefault();

        if (wheel_queue <= 1) {
            console.log(wheel_queue);
            pagediv = $(window).scrollTop() / screenheight;
            //scrolling down
            if ( w.deltaY > 0 ) {
                pagediv = scroll_target("down");
            }
            //scrolling Up
            else if (w.deltaY < 0) {
                pagediv = scroll_target("up");
            }

            scroll(pagediv * screenheight);
            return false;
        }
    }

    //http://www.mediacollege.com/internet/javascript/page/scroll.html

    //keyboard scrolling
    window.onkeydown = function(k) {
        console.log(k.keyCode);
        var key = k.keyCode;

        //preventDefault only if key is one of keys in list
        if ([33,34,35,36,38,40].indexOf(key) >= 0) {
            k.preventDefault();
        }

        pagediv = $(window).scrollTop() / screenheight;

        //scrolling down
        if ([34,40].indexOf(key) >= 0) {
            pagediv = scroll_target("down");
        }
        //scrolling up
        else if ([33,38].indexOf(key) >= 0) {
            pagediv = scroll_target("up");
        }
        //scroll to last div
        else if (key == 35) {
            pagediv = toppositioning/screenheight;
        }
        //scroll to top
        else if (key == 36) {
            pagediv = 0;
        }

        scroll(pagediv * screenheight);
    }
    */
};

$(document).ready(main);