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
//echo "hello";
// && $_POST["studentNumberVal"] != "" && $_POST["assNameVal"] != "" && $_POST["fileNameVal"] != "" && $_POST["ansFileNameVal"] != "" && $_POST["version"] != ""
if(isset($_POST["markedData"])){
	//Get Marked Data
	$markedData=$_POST['markedData'];
	$markingGuide=$_POST['markingGuide'];
	foreach($markedData as $row){
		//$exists = "DELETE FROM marking_data WHERE Student_Number='".$row[0]."' AND Assignment_Name='".$row[1]."' AND Submission_File_Name='".$row[2]."'";
		//$conn->query($exists);		
		$rec = "INSERT INTO marking_data (Student_Number, Assignment_Name, Submission_File_Name, Answer_File_Name, Version, Vol_Mark, SA_Mark, CoG_Mark, MoI_Mark, Subjective_Mark, Total_Mark, Flag, Identifier, Marking_Date, Reasons_Flagged, Marking_Guide) VALUES ('$row[0]', '$row[1]', '$row[2]', '$row[3]', '$row[4]', '$row[5]', '$row[6]', '$row[7]', '$row[8]', '$row[9]', '$row[10]', $row[11], '$row[12]', '$row[13]', '$row[14]', '$markingGuide')";
		$conn->query($rec);
	}	
}
//$sql = "UPDATE ass_marks SET `{$headCell}`='".$markType."' WHERE Student_Number='".$studentNumber."'";
echo "hi";
$conn->close();
?>