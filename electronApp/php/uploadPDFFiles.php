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
$uuid= $_POST["uuid"];
$name=$_POST['assName'];
$markingDate=$_POST['markingDate'];
$pdfStudentFiles=$_POST['pdfStudentFiles'];
$pdfAnsFiles=$_POST['pdfAnsFiles'];
$markingGuide=$_POST['markingGuide'];
foreach($pdfStudentFiles as $studentFile){
	$uuid=md5(uniqid(rand(), true));
	$versionList=explode("_", $studentFile);
	$version1=$versionList[1];
	$version2=explode(".", $version1);
	$version=$version2[0];
	$studentNumber=$versionList[0];
	$ansFileCor="File Not Found";
	$flag=True;
	foreach($pdfAnsFiles as $ansFile){
		$versionList2=explode("_", $ansFile);
		$ansVersion1=$versionList2[1];
		$ansVersion2=explode(".", $ansVersion1);
		$ansVersion=$ansVersion2[0];
		if($version==$ansVersion){
			$ansFileCor=$ansFile;
			$flag=0;
		}
	}
	if($ansFileCor=="File Not Found"){
		$version="NV";
	}
	$exists = "DELETE FROM marking_data WHERE Student_Number='".$studentNumber."' AND Assignment_Name='".$name."' AND Submission_File_Name='".$studentFile."'";
	$mysqli->query($exists);
	$row = "INSERT INTO marking_data (Student_Number, Assignment_Name, Submission_File_Name, Answer_File_Name, Version, Vol_Mark, SA_Mark, CoG_Mark, MoI_Mark, Subjective_Mark, Total_Mark, Flag, Identifier, Marking_Date, Reasons_Flagged, Marking_Guide) VALUES ('$studentNumber', '$name', '$studentFile', '$ansFileCor', '$version', '-', '-', '-', '-', '0/0', '0/0', $flag, '$uuid', '$markingDate', 'None', '$markingGuide')";
	$mysqli->query($row);
}
$mysqli->close();
print('{}');
?>