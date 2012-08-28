window.Barcraft = Backbone.Model.extend({

  urlRoot: "http://api.ibarcraft.com/v1/barcrafts",

  initialize: function () {
  }

});

window.BarcraftCollection = Backbone.Collection.extend({

  model: Barcraft,

  url: "/barcrafts",

  findByLocation: function (location) {
    var url = "http://api.ibarcraft.com/v1/barcrafts?where=" + location
    console.log('findByLocation: ' + location);
    var self = this;
    $.ajax({
      url: url,
      dataType: "json",
      success: function (data) {
        self.reset(data);
      }
    });
  }

});