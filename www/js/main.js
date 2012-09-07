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

var deviceready = function() {
  tpl.loadTemplates(['barcrafts/index', 'barcrafts/show', 'barcrafts/_barcraft', 'users/_user', 'checkins/_checkin'],
    function () {
      app = new AppRouter();
      Backbone.history.start();
      $(document).on("pageinit", "[data-role=page]", function() {
        $(this).find("[data-role=content]").trigger("iInit");
      })
    });

  if(window.plugins.childBrowser == null) {
    ChildBrowser.install();
  }



  var debug = true;

  jso_registerRedirectHandler(window.plugins.childBrowser.showWebPage);

  window.plugins.childBrowser.onLocationChange = function(url){
    url = decodeURIComponent(url);
    jso_checkfortoken('ibarcraft', url, function() {
      window.plugins.childBrowser.close();
    });
  };

  jso_configure({
    "ibarcraft": {
      client_id: client_id,
      redirect_uri: ibarcraft_url("oauth.html"), // "http://ibarcraft.com/oauth.html"
      authorization: ibarcraft_url("oauth/authorize"),
      scope: ["public", "write"]
    }
  }, {"debug": debug});
  jso_wipe();
  jso_dump();
}

$(document).bind('deviceready', this.deviceready);
$(document).trigger('deviceready');
