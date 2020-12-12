$(document).ready(function () {

    $(document).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#ScrollTopBtn').fadeIn();
        } else {
            $('#ScrollTopBtn').fadeOut();
        }
    });

});
