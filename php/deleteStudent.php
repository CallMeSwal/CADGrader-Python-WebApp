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
if(isset($_POST["studentNum"])){
    $studentNum= mysqli_real_escape_string($conn, $_POST["studentNum"]);
	
	$sql = "DELETE FROM ass_marks WHERE Student_Number='".$studentNum."'";
	if ($conn->query($sql) === TRUE) {
		echo "Record updated successfully";
	} else {
		echo "Error updating record: " . $conn->error;
	}
	$sql2 = "DELETE FROM marking_data WHERE Student_Number='".$studentNum."'";
	if ($conn->query($sql2) === TRUE) {
		echo "Record updated successfully";
	} else {
		echo "Error updating record: " . $conn->error;
	}
}

$conn->close();
?>