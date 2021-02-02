<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cadgrader";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "hello";
// && $_POST["studentNumberVal"] != "" && $_POST["assNameVal"] != "" && $_POST["fileNameVal"] != "" && $_POST["ansFileNameVal"] != "" && $_POST["version"] != ""
if(isset($_POST["mark"]) && isset($_POST["markType"]) && isset($_POST["studentNumber"]) && isset($_POST["headCell"])){
    $mark= mysqli_real_escape_string($conn, $_POST["mark"]);
	$markType= mysqli_real_escape_string($conn, $_POST["markType"]);
	$studentNumber= mysqli_real_escape_string($conn, $_POST["studentNumber"]);
	$headCell= mysqli_real_escape_string($conn, $_POST["headCell"]);
	
	$sql = "UPDATE ass_marks SET `{$headCell}`='".$markType."' WHERE Student_Number='".$studentNumber."'";
	if ($conn->query($sql) === TRUE) {
		echo "Record updated successfully";
	} else {
		echo "Error updating record: " . $conn->error;
	}
}

$conn->close();
?>