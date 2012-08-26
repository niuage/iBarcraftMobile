window.ib = {
  initialize: function() {
    this.bind();
  },
  bind: function() {
    $(document).bind('deviceready', this.deviceready);
  },
  deviceready: function() {
    ib.report('deviceready');
  },
  report: function(id) {
    console.log("report:" + id);
    $.mobile.allowCrossDomainPages = true
  },
  loadBarcrafts: function(location) {
    url = "http://api.ibarcraft.com/v1/barcrafts"
    if (location)
      url += "?where=" + location
    console.log(url);
    $.ajax({
      crossDomain: true,
      url: url,
      dataType: "json",
      success: function(barcrafts) {
        barcraftList = $("#barcraft-list");
        barcraftList.find("li").remove();

        $.each(barcrafts, function(i, barcraftWrapper) {
          barcraft = barcraftWrapper["barcraft"]

          li = $("<li/>");

          img = $("<img/>");
          img.attr("src", barcraft["photo"]["photo"]["profile"]["url"]);

          a = $("<a/>");
          a.attr("href", "#barcraft?id=" + barcraft["id"])
          a.append(img)
          a.append("<h3>" + barcraft["title"] + "</h3>")
          a.append("<p>" + barcraft["location"]["address"] + "</p>")
          li.append(a)

          barcraftList.append(li)
        })
        barcraftList.listview("refresh");
      },
      error: function(xhr, error) {
        console.log(error);
      }
    })
  },
  getBarcrafts: function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      ib.loadBarcrafts(position.coords.latitude + " " + position.coords.longitude);
    },
    function(error) {
      ib.loadBarcrafts();
      console.log("Couldn't get location.");
    });
  },
  displayBarcraft: function(data) {
    barcraft = data.barcraft
    console.log(data.barcraft);
  }
};

var getUrlVars = function() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
