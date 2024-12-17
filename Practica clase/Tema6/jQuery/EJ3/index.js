$('td').filter(function() {
    return $(this).text().trim() === '';
}).css('background-color', 'yellow');