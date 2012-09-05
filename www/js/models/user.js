window.User = Backbone.Model.extend({
  urlRoot: "http://api.ibarcraft.com/v1/users",

  initialize: function () {

  }
});

window.UserCollection = Backbone.Collection.extend({
  model: User,
  url: "http://api.ibarcraft.com/v1/users"
})

window.BarcraftUserCollection = UserCollection.extend({
  initialize: function (models, options) {
    this.barcraft_id = options.barcraft_id
  },
  url: function () {
    return "http://api.ibarcraft.com/v1/barcrafts/" + this.barcraft_id + "/users"
  }
})
