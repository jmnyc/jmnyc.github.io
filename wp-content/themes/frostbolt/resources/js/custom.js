/*global $, jQuery*/
(function ($) {
    "use strict";
    $(document).ready(function () {

        /* Bootstrap nav menu fix
        Adds nav-link class to nav anchor tag */
        
        var i, menuItem = document.getElementsByClassName("menu-item"), menuItemAnchor = document.querySelectorAll(".menu-item>a");

        for (i = 0; i < menuItem.length; i += 1) {
            menuItem[i].classList.add("nav-item");
            menuItemAnchor[i].classList.add("nav-link");
        }

        /* Home accordion
        */

        $(".home-accordion").fadeIn(1500);
        
        $(".accordion-item").on("click", function() {
            
            var $button = $(this).find(".accordion-btn");
            var $siblingButton = $(this).siblings().find(".accordion-btn"); 
            
            if ($button.hasClass("collapsed")) {
                $siblingButton.removeAttr("disabled");
                setTimeout(function(){ $button.attr("disabled", "") }, 100);
            } 

        });

	});
}(jQuery));
