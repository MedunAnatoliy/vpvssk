//var helpers = new Helpers();
//var ep = new EasyPage();

//
// Load
//

$(window).load(function () {

    var countDownDate = new Date("July 10, 2017 00:00:00").getTime();

    var countdownfunction = setInterval(function () {

        var now = new Date().getTime();

        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("count").innerHTML = ('0'+days).slice(-2) + ":" + ('0'+hours).slice(-2) + ":"
            + ('0'+minutes).slice(-2) + ":" + ('0'+seconds).slice(-2);

        if (distance < 0) {
            clearInterval(countdownfunction);
            document.getElementById("count").innerHTML = "00:00:00:00";
        }
    }, 1000);

});
//
// Ready
//

$(document).ready(function () {
    
    
    // Init ajax send data from form.
//    helpers.ajaxForm('.formtest', 'formerror', ['.phone', '.name']);

    // Init lightgallery
    $("#lightgallery").lightGallery();

    // Init lazyload
    // data-original="img/example.jpg"
    $(".lazy").lazyload();

    $('section').css('min-height', $(window).height());

    $('.main-content-wrapper').stickyStack();


    $(window).on('scroll', function() {
        $('#main').css({
            opacity: 1 - $(window).scrollTop() * 2 /2000
        })
    });

/*
    $("#main").scroll(function() {
        var destination = $('#second_frame').offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        return false;
    });

*/


    $("#main").on('touchmove',function (event) {

        event.preventDefault();

      //  $('#second_frame').css('max-height',100+"%");
    });

    $('.next1').on('click',function () {
        $("body,html").animate({scrollTop: 0});
        return false;
    });
/*
    $('#second_frame').on('touchmove',function () {
        $('html, body').animate({
            scrollTop: $("#main").offset().top
        }, 1000);
    });
*/








    /*
        $('.share_block').mouseover(function () {
            $('.share_block').fadeOut(250,function () {
                $('.socials').fadeIn();
            });
        });

        $('.socials').mouseleave(function () {
            $('.socials').fadeOut(250,function () {
                $('.share_block').fadeIn();
            });
        });

        */
    /*
    $('.socials').mouseleave(function () {
        $('.socials').fadeOut();
        $('.share_block').delay(500).fadeIn();
        return false;
    });
*/




    $(function(){
        $("a[href^='#']").click(function(){
            var _href = $(this).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
        });
    });

});



//
// Resize window event
//

$(window).resize(function () {

    // Code ..

});


//
// Scrolling
//

$(window).scroll(function () {

    // Code ..

});



//
// Custom functions
//

