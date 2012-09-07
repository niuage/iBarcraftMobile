window.Checkin = Backbone.Model.extend({
  urlRoot: api_url("v1/checkins"),

  initialize: function () {
  }
});

window.CheckinCollection = Backbone.Collection.extend({
  model: Checkin,
  url: api_url("v1/checkins")
})

window.BarcraftCheckinCollection = CheckinCollection.extend({
  initialize: function (models, options) {
    this.barcraft_id = options.barcraft_id
  },
  url: function () {
    return api_url("v1/barcrafts/" + this.barcraft_id + "/checkins");
  }
})
