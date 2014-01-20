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
  
  $("#rsvpform").validate({
    rules: {
      accepted: "required",
      party_size_adults: "required",
      party_size_kids: "required",
      title: "required",
      first_name: "required",
      last_name: "required",
      email: {
        required: true,
        email: true
      },
    },
    messages: {
      accepted: "Please select your attendance",
      party_size_adults: "Please specify # of adults (12+) including yourself",
      party_size_kids: "Please specify # of kids (<12)",
      title: "Please specify your title",
      first_name: "Please enter your first name",
      last_name: "Please enter your last name",
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
