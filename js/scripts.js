function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

// toggle visibility for css3 animations
$(document).ready(function() {
	$('header').addClass('visibility');
	$('.carousel-iphone').addClass('visibility');
	$('.payoff h1').addClass('visibility');
	$('.features .col-md-4').addClass('visibility');
	$('.social .col-md-12').addClass('visibility');
	mixpanel.track("Page View");

	$('.signup-input').on('input',function() {
		if(IsEmail($(this)[0].value)){
			$('.purchase button.app-store').addClass('on');
			$('.purchase button.app-store').removeClass('off');
		}
		else{
			$('.purchase button.app-store').removeClass('on');
			$('.purchase button.app-store').addClass('off');
		}
	});

	$('.signup-btn').click(function(){
		var data = $(this).prev('input')[0].value;
		if(IsEmail(data)){
			mixpanel.track("Signup Clicked", {"email": data});
			mixpanel.identify(data);
			mixpanel.people.set({
			"$email": data,
			"$last_login": new Date(),         // properties can be dates...
			});
			$('.signup-input').parent().html("<h1>Thanks for signing up</h1><br>We'll let you know once we launch... which should be soon!");
			_gaq.push(['_trackEvent', 'Navigation', 'Signed Up', data]);
		}
		else{
			mixpanel.track("Invalid Email", {"data": data});
			_gaq.push(['_trackEvent', 'Navigation', 'Invalid Email', data]);
		}
	});

	$('section.buffer').appear();
	$('section.features').appear();
	$('section.social').appear();
	$('section.get-it').appear();
	$('section.carousel').appear();
	$('section.science').appear();
	$('section.signup').appear();

 	var viewed = {};

	$(document.body).on('appear', 'section', function(e, $affected) {

	  $affected.each(function() {
			item = $(this).attr('class');
			if (!(item in viewed)){
				viewed[item] = true;
				mixpanel.track("In " + item);
				mixpanel.people.set('Viewed Sections', Object.keys(viewed));
				_gaq.push(['_trackEvent', 'Navigation', item, 'viewed']);
			}
	  });

	});
	});


//iphone carousel animation
$(window).load(function () {
	$('header').addClass("animated fadeIn");
	$('.carousel-iphone').addClass("animated fadeInLeft");
});

// Fixed navbar
$(window).scroll(function () {

var scrollTop = $(window).scrollTop();

	if (scrollTop > 200) {
		$('.navbar-default').css('display', 'block');
		$('.navbar-default').addClass('fixed-to-top');

	} else if (scrollTop == 0)   {

		$('.navbar-default').removeClass('fixed-to-top');
	}


//animations
	$('.payoff h1').each(function(){

		var imagePos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();

			if (imagePos < topOfWindow+650) {
				$(this).addClass("animated fadeInLeft");
			}

	});

	$('.purchase button.app-store').each(function(){

		var imagePos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();

			if (imagePos < topOfWindow+650) {
				$(this).addClass("animated pulse");
			}

	});

	$('.features .col-md-4').each(function(){

		var imagePos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();

			if (imagePos < topOfWindow+650) {
				$(this).addClass("animated flipInX");
			}

	});

	$('.social .col-md-12').each(function(){

		var imagePos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();

			if (imagePos < topOfWindow+550) {
				$(this).addClass("animated fadeInLeft");
			}

	});

	$('.get-it button.app-store').each(function(){

		var imagePos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();

			if (imagePos < topOfWindow+850) {
				$(this).addClass("animated pulse");
			}

	});


});


// Parallax Content

function parallax() {

		// Turn parallax scrolling off for iOS devices

		    var iOS = false,
		        p = navigator.platform;

		    if (p === 'iPad' || p === 'iPhone' || p === 'iPod') {
		        iOS = true;
		    }

		var scaleBg = -$(window).scrollTop() / 3;

        if (iOS === false) {
            $('.payoff').css('background-position-y', scaleBg - 150);
            $('.social').css('background-position-y', scaleBg + 200);
        }

}

function navbar() {

	if ($(window).scrollTop() > 1) {
	    $('#navigation').addClass('show-nav');
	} else {
	    $('#navigation').removeClass('show-nav');
	}

}

$(document).ready(function () {

	var browserWidth = $(window).width();

	if (browserWidth > 560){

		$(window).scroll(function() {
			parallax();
			navbar();
		});

	}

});


$(window).resize(function () {

	var browserWidth = $(window).width();

	if (browserWidth > 560){

		$(window).scroll(function() {
			parallax();
			navbar();
		});

	}

});


// iPhone Header Carousel
$('header .carousel').carousel({
  interval: 3000
})

// iPhone Features Carousel
$('.detail .carousel').carousel({
  interval: 4000
})
