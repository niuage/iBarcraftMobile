window.BarcraftListPage = Backbone.View.extend({

  initialize: function () {
    this.template = _.template(tpl.get('barcrafts/index'));
  },

  render: function (eventName) {
    console.log("render index1")
    $(this.el).html(this.template(this.model.toJSON()));
    this.listView = new BarcraftListView({ el: $('ul', this.el), model: this.model });
    this.listView.render();
    this.geolocate();
    return this;
  },

  events: {
    "keyup .search-query": "search"
  },

  search: function (event) {
    var location = $('.search-query').val();
    console.log('search ' + location);
    this.model.findByLocation(location);
  },

  geolocate: function() {
    self = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      self.model.findByLocation(position.coords.latitude + " " + position.coords.longitude);
    },
    function(error) {
      self.model.findByLocation("");
      console.log("Couldn't get location.");
    });
  }
});

window.BarcraftListView = Backbone.View.extend({

  initialize:function () {
    this.model.bind("reset", this.render, this);
  },

  render: function (eventName) {
    console.log("render index2")
    $(this.el).empty();
    $('#welcome').remove();
    _.each(this.model.models, function (barcraft) {
      $(this.el).append(new BarcraftListItemView({model: barcraft}).render().el);
    }, this);
    $('#myList').listview('refresh');
    return this;
  }
});

window.BarcraftListItemView = Backbone.View.extend({

  tagName:"li",

  initialize:function () {
    this.template = _.template(tpl.get('barcrafts/_barcraft'));
    this.model.bind("change", this.render, this);
    this.model.bind("destroy", this.close, this);
  },

  render:function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }

});