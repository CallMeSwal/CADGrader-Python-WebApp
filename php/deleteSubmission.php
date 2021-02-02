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
if(isset($_POST["data"])){
    $data = json_decode(stripslashes($_POST['data']));
	$count=0;
	foreach($data as $id){
		//echo $d;
		$sql = "DELETE FROM marking_data WHERE Identifier='".$id."'";
		if ($conn->query($sql) === TRUE) {
			//echo "Record updated successfully";
		} else {
			echo "Error updating record: " . $conn->error;
		}
		$count+=1;
	}
	echo $count;
}
$conn->close();
?>