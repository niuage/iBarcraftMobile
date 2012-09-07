window.User = Backbone.Model.extend({
  urlRoot: api_url("v1/users"),

  initialize: function () {

  }
});

window.UserCollection = Backbone.Collection.extend({
  model: User,
  url: api_url("v1/users")
})

window.BarcraftUserCollection = UserCollection.extend({
  initialize: function (models, options) {
    this.barcraft_id = options.barcraft_id
  },
  url: function () {
    return api_url("v1/barcrafts/" + this.barcraft_id + "/users");
  }
})
