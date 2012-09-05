window.BarcraftView = Backbone.View.extend({

  initialize:function () {
    this.template = _.template(tpl.get('barcrafts/show'));
  },

  events: {
    "click [data-role=rsvp]": "rsvp",
    "click #checkin": "checkin"
  },

  render: function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));

    this.userListView = this.createUserList();
    this.userListView.render();

    this.checkinListView = this.createCheckinList();
    this.checkinListView.render();

    return this;
  },

  createUserList: function () {
    return new UserListView({
      el: $("ul#user-list", this.el),
      model: new BarcraftUserCollection([], {
        barcraft_id: this.model.get("barcraft").id
      })
    });
  },

  createCheckinList: function () {
    return new CheckinListView({
      el: $("ul#checkin-list", this.el),
      model: new BarcraftCheckinCollection([], {
        barcraft_id: this.model.get("barcraft").id
      })
    });
  },

  rsvp: function(e) {
    barcraft_id = this.model.id

    e.preventDefault();
    $.oajax({
      jso_allowia: true,
      url: "http://api.ibarcraft.com/v1/barcrafts/" + barcraft_id + "/rsvps",
      jso_provider: "ibarcraft",
      jso_scopes: ["write"],
      type: "POST",
      dataType: 'json',
      success: function(data) {
        console.log(data);
      },
      error: function() {
        console.log("ERROR rsvp");
      },
      complete: function() {
      }
    });
  },

  checkin: function(e) {
    barcraft_id = this.model.id

    e.preventDefault();
    $.oajax({
      jso_allowia: true,
      url: "http://api.ibarcraft.com/v1/barcrafts/" + barcraft_id + "/checkins",
      jso_provider: "ibarcraft",
      jso_scopes: ["write"],
      type: "POST",
      data: {
        checkin: {
          message: "Yeah!",
          location: "40.862641,-74.465538"
        }
      },
      dataType: 'json',
      success: function(data) {
        console.log(data);
      },
      error: function() {
        console.log("ERROR checking in");
      },
      complete: function() {
        console.log("ayaaaa");
      }
    });
  }

});
