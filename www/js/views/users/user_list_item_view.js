window.UserListItemView = Backbone.View.extend({

  tagName:"li",

  initialize:function () {
    this.template = _.template(tpl.get('users/_user'));
    this.model.bind("change", this.render, this);
    this.model.bind("destroy", this.close, this);
  },

  render:function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }

});
