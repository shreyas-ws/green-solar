$(document).ready(function() {
    // Apply validation to each newsletter form separately
    $("form[form-validate='newsletter']").each(function() {
        $(this).validate({
            errorClass: "form_input-error-text", // Custom class for error text
            highlight: function(element) {
                $(element).addClass("error-border"); // Add error-border class to input field
            },
            unhighlight: function(element) {
                $(element).removeClass("error-border"); // Remove error-border class from input field
            },
            rules: {
                newsletter_email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                newsletter_email: {
                    required: "Please enter your email to subscribe",
                    email: "Please enter a valid email address"
                }
            }
        });
    });

    // Validate the contact form
    $("form[form-validate='contact']").validate({
        errorClass: "form_input-error-text", // Custom class for error text
        highlight: function(element) {
            $(element).addClass("error-border"); // Add error-border combo class to input field
        },
        unhighlight: function(element) {
            $(element).removeClass("error-border"); // Remove error-border class from input field
        },
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            privacy: {
                required: true,
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Your name must consist of at least 2 characters"
            },
            email: {
                required: "Please enter your email",
                email: "Please enter a valid email address"
            },
            privacy: {
                required: "Please accept the terms",
            }
        },
        errorPlacement: function(error, element) {
            // If the element is a checkbox, place the error message after .form_checkbox
            if (element.attr("name") == "privacy") {
                error.insertAfter(".form_checkbox");
            } else {
                error.insertAfter(element); // Default placement for other elements
            }
        },
    });
});