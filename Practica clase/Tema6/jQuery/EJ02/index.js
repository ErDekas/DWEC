$("p").filter(function() {
    return $(this).text().toLowerCase().includes("eu");
}).css("background-color", "red");