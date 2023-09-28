$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        nav:true,
        navText: ["<img src='assets/images/left-qa.svg'>","<img src='assets/images/right-qa.svg'>"],
        autoplay:true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
  });

  