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
    var transition = $.mobile.defaultPageTransition;
    if (this.firstPage) {
      transition = 'none';
      this.firstPage = false;
    }
    $.mobile.changePage($(page.el), { changeHash:false, transition: transition });
  }

});

var deviceready = function() {
  tpl.loadTemplates(['barcrafts/index', 'barcrafts/show', 'barcrafts/_barcraft', 'users/_user'],
    function () {
      app = new AppRouter();
      Backbone.history.start();
    });

  if(window.plugins.childBrowser == null) {
    ChildBrowser.install();
  }

  var debug = true;

  jso_registerRedirectHandler(window.plugins.childBrowser.showWebPage);

  window.plugins.childBrowser.onLocationChange = function(url){
    url = decodeURIComponent(url);
    console.log("Checking location: " + url);
    jso_checkfortoken('ibarcraft', url, function() {
      console.log("Closing child browser, because a valid response was detected.");
      window.plugins.childBrowser.close();
    });
  };

  jso_configure({
    "ibarcraft": {
      client_id: "253adc42d7e296b1a0c353912296bc71ae5498eed998d7ec81678ce142531bff",
      redirect_uri: "http://ibarcraft.com/oauth.html", // "http://ibarcraft.com/oauth.html"
      authorization: "http://ibarcraft.com/oauth/authorize",
      scope: ["public", "write"]
    }
  }, {"debug": debug});

  jso_wipe();

  // jso_ensureTokens({
  //   "ibarcraft": ["public", "write"]
  // });

  jso_dump();
}

$(document).bind('deviceready', this.deviceready)
$(document).trigger('deviceready')
