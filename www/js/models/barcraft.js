window.Barcraft = Backbone.Model.extend({

  urlRoot: "http://api.ibarcraft.com/v1/barcrafts",

  initialize: function () {
  }

});

window.BarcraftCollection = Backbone.Collection.extend({

  model: Barcraft,

  url: "http://api.ibarcraft.com/v1/barcrafts",

  findByLocation: function (location) {
    this.fetch({
      data: {
        where: location
      }
    })
  }

});
