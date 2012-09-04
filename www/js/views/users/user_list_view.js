window.UserListView = Backbone.View.extend({
  initialize: function () {
    this.model.bind("reset", this.render, this);
    this.model.fetch()
  },

  render: function () {
    $(this.el).empty();
    _.each(this.model.models, function (user) {
      var el = new UserListItemView({model: user}).render().el
      $(this.el).append(el);
    }, this);
    $('#user-list').listview('refresh');
  }
})
