/*global $, jQuery*/
(function ($) {
    "use strict";
    $(document).ready(function () {
        
//        function sameheight(div){
//        /* Latest compiled and minified JavaScript included as External Resource */
//
//            var largest = 160;
//            var findHeight = 0;
//
//            //loop through all title elements
//            $(document).find(div).each(function(){
//                findHeight = $(this).height();
//                if(findHeight > largest){
//                    largest = findHeight;
//                }  
//            });
//
//            $(document).find(div).css({"height":findHeight+"px"});
//        };
//        
//        sameheight(".exhibition-title");
        
        /* Bootstrap nav menu fix Adds nav-link class to nav anchor tag 
        */
        var i, menuItem = document.getElementsByClassName("menu-item"), menuItemAnchor = document.querySelectorAll(".menu-item>a");
        for (i = 0; i < menuItem.length; i += 1) {
            menuItem[i].classList.add("nav-item");
            menuItemAnchor[i].classList.add("nav-link");
        }

        /* Home accordion 
        */
        $(".content").fadeIn(800);
        
        $(".accordion-item").on("click", function() {
            var $button = $(this).find(".accordion-btn");
            var $siblingButton = $(this).siblings().find(".accordion-btn"); 
            if ($button.hasClass("collapsed")) {
                $siblingButton.removeAttr("disabled");
                setTimeout(function(){ $button.attr("disabled", "") }, 10);
            } 
        });
        
        /* Post Content Formatting
        */

        $(".gallery-wrap").prepend($(".gallery"));
        $(".exhibition-content-wrap").prepend($(".exhibition-post-thumbnail"));
        $(".gallery-item a").attr("data-lightbox", "gallery");

	});
}(jQuery));
