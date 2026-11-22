<?php
/*
 * Contact form handler (contact.html → send-message.php → email).
 *
 * Security measures, in order:
 *  1. Only POST requests are accepted.
 *  2. Anti-spam: a hidden "website" field that only robots fill in,
 *     and a minimum time between displaying and sending the form.
 *  3. Rate limit: one message per minute for the same visitor (session).
 *  4. Every field is checked: type, length, valid email address.
 *  5. Email header injection is impossible: the visitor's text never goes
 *     into the headers, except the email address in Reply-To, which is
 *     validated by filter_var (it refuses line breaks).
 *  6. The email is sent as plain text: nothing the visitor writes can be
 *     interpreted as HTML or code.
 *  7. Nothing typed by the visitor is ever displayed back on a page:
 *     we only redirect to contact.html with a status word (sent, invalid...),
 *     so there is no risk of XSS (code injected into the page).
 * No database is used, so there is no SQL injection risk either.
 */

declare(strict_types=1);

// ----- Settings -----
// TODO: write the address that must receive the messages
const RECIPIENT = 'TODO-your-address@example.com';
const SENDER = 'no-reply@clement-demetz.com';       // must be an address of the website's domain (OVH)
const MIN_SECONDS = 3;                              // a human needs more than 3 s to fill in the form
const WAIT_SECONDS = 60;                            // one message per minute per visitor
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MIN_MESSAGE = 10;
const MAX_MESSAGE = 3000;

// Go back to the contact page with a status word (never with the visitor's text)
function back(string $status): void
{
    header('Location: contact.html?status=' . $status, true, 303);
    exit;
}

// Read a text field safely: missing or not a string → empty text
function field(string $name): string
{
    $value = $_POST[$name] ?? '';
    return is_string($value) ? trim($value) : '';
}

// 1. Only POST (someone opening the URL directly goes back to the form)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    back('invalid');
}

// 2a. Honeypot: a person never sees this field, so it must stay empty.
//     We pretend it worked, so the robot does not try again.
if (field('website') !== '') {
    back('sent');
}

// 2b. Sent too fast after the page was displayed → robot
$started = filter_var(field('started'), FILTER_VALIDATE_INT);
if ($started === false || time() - $started < MIN_SECONDS) {
    back('invalid');
}

// 3. Rate limit with the session (stored on the server, not changeable by the visitor)
session_start();
if (isset($_SESSION['last_message']) && time() - $_SESSION['last_message'] < WAIT_SECONDS) {
    back('wait');
}

// 4. Check every field
$name = field('name');
$email = field('email');
$message = field('message');
$consent = field('consent');

$nameLength = mb_strlen($name);
$messageLength = mb_strlen($message);

$isValid =
    $nameLength > 0 && $nameLength <= MAX_NAME
    && !preg_match('/[\r\n]/', $name)                       // a name never contains a line break
    && mb_strlen($email) <= MAX_EMAIL
    && filter_var($email, FILTER_VALIDATE_EMAIL) !== false   // real email format, no line breaks
    && $messageLength >= MIN_MESSAGE && $messageLength <= MAX_MESSAGE
    && $consent === 'yes';

if (!$isValid) {
    back('invalid');
}

// 5 & 6. Build a plain-text email. The subject and the headers are fixed:
//        only the validated email address is used, in Reply-To.
$subject = 'New message from the portfolio';

$body = "New message from the contact form of clement-demetz.com\n\n"
    . "Name: " . $name . "\n"
    . "Email: " . $email . "\n\n"
    . "Message:\n" . $message . "\n";

$headers = [
    'From' => 'Portfolio <' . SENDER . '>',
    'Reply-To' => $email,                       // "Reply" in the mailbox answers the visitor
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer' => 'PHP',
];

$sent = mail(RECIPIENT, $subject, $body, $headers);

if (!$sent) {
    back('error');
}

$_SESSION['last_message'] = time();
back('sent');
