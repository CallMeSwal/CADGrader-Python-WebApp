<?php
	session_start();
	$username = $_GET["id"];
	$password = $_GET["pw"];
	$_SESSION['username']=$username;
	$_SESSION['password']=$password;
	
	if($_SESSION['Version']=='admin'){
		header("Location: ../admin.html");
	}
	else if($_SESSION['Version']=='student'){
		header("Location: ../student.html");
	}
	else{
		header("Location: ../data.html"); /* Redirect browser */
	}
	exit();	
?>