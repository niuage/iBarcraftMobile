window.BarcraftView = Backbone.View.extend({

  initialize:function () {
    this.template = _.template(tpl.get('barcrafts/show'));
  },

  events: {
    "click #rsvp": "rsvp",
    "click #checkin": "checkin",
    "iInit [data-role=content]": "pageInit"
  },

  pageInit: function(e) {
    e.stopPropagation();
    token = jso_getToken("ibarcraft", "public")
    console.log("------------")
    // console.log(token);
    // if (token) {
      this.isAttending()
      // this.isCheckedin()
    // }
  },

  isAttending: function () {
    console.log("isAttending")
    self = this;
    barcraft_id = self.model.id
    $.oajax({
      jso_allowia: true,
      url: api_url("v1/barcrafts/" + barcraft_id + "/rsvps/attending"),
      jso_provider: "ibarcraft",
      // jso_scopes: ["public"],
      type: "GET",
      dataType: 'json',
      success: function(data) {
        // console.log("////////////////")
        console.log(data);
        if (data.rsvp) {
          $("#rsvp .ui-btn-text").html("Attending")
        }
      },
      error: function() {
        console.log("ERROR is attending");
      }
    });
  },

  isCheckedin: function () {

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
    self = this;
    barcraft_id = self.model.id

    e.preventDefault();
    $.oajax({
      jso_allowia: true,
      url: api_url("v1/barcrafts/" + barcraft_id + "/rsvps"),
      jso_provider: "ibarcraft",
      jso_scopes: ["write"],
      type: "POST",
      dataType: 'json',
      success: function(data) {
        self.newAttendee(data.rsvp.user);
      },
      error: function() {
        console.log("ERROR rsvp");
      }
    });
  },

  checkin: function(e) {
    self = this;
    barcraft_id = self.model.id

    e.preventDefault();
    $.oajax({
      jso_allowia: true,
      url: api_url("v1/barcrafts/" + barcraft_id + "/checkins"),
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
      success: function(checkin) {
        console.log(checkin);
        self.newCheckin(checkin);
      },
      error: function() {
        console.log("ERROR checking in");
      }
    });
  },

  newAttendee: function(user) {
    this.userListView.model.add({ user: user });
  },

  newCheckin: function(checkin) {
    this.checkinListView.model.add(checkin);
  }

});
