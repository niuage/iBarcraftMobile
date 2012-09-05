window.Checkin = Backbone.Model.extend({
  urlRoot: "http://api.ibarcraft.com/v1/checkins",

  initialize: function () {
  }
});

window.CheckinCollection = Backbone.Collection.extend({
  model: Checkin,
  url: "http://api.ibarcraft.com/v1/checkins"
})

window.BarcraftCheckinCollection = CheckinCollection.extend({
  initialize: function (models, options) {
    this.barcraft_id = options.barcraft_id
  },
  url: function () {
    return "http://api.ibarcraft.com/v1/barcrafts/" + this.barcraft_id + "/checkins"
  }
})
