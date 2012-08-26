$("body").on("pageshow", "#barcraft", function() {
  var id = getUrlVars()["id"];
  $.getJSON("http://api.ibarcraft.com/v1/barcrafts/" + id, ib.displayBarcraft)
})