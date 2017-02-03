//Slideshow for Background
//Array of images which you want to show: Use path you want.
var images = new Array('../img/road-mountain.jpeg', '../img/freedom.jpeg', '../img/road-desert.jpg', '../img/freedom.jpg', '../img/road-forest.jpeg', '../img/field.jpg',  '../img/road-snow.jpg');
var nextimage = 0;
doSlideshow();

$(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("navbar-colored");
    } else {
        $(".navbar-fixed-top").removeClass("navbar-colored");
    }
});

attachPromoCodes();

var testimonials = new Array("\"Early Retirement or Retirement planning does not have to be difficult. Sean's book simplifies steps you can take to build savings that you think you already know, but you really don't.\" -Joe Hill",
    "\"Sean has helped kick start my interest in financial independence. Since I started listening to his podcast, I've overhauled my long term financial goals and gained a better understanding about how today's actions affect tomorrow.\" -Larry Burris");
var nextTestimonial = 0;
doTestimonial();

function doSlideshow() {
    if (nextimage >= images.length) { nextimage = 0; }
    $('#dream')
    .css('background-image', 'url("' + images[nextimage++] + '")')
    .fadeIn(600, function () {
        setTimeout(function () {
            $('#dream').fadeOut(300, doSlideshow);
        }, 8000);
    });
}

function doTestimonial() {
    if (nextTestimonial >= testimonials.length) { nextTestimonial = 0; }
    $('#testimonial')
    .html(testimonials[nextTestimonial++])
    .fadeIn(1500, function () {
        setTimeout(function () {
            $('#testimonial').fadeOut(1500, doTestimonial);
        }, 8000);
    });
}

function attachPromoCodes() {
    var url = window.location.href;
    if (url.lastIndexOf("#") > 0) {
        // Get the code        
        var code = url.substr(url.lastIndexOf("#") + 1);

        // Update links with code
        $('.price-box').find(".btn-lg").each(function () {
            $(this).attr('href', $(this).attr('href') + '/' + code);
        });
    }
}