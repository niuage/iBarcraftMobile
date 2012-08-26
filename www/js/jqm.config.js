$(document).bind("mobileinit", function () {
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});

$(function() {
  $('div[data-role="page"]').live('pagehide', function (event, ui) {
    $(event.currentTarget).remove();
  });
})