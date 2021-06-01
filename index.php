<?php
header('Access-Control-Allow-Origin: *');
$from=$_GET["from"];
$to=$_GET["to"];
$ch = curl_init("https://www.google.com/finance/quote/".$from."-".$to);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$content = curl_exec($ch);
curl_close($ch);
$html= substr($content,strpos($content,'data-last-price="')+strlen('data-last-price="'),60);

$html= substr($html,0,strpos($html,'"'));
echo $html;
?>