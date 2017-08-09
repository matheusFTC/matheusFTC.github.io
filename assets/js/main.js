"use strict";

$("body").scrollspy({ target: "#menu" });
$("div.alert").hide();

$("#menu a").on("click", function (event) {
    if (this.hash !== "") {
        event.preventDefault();

        var hash = this.hash;

        $("html, body").animate({
            scrollTop: $(hash).offset().top
        }, 800, function () {
            window.location.hash = hash;
        });
    }
});

function alert(text, style) {
    $("div.alert")
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass(style)
        .text(text)
        .show();
};

function success(text) {
    alert(text, "alert-success");
};

function error(text) {
    alert(text, "alert-danger");
};

$("div#contact form button").on("click", function (event) {
    var name = $("#inputName").val();
    var email = $("#inputEmail").val();
    var subject = $("#inputSubject").val();
    var message = $("#textareaMessage").val();

    if (name && email && subject && message) {
        $("div#contact form button").prop("disabled", true);

        $.post("https://postman-api.herokuapp.com", {
            from: "no-reply@matheusftc.github.io",
            to: "matheus.02468@gmail.com",
            subject: "Github Page Contact",
            text: name + " <" + email + ">: (" + subject + "): " + message
        }).done(function (data) {
            success("Message sent successfully.");
        }).fail(function () {
            error("Sorry, we could not send your message.");
        }).always(function () {
            $("div#contact form input.form-control").val(null);
            $("div#contact form textarea.form-control").val(null);
            
            $("div#contact form button").prop("disabled", false);
        });
    } else {
        error("Please enter your name, email, subject and message.");
    }
});