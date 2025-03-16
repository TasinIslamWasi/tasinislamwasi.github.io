document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload

    var formData = new FormData(this);

    fetch("contact.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("form-message").innerHTML = data; // Show response message
    })
    .catch(error => console.error("Error:", error));
});
