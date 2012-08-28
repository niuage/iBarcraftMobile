window.BarcraftView = Backbone.View.extend({

  initialize:function () {
    this.template = _.template(tpl.get('barcrafts/show'));
  },

  render:function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }

});