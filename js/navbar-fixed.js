/*
* Fixed Navbar Scrolling
* Github: https://github.com/ts-de/bootstrap4-fixed-navbar
*/

// init nav object from dom
var nav = $('nav');
// get heigth of the nav
var navHeight = nav.outerHeight();

// click-trigger
$('a[href*="#"]:not([href="#"])').click(function(event) {
  scrollToSection(this);
  event.preventDefault();
});

// scroll-trigger
$(document).scroll(function() {
  activateCurrentSection();
});

// get target position and scrolls to it
function scrollToSection(self) {
  // get the target href
  var href = $(self).attr('href');

  // get the target position
  // var targetPos = $(href).offset().top - navHeight + 5;

  // scroll to target
  $('html, body').animate({
    scrollTop: targetPos
  }, 400);
}

/*
* Updates active section on scroll
*/
// scroll-trigger
$(document).scroll(function() {
  activateCurrentSection();
});

/*
* Updates active section on scroll
*/
function activateCurrentSection() {
  var id; // init the id of the element that will be activated

  // get all sections
  var sections = $('.section');

  // store current position on the page when scroll is triggered
  var pos = $(document).scrollTop();

  /*
  * Exception: if last section is <100% of the screen height
  * make it active when 50% of it is visible.
  * Otherwise the last section would never activate.
  */
  var lastSection = sections[sections.length-1];  // get last section
  var lastSectionTooSmall = $(lastSection).height() < $(window).height();

  if (lastSectionTooSmall) {
    var lastSectionTopPos = $(lastSection).offset().top;
    // lastSectionTriggerPos is true if 50% of the last section is visible
    var lastSectionTriggerPos = $(window).height() + $(document).scrollTop() - ($(lastSection).height()/2);
    var lastSectionInView = lastSectionTriggerPos > lastSectionTopPos;
  }

  if (lastSectionTooSmall && lastSectionInView) {
    id = $(lastSection).attr('id');
  } else {  // else last section is >= 100% of the view check all sections to find the top one
    sections.each(function() {
      var top = $(this).offset().top - navHeight; // get the top & bottom position of the section
      var bottom = top + $(this).outerHeight();

      /*
      * if the current position is higher (deeper on the page) than the top of the section
      * and it is smaller (heiger on the page) than the bottom of the section
      * it is the active section.
      */
      if (pos >= top && pos <= bottom) {
        id = $(this).attr('id');       // store the id of this section
      }
    });
  }

  /*
   if an id was set before, activate the section in the nav
   */
  if (id) {
    nav.find('a').removeClass('active');
    nav.find('a[href="#' + id + '"]').addClass('active');
  }
}


(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse the navbar when page is scrolled
  // $(window).scroll(function () {
  //   if ($("#mainNav").offset().top > 100) {
  //     $("#mainNav").addClass("navbar-shrink");
  //   } else {
  //     $("#mainNav").removeClass("navbar-shrink");
  //   }
  // });

  

})(jQuery); // End of use strict
