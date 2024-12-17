$(document).ready(function () {
    let animation;

    $("#start").click(function() {
        $("#square").stop(true, true).css({
            "top": "20px",
            "left": "20px",
            "background-color": "red"
        }).show();

        animation = $("#square")
            .animate({left: "+=200px"}, 1000)
            .animate({ backgroundColor: "blue"},{duration: 500, queue: false})
            .animate({top: "-=100px", opacity: 0}, 1000, function() {
                $(this).hide();
            });
    });

    $("#stop").click(function() {
        $("#square").stop(true, true);
    });
});