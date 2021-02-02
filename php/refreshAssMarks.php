<?php
session_start();
//set the headers to be a json string
//header('content-type: text/json');

//no need to continue if there is no value in the POST username
/* if(!isset($_POST['username']))
    exit;
	
if(!isset($_POST['password']))
    exit;
 */
$servername = "localhost";
$username = "root";
$password = "";
$db = "cadgrader";

$mysqli = new mysqli($servername, $username, $password, $db);
$marking_data = $mysqli->query("SELECT * FROM marking_data");
//$ass_marks = $mysqli->query("SELECT * FROM ass_marks");

//$_SESSION['attemptUsername']=$_POST['username'];
//$_SESSION['attemptPassword']=$_POST['password'];
while($md_row = mysqli_fetch_array($marking_data)){
	$studentNumber = $md_row['Student_Number'];
	$assName = $md_row['Assignment_Name'];
	
	$ass_marks = $mysqli->query("SELECT 1 FROM ass_marks WHERE Student_Number='$studentNumber' LIMIT 1");
	//check if student number row exists, if it doesn't exist insert it
	if (!($ass_marks->num_rows > 0)) {
		$studentNumberRow = "INSERT INTO ass_marks (Student_Number) VALUES ('$studentNumber')";
		//echo "doesn't exists<br>";
		$mysqli->query($studentNumberRow);
	}
	
	//check if assignment name column exists, if it doesn't exist add it
	$checkcolumn = $mysqli->query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='ass_marks' AND COLUMN_NAME = '$assName';");
	if (!($checkcolumn->num_rows > 0)){
		echo $assName."<br>";
		$assNameCol = "ALTER TABLE ass_marks ADD `{$assName}` VARCHAR (255) NULL DEFAULT 'No Submission'";
		$mysqli->query($assNameCol);
	} else {
		echo "column exists!";
	}
	
	//insert mark value into correct row and column
	$totalMark = '';
	$num=0;
	$den=0;
	$marking_data_SN = $mysqli->query("SELECT * FROM marking_data WHERE Student_Number='".$studentNumber."' AND Assignment_Name='".$assName."'");
	while($md_row2 = mysqli_fetch_array($marking_data_SN)){
		if($md_row2['Total_Mark']!="-"){
			$tMark = explode("/", $md_row2['Total_Mark']);
			$num+=(int)$tMark[0];
			$den+=(int)$tMark[1];
		}
	}
	$totalMark=$num."/".$den;
	$rowColCell = "UPDATE ass_marks SET `{$assName}`='".$totalMark."' WHERE Student_Number='".$studentNumber."'";
	$mysqli->query($rowColCell);
	
	$totalMark2 = '';
	$num2=0;
	$den2=0;
	$marking_data_SN2 = $mysqli->query("SELECT * FROM marking_data WHERE Student_Number='".$studentNumber."'");
	while($md_row2 = mysqli_fetch_array($marking_data_SN2)){
		if($md_row2['Total_Mark']!="-"){
			$tMark2 = explode("/", $md_row2['Total_Mark']);
			$num2+=(int)$tMark2[0];
			$den2+=(int)$tMark2[1];
		}
	}
	$totalMark2=$num2."/".$den2;
	$rowColCell2 = "UPDATE ass_marks SET Total_Mark ='".$totalMark2."' WHERE Student_Number='".$studentNumber."'";
	$mysqli->query($rowColCell2);
}
//return the json object containing the result of if the username exists or not. The $.post in our jquery will access it.
//echo json_encode(array('exists' => $result->num_rows > 0));
$mysqli->close();
?>