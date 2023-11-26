$(function () {
  // Get the form.
  var form = $("#working_form");

  // Get the messages div.
  var formMessages = $("#simple-msg");
  var formSubmitButton = $("#contact-form-submit");
  var loadingSpinner = $("#lds-roller-wrapper");

  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

    formSubmitButton.prop("disabled", true);
    formSubmitButton.css("color", "transparent");

    loadingSpinner.css("display", "block");

    $(formMessages).text("");
    formMessages.removeClass("success_msg");
    formMessages.removeClass("error_msg");

    function showError() {
      // Set the message text.

      $(formMessages).text(
        "Oops! An error occurred and your message could not be sent."
      );
      formMessages.addClass("error_msg");

      formSubmitButton.prop("disabled", false);
      formSubmitButton.css("color", "white");

      loadingSpinner.css("display", "none");
    }

    // Submit the form using AJAX.
    $.ajax({
      type: "POST",
      url: "https://script.google.com/macros/s/AKfycbyuKl-0Q_JU_SYnXPoVtYA1lgTwzL3H4eYIfI1mTBCjb-c4WgXUQR_zv3-ua0xgBgmmyg/exec",
      data: formData,
    })
      .done(function (response) {
        if (!response || !response.result || response.result === "error") {
          showError();
        } else {
          // Set the message text.
          $(formMessages).text("Your message was sent successfully!");
          formMessages.addClass("success_msg");

          // Clear the form.
          $("#working_form input,#working_form textarea").val("");

          formSubmitButton.prop("disabled", false);
          formSubmitButton.css("color", "white");
          loadingSpinner.css("display", "none");
        }
      })
      .fail(function (data) {
        showError();
      });
  });
});
