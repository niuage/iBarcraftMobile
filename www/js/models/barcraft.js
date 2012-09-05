window.Barcraft = Backbone.Model.extend({

  urlRoot: "http://api.ibarcraft.com/v1/barcrafts",

  initialize: function () {
  },

  parse: function (data) {
    var tf = data.barcraft.timeframe
    tf.from = new Date(tf.from).toUTCString()
    if (tf.to) {
      tf.to = new Date(tf.to).toUTCString()
    }

    return data;
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
