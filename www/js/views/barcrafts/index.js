window.BarcraftListPage = Backbone.View.extend({

  initialize: function () {
    this.template = _.template(tpl.get('barcrafts/index'));
  },

  render: function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    this.listView = new BarcraftListView({ el: $('ul', this.el), model: this.model });
    this.geolocate();
    return this;
  },

  events: {
    "keyup .search-query": "search",
    "change .search-query": "storeQuery"
  },

  storeQuery: function(e) {
    localStorage.setItem("location", $(e.currentTarget).val())
  },

  search: function (event) {
    var location = $('.search-query').val();
    this.storeQuery(event);
    this.model.findByLocation(location);
  },

  geolocate: function() {
    var self = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      var loc = localStorage.getItem("location")
      if (loc) $('.search-query').val(loc);
      else loc = position.coords.latitude + " " + position.coords.longitude;
      self.model.findByLocation(loc);
    },
    function(error) {
      self.model.findByLocation("");
    });
  }
});

window.BarcraftListView = Backbone.View.extend({

  initialize:function () {
    this.model.bind("reset", this.render, this);
  },

  render: function (eventName) {
    $(this.el).empty();
    $('#welcome').remove();
    _.each(this.model.models, function (barcraft) {
      $(this.el).append(new BarcraftListItemView({model: barcraft}).render().el);
    }, this);
    $('#myList').listview('refresh'); // try this.$el.lis...
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
