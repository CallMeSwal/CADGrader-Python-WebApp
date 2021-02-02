<?php
session_start();
//set the headers to be a json string
header('content-type: text/json');

//no need to continue if there is no value in the POST username
if(!isset($_POST['username']))
    exit;
	
if(!isset($_POST['password']))
    exit;

$servername = "localhost";
$username = "root";
$password = "";
$db = "cadgrader";

$mysqli = new mysqli($servername, $username, $password, $db);
$result = $mysqli->query("SELECT Version FROM login_info WHERE Username = '".$_POST['username']."'AND Password = '".$_POST['password']."'");

$_SESSION['attemptUsername']=$_POST['username'];
$_SESSION['attemptPassword']=$_POST['password'];
while($row = mysqli_fetch_array($result)){
	$_SESSION['Version']=$row['Version'];
}
//return the json object containing the result of if the username exists or not. The $.post in our jquery will access it.
echo json_encode(array('exists' => $result->num_rows > 0));
$mysqli->close();
?>