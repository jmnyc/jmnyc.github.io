(function ($) {
    "use strict";
    $(document).ready(function () {
        // Start app code
        
        // Date and time
        var now = (function () {
            var year = new Date(new Date().getFullYear().toString()).getTime();
            return function () {
                return Date.now();
            }
        })();
        console.log(Date(now()));
	});
}(jQuery));