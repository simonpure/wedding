(function() {
  var FADE_IN_DURATION = 400;
  var FADE_OUT_DURATION = 400;

  // Display correct content based on hash.
  var menuId = window.location.hash;
  if (menuId.length > 0) {
    $(".content.visible").removeClass("visible").addClass("hidden");
    $(menuId).removeClass("hidden").addClass("visible");
  }

  $(".title").each(function() {
  $(this).click(function() {
    var menuId = $(this).attr("class").split(/\s+/).slice(-1)[0];
    window.location.hash = menuId;
    ga('send', 'event', 'menu', 'click', menuId);
    $(".content.visible").fadeOut(FADE_OUT_DURATION, function() {
      $(this).removeClass("visible").addClass("hidden");
      $("#" + menuId).fadeIn(FADE_IN_DURATION, function() {
        $(this).removeClass("hidden").addClass("visible");
        // Hack to force a refresh of Google Maps.
        $(".map iframe")[0].src = $(".map iframe")[0].src;
      });
      });
    });
  });

  $("#attendance").change(function() {
    ($(this).find(':selected').val() == "yes" ? 
      $("#rsvp_details").fadeIn(FADE_IN_DURATION, function() {
        $(this).removeClass("hidden").addClass("visible");
      }) :
      $("#rsvp_details").fadeOut(FADE_OUT_DURATION, function() {
        $(this).removeClass("visible").addClass("hidden");
      }))
  });
  $("#party_adults").change(function() {
    var guests = $(this).find(':selected').val() - 1;
    if (guests <= 0) {
      $("#adl_guests").fadeOut(FADE_OUT_DURATION, function() {
        $(this).removeClass("visible").addClass("hidden");
      });
      return;
    }
    var boxes = $("#adl_guests").find("input").length;
    if (guests - boxes >= 0) {
      for (var i = 0; i < (guests - boxes); i++) {
        $("#adl_guests").append($("#adl_guests").find("input").last().clone());
      }
    } else {
      for (var i = 0; i < (boxes - guests); i++) {
        $("#adl_guests").find("input").last().remove();
      }
    }
    $("#adl_guests").fadeIn(FADE_IN_DURATION, function() {
      $(this).removeClass("hidden").addClass("visible");
    });
  });
  $("#party_kids").change(function() {
    var guests = $(this).find(':selected').val();
    if (guests <= 0) {
      $("#adl_kids").fadeOut(FADE_OUT_DURATION, function() {
        $(this).removeClass("visible").addClass("hidden");
      });
      return;
    }
    var boxes = $("#adl_kids").find("input").length;
    if (guests - boxes >= 0) {
      for (var i = 0; i < (guests - boxes); i++) {
        $("#adl_kids").append($("#adl_kids").find("input").last().clone());
      }
    } else {
      for (var i = 0; i < (boxes - guests); i++) {
        $("#adl_kids").find("input").last().remove();
      }
    }
    $("#adl_kids").fadeIn(FADE_IN_DURATION, function() {
      $(this).removeClass("hidden").addClass("visible");
    });
  });
  
  $("#rsvpform").validate({
    rules: {
      accepted: "required",
      party_size_adults: "required",
      full_name: "required",
      email: {
        required: true,
        email: true
      },
    },
    messages: {
      accepted: "Please select your attendance",
      party_size_adults: "Please specify # of adults (12+) including yourself",
      full_name: "Please enter your first and last name",
      email: "Please enter a valid email address"
    },
    submitHandler: function(form) {
      $.post("/", $(form).serialize())
        .done(
          $("#rsvpform_outer").fadeOut(FADE_OUT_DURATION, function() {
            $(this).removeClass("visible").addClass("hidden");
            $("#conf_" + form.accepted.value).fadeIn(FADE_IN_DURATION, function() {
              $(this).removeClass("hidden").addClass("visible");
            });
          }));
   }});

})();
