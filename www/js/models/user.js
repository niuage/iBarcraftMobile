window.User = Backbone.Model.extend({
  urlRoot: "http://api.ibarcraft.com/v1/users",

  initialize: function () {

  }
});

window.UserCollection = Backbone.Collection.extend({
  model: User,
  url: "/users"
})
