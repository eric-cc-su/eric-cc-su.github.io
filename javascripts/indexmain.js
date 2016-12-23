/**
 * Created by Eric on 09/18/2015
 */

var transition = function(page) {
    var targetPage = $("#"+page);
    targetPage.animate({opacity: 100},{duration:400, complete:function() {
        document.getElementById("home-top").style.display = "none";
        if (targetPage.height() > window.innerHeight) {
            document.getElementById("main-container").style.height = "initial";
        }
        document.getElementById("navd").style.display = "block";
        document.getElementById(page).style.display = "inline-block";
    }})
};

var main = function() {
    $('.homelink').hover(function() {
        if (this.style.borderBottom == "2px solid rgb(169, 171, 167)") {
            this.style.borderBottom = "none";
        }
        else {
            this.style.borderBottom = "2px solid rgb(169, 171, 167)";
        }
    });

    // $('a[href="#work"').click(function() {
    //     $("#home-top").animate({opacity: 0},{duration: 400, complete: transition("home-work")});
    //     console.log("work");
    // });
    //
    // $('a[href="#skills"').click(function() {
    //     $("#home-top").animate({opacity: 0},{duration: 400, complete: transition("home-skills")});
    //     console.log("skills");
    // });
    //
    // $('a[href="#projects"').click(function() {
    //     $("#home-top").animate({opacity: 0},{duration: 400, complete: transition("home-projects")});
    //     console.log("projects");
    // });
};

$(document).ready(main);