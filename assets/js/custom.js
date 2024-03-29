!(function ($) {
  "use strict";

  var EliasApp = function () {};

  //PreLoader
  (EliasApp.prototype.initPreLoader = function () {
    $("#status").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }),
    //scroll
    (EliasApp.prototype.initStickyMenu = function () {
      var navbar = document.querySelector("nav");
      window.onscroll = function () {
        // pageYOffset or scrollY
        if (window.pageYOffset > 200) {
          navbar.classList.add("stickyadd");
        } else {
          navbar.classList.remove("stickyadd");
        }
      };
      var navLinks = navbar.querySelectorAll("ul li a");
      [].forEach.call(navLinks, function (div) {
        div.addEventListener("click", () => {
          document.querySelector(".navbar-toggler")
            ? document.querySelector(".navbar-toggler").click()
            : "";
        });
      });
    }),
    //Scrollspy
    (EliasApp.prototype.initScrollspy = function () {
      var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: "#main_nav",
        offset: 70,
      });
    }),
    (EliasApp.prototype.currentRunnerIndex = 0);

  //Work
  (EliasApp.prototype.initWork = function () {
    $(window).on("load", function () {
      var $container = $(".work-filter");
      var $filter = $("#menu-filter");
      $container.isotope({
        filter: "*",
        layoutMode: "masonry",
        animationOptions: {
          duration: 750,
          easing: "linear",
        },
      });

      $filter.find("a").on("click", function () {
        EliasApp.prototype.currentRunnerIndex++;
        var currentLocalIndex = EliasApp.prototype.currentRunnerIndex;

        var selector = $(this).attr("data-filter");
        $filter.find("a").removeClass("active");
        $(this).addClass("active");

        for (let i = 0; i < $container[0].children.length; i++) {
          let childItem = $container[0].children[i];

          childItem.removeAttribute("data-aos");
        }

        AOS.refreshHard();

        $container.isotope({
          filter: selector,
          animationOptions: {
            animationDuration: 750,
            easing: "linear",
            queue: false,
          },
        });

        setTimeout(function () {
          if (currentLocalIndex !== EliasApp.prototype.currentRunnerIndex) {
            return;
          }

          for (let i = 0; i < $container[0].children.length; i++) {
            let childItem = $container[0].children[i];
            let classList = childItem.classList;

            let localSelector = selector.substring(1);

            if (selector === "*" || classList.contains(localSelector)) {
              childItem.style.display = "initials";
            } else {
              childItem.style.display = "none";
            }

            childItem.setAttribute("data-aos", "fade-up");
          }

          AOS.refreshHard();
        }, 1000);

        return false;
      });
    });
  }),
    //Magnificpop
    (EliasApp.prototype.initMagnificPopup = function () {
      $(".img-zoom").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        mainClass: "mfp-fade",
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1],
        },
      });
    }),
    // BACK TO TOP
    (EliasApp.prototype.initBackToTop = function () {
      $(window).on("scroll", function () {
        if ($(this).scrollTop() > 100) {
          $(".back_top").fadeIn();
        } else {
          $(".back_top").fadeOut();
        }
      });
      $(".back_top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
      });
    }),
    //Client
    (EliasApp.prototype.initTestimonial = function () {
      $(".owl-carousel").owlCarousel({
        loop: true,
        nav: false,
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        autoHeight: false,
        autoHeightClass: "owl-height",
      });
    });

  (EliasApp.prototype.init = function () {
    this.initPreLoader();
    this.initStickyMenu();
    this.initScrollspy();
    this.initWork();
    this.initMagnificPopup();
    this.initBackToTop();
    this.initTestimonial();
  }),
    //init
    ($.EliasApp = new EliasApp()),
    ($.EliasApp.Constructor = EliasApp);
})(window.jQuery),
  //initializing
  (function ($) {
    "use strict";
    $.EliasApp.init();
  })(window.jQuery);
