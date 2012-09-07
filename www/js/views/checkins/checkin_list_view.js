window.CheckinListView = Backbone.View.extend({
  initialize: function () {
    this.model.bind("reset", this.render, this);
    this.model.bind("add", this.render, this);
    this.model.fetch()
  },

  render: function () {
    $(this.el).empty();
    _.each(this.model.models, function (checkin) {
      var el = new CheckinListItemView({model: checkin}).render().el
      $(this.el).append(el);
    }, this);
    var title = $("<li></li>").attr("data-role", "list-divider").html("Checkins")
    $(this.el).prepend(title);
    $("#checkin-list").listview('refresh');
    return this;
  }
})
