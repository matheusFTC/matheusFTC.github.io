"use strict";

$("body").scrollspy({ target: "#menu" });

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

$("#buttonSend").on("click", function (event) {
    var name = $("#inputName").val();
    var email = $("#inputEmail").val();
    var subject = $("#inputSubject").val();
    var message = $("#textareaMessage").val();

    if (!name || !email || !subject || !message) {
        alert("Please enter your name, email, subject and message.");
    } else {
        $.post("https://postman-api.herokuapp.com", {
            from: "no-reply@matheusftc.github.io",
            to: "matheus.02468@gmail.com",
            subject: "Github Page Contact",
            text: name + " <" + email + ">: (" + subject + "): " + message
        }).done(function (data) {
            alert("Message sent successfully.");
        }).fail(function () {
            alert("Sorry, we could not send your message.");
        });
    }
});