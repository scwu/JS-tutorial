$(document).ready(function() {
    $('#myFeature li')
        .append('<div/>')
        .each(function() {
            $(this).find('div')
                .load('foo.php?item=' + $(this).attr('id'));
        })
    .click(function() {
        $(this).find('div').show();
        $(this).siblings().find('div').hide();
    });
});
