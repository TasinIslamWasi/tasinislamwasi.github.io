<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $receiving_email_address = 'tasinwasi646@gmail.com';

    // Validate and sanitize input data
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format!");
    }

    // Google reCAPTCHA validation (if enabled)
    $recaptcha_secret = 'YOUR_SECRET_KEY'; // Replace with your actual secret key
    if (isset($_POST['recaptcha-response'])) {
        $recaptcha_response = $_POST['recaptcha-response'];
        $verify_url = "https://www.google.com/recaptcha/api/siteverify?secret=$recaptcha_secret&response=$recaptcha_response";
        $verify_response = file_get_contents($verify_url);
        $captcha_success = json_decode($verify_response);
        if (!$captcha_success->success) {
            die("reCAPTCHA verification failed!");
        }
    }

    // Email Headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    if (mail($receiving_email_address, $subject, $message, $headers)) {
        echo "OK";
    } else {
        echo "Error sending email!";
    }
}
?>
