$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            // Usando EmailJS en lugar de AJAX
            emailjs.send("service_coy5hnb", "template_zb5hhco", {
                name: name,
                email: email,
                subject: subject,
                message: message
            }).then(function(response) {
                // Mostrar mensaje de éxito
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                $('#success > .alert-success')
                        .append('</div>');
                $('#contactForm').trigger("reset");
            }, function(error) {
                // Mostrar mensaje de error
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
                $('#success > .alert-danger').append('</div>');
                $('#contactForm').trigger("reset");
            }).finally(function() {
                // Rehabilitar el botón de envío
                setTimeout(function () {
                    $this.prop("disabled", false);
                }, 1000);
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});
