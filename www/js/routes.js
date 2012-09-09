var AppRouter = Backbone.Router.extend({

  routes:{
    "":"barcrafts",
    "barcrafts":"barcrafts",
    "barcrafts/:id":"barcraft"
  },

  initialize:function () {
    $('.back').live('click', function(event) {
      window.history.back();
      return false;
    });

    this.firstPage = true;
    this.searchResults = new BarcraftCollection();
  },

  barcrafts:function () {
    this.changePage(new BarcraftListPage({model: this.searchResults}));
  },

  barcraft:function (id) {
    var barcraft = new Barcraft({ id: id });
    var self = this;
    barcraft.fetch({
      success:function (data) {
        self.changePage(new BarcraftView({ model: data }));
      }
    });
  },

  changePage:function (page) {
    $(page.el).attr('data-role', 'page');
    page.render();
    $('body').append($(page.el));

    $.mobile.defaultPageTransition = "slide";
    var transition = $.mobile.defaultPageTransition;
    if (this.firstPage) {
      transition = 'pop';
      this.firstPage = false;
    }
    $.mobile.changePage($(page.el), { changeHash:false, transition: transition });
  }

});
