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
// && $_POST["studentNumberVal"] != "" && $_POST["assNameVal"] != "" && $_POST["fileNameVal"] != "" && $_POST["ansFileNameVal"] != "" && $_POST["version"] != ""
if(isset($_POST["studentNum"])){
    $studentNum= mysqli_real_escape_string($conn, $_POST["studentNum"]);
	$assName= mysqli_real_escape_string($conn, $_POST["assName"]);
	
	$sql = "SELECT Submission_File_Name, Total_Mark FROM marking_data WHERE Student_Number='".$studentNum."' AND Assignment_Name='".$assName."'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
    // output data of each row
		while($row = $result->fetch_assoc()) {
			echo $row["Submission_File_Name"]." ".$row["Total_Mark"]." Marks \n";
		}
	}
}

$conn->close();
?>