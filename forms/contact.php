<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = strip_tags(trim($_POST["name"]));
    $email   = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);
    $captcha = $_POST["g-recaptcha-response"];

    // Verify reCAPTCHA
    $secretKey = "6LcHsvUqAAAAALV9_MjCQ8BNaFbNxmrl1f-GH11R";
    $verifyURL = "https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$captcha";
    $response = file_get_contents($verifyURL);
    $responseKeys = json_decode($response, true);

    if (!$responseKeys["success"]) {
        echo "reCAPTCHA verification failed.";
        exit;
    }

    // Email recipient
    $to = "tasinwasi646@gmail.com";
    $headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Error sending message.";
    }
} else {
    echo "Invalid request.";
}
?>
