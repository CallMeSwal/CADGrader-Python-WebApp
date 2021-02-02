<?php 
$connect= mysql_connect("localhost","root","") or die("Can't connect to database!");
$db = mysql_select_db("cadgrader",$connect) or die ("Can't select database!");
// && $_POST["studentNumberVal"] != "" && $_POST["assNameVal"] != "" && $_POST["fileNameVal"] != "" && $_POST["ansFileNameVal"] != "" && $_POST["version"] != ""
if($_POST["rowC"] !="" && $_POST["subjMark"] != "" && $_POST["studentNumberVal"] != "" && $_POST["assNameVal"] != "" && $_POST["fileNameVal"] != "" && $_POST["ansFileNameVal"] != "" && $_POST["versionVal"] != "")
{//VALUES ( '$sender','$receiver','$date','$time','$des');
    $rowC= mysql_real_escape_string($_POST["rowC"]);
	$studentNumberVal= mysql_real_escape_string($_POST["studentNumberVal"]);
	$assNameVal= mysql_real_escape_string($_POST["assNameVal"]);
	$fileNameVal= mysql_real_escape_string($_POST["fileNameVal"]);
	$ansFileNameVal= mysql_real_escape_string($_POST["ansFileNameVal"]);
	$versionVal= mysql_real_escape_string($_POST["versionVal"]);
    $subjMark= mysql_real_escape_string($_POST["subjMark"]);
	$lastMarked= mysql_real_escape_string($_POST["lastMarked"]);
	$totalMark= mysql_real_escape_string($_POST["totalMark"]);
	
    //bad code, change /5 to whatever mark is
    $sql = mysql_query("UPDATE marking_data SET Subjective_Mark='".$subjMark."/20', Student_Number='".$studentNumberVal."', Assignment_Name='".$assNameVal."', Submission_File_Name='".$fileNameVal."', Answer_File_Name='".$ansFileNameVal."', Version='".$versionVal."', Last_Marked='".$lastMarked."', Total_Mark='".$totalMark."' WHERE Identifier='".$rowC."'") or die(mysql_error());
}
//mysqli_close($connect);
mysql_close($connect);
?>