window.UserListView = Backbone.View.extend({
  initialize: function () {
    this.model.bind("reset", this.render, this);
    this.model.bind("add", this.render, this);
    this.model.fetch()
  },

  render: function () {
    $(this.el).empty();
    _.each(this.model.models, function (user) {
      var el = new UserListItemView({model: user}).render().el
      $(this.el).append(el);
    }, this);
    var title = $("<li></li>").attr("data-role", "list-divider").html("Attendees")
    $(this.el).prepend(title);
    $("#user-list").listview('refresh');
    return this;
  }
})
