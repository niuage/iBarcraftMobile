window.BarcraftView = Backbone.View.extend({

  initialize:function () {
    this.template = _.template(tpl.get('barcrafts/show'));
  },

  events: {
    "click [data-role=rsvp]": "rsvp",
    "click [data-role=checkin]": "checkin"
  },

  render: function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  rsvp: function(e) {
    jso_ensureTokens({
      "ibarcraft": ["public", "write"]
    });

    barcraft_id = this.model.id

    e.preventDefault();
    $.oajax({
      url: "http://api.ibarcraft.com/v1/barcrafts/" + barcraft_id + "/rsvps",
      jso_provider: "ibarcraft",
      jso_scopes: ["write"],
      type: "POST",
      dataType: 'json',
      success: function(data) {
        console.log("Response (bridge):");
        console.log(data);
      },
      error: function() {
        console.log("ERROR Custom callback()");
      },
      complete: function() {
        console.log("ayaaaa");
      }
    });
  },

  checkin: function(e) {
    jso_ensureTokens({
      "ibarcraft": ["public", "write"]
    });

    barcraft_id = this.model.id

    e.preventDefault();
    $.oajax({
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
        console.log("Response (bridge):");
        console.log(data);
      },
      error: function() {
        console.log("ERROR Custom callback()");
      },
      complete: function() {
        console.log("ayaaaa");
      }
    });
  }

});
