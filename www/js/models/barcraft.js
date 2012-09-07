window.Barcraft = Backbone.Model.extend({

  urlRoot: api_url("/v1/barcrafts"),

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

  url: api_url("v1/barcrafts"),

  findByLocation: function (location) {
    this.fetch({
      data: {
        where: location
      }
    })
  }

});
