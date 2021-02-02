//login credentials
var USERNAME_TA="MacEng1TA";
var PASSWORD_TA="1234";
var USERNAME_ADMIN="MacEng1ADMIN";
var PASSWORD_ADMIN="admin";

//File Dialog Stuff
var ansFiles=[];
var studentFiles=[];

//PDF Files List
var pdfAnsFiles=[];
var pdfStudentFiles=[];

//newAss Properties
var newAssNameValue="";
var newAssToleranceValues = [[[25], [20], [15], [10], [5]], [[25], [20], [15], [10], [5]], [[25], [20], [15], [10], [5]], [[25], [20], [15], [10], [5]]];
var markingData = {
  "assName": "",
  "ansFiles": [], //changed from [] to ""
  "studentFiles": [], //changed from [] to ""
  "mMetrics": [], //changed from [] to ""
  "tolerance": [], //changed from [] to ""
  "markingDate": ""
}

var sendFiles = {
  "ansFiles": [],
  "studentFiles": [],
  "assName": ""
}

//python setup
//var PythonShell = require('python-shell');
/*
(function x() {
  var holder = document.getElementById('drag-file');
  holder.ondragover = () => {
    document.getElementById('drag-file').style.borderColor = 'rgb(' + 67 + ',' + 209 + ',' + 175 + ')';
    return false;
  };

  holder.ondragleave = () => {
    document.getElementById('drag-file').style.borderColor = 'rgb(' + 81 + ',' + 81 + ',' + 81 + ')';
    return false;
  };

  holder.ondragend = () => {
    document.getElementById('drag-file').style.borderColor = 'rgb(' + 81 + ',' + 81 + ',' + 81 + ')';
    return false;
  };

  holder.ondrop = (e) => {
    ansFiles=[];
    document.getElementById('drag-file').style.borderColor = 'rgb(' + 81 + ',' + 81 + ',' + 81 + ')';
    e.preventDefault();
    for (let f of e.dataTransfer.files) {
      if(f.path.split('.').pop()!="stl"){
        alert("Please enter STL files only.");
        alert(f.path);
        ansFiles=[];
        return false;
      }
      ansFiles.push(f.path);
    }
    document.getElementById('textDragFile').innerHTML = 'Files Successfully Uploaded<br><br>';
    //document.getElementById('drag-file-text').innerHTML = 'Files Successfully Uploaded<br><br><btn type="button" id="selectFiles" class="btn blue">Select</btn>"';
  };
})();

//drag-file2
(function y() {
  var holder = document.getElementById('drag-file2');
  holder.ondragover = () => {
    document.getElementById('drag-file2').style.borderColor = 'rgb(' + 67 + ',' + 209 + ',' + 175 + ')';
    return false;
  };

  holder.ondragleave = () => {
    document.getElementById('drag-file2').style.borderColor = 'rgb(' + 81 + ',' + 81 + ',' + 81 + ')';
    return false;
  };

  holder.ondragend = () => {
    document.getElementById('drag-file2').style.borderColor = 'rgb(' + 81 + ',' + 81 + ',' + 81 + ')';
    return false;
  };

  holder.ondrop = (e) => {
    studentFiles=[];
    document.getElementById('drag-file2').style.borderColor = 'rgb(' + 81 + ',' + 81 + ',' + 81 + ')';
    e.preventDefault();
    for (let f of e.dataTransfer.files) {
      if(f.path.split('.').pop()!="stl"){
        alert("Please enter STL files only.");
        studentFiles=[];
        return false;
      }
      studentFiles.push(f.path);
    }
    document.getElementById('textDragFile2').innerHTML = 'Files Successfully Uploaded<br><br>';
    //document.getElementById('drag-file-text').innerHTML = 'Files Successfully Uploaded<br><br><btn type="button" id="selectFiles" class="btn blue">Select</btn>"';
  };
})();
*/
Date.prototype.toDateInputValue = (function() {
    var today = new Date(this);
    var local = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    //alert(local.toJSON().slice(0,10));
    return local.toJSON().slice(0,10);
});

document.getElementById('selectDate').value = new Date().toDateInputValue();
document.getElementById("mainNEWASS").style.left = "0px";

function dateCheck(val){
  var today = new Date();
  var newVal = new Date(val);
  if(newVal <= today){
    alert("Please select a valid date.")
    document.getElementById('selectDate').value = new Date().toDateInputValue();
  }
}

//to newAss from student files upload
$("#back4").click(function(){
  $('#mainStudentFiles').animate({'left':'375px'}, 500, function() {});
  document.getElementById("mainNEWASS").style.left = "-375px";
  $('#mainNEWASS').animate({'left':'0px'}, 500, function() {});
});

$("#tolerance").click(function(){
  //$('#mainNEWASS').animate({'left':'375px'}, 500, function() {});
  if(document.getElementById('Vol').checked || document.getElementById('SA').checked || document.getElementById('CoG').checked || document.getElementById('MoI').checked){
    if(document.getElementById('Vol').checked){
      document.getElementById("VolTol").style.display = 'block';
    }
    else{
      document.getElementById("VolTol").style.display = 'none';
    }
    if(document.getElementById('SA').checked){
      document.getElementById("SATol").style.display = 'block';
    }
    else{
      document.getElementById("SATol").style.display = 'none';
    }
    if(document.getElementById('CoG').checked){
      document.getElementById("CoGTol").style.display = 'block';
    }
    else{
      document.getElementById("CoGTol").style.display = 'none';
    }
    if(document.getElementById('MoI').checked){
      document.getElementById("MoITol").style.display = 'block';
    }
    else{
      document.getElementById("MoITol").style.display = 'none';
    }
    document.getElementById("toleranceSelection").style.display = 'block';
    document.getElementById("toleranceSelection").style.top = "-500px";
    $('#toleranceSelection').animate({'top':'0px'}, 500, function() {});
  }
  else{
    alert("Please select a marking metric.");
  }
});

$("#closeTolerance").click(function(){
  //$('#mainNEWASS').animate({'left':'375px'}, 500, function() {});
  for(i = 0; i < 4; i++){
    for(j = 0; j < 5; j++){
      newAssToleranceValues[i][j]=document.getElementById("tol"+i+j).value;
    }
  }
  document.getElementById("toleranceSelection").style.display = 'none';
  $('#emailGuidelines').hide();
});
$("#select-file").click(function(){
  document.getElementById('attachement').click();
});

$("#select-file2").click(function(){
  document.getElementById('attachement2').click();
});

//file variables
var form_data;
var ins;
var form_data2;
var ins2;

function fileSelected(input){
	ansFiles=[];
	pdfAnsFiles=[];
	var nonCorrectFile=0;//change
	var form_data = new FormData();
	var ins = document.getElementById('attachement').files.length;
	var fileExt = "";
	for (var x = 0; x < ins; x++) {
		fileExt = document.getElementById('attachement').files[x].name.split('.').pop();
		if(fileExt=="stl"){
			ansFiles.push(document.getElementById('attachement').files[x].name);
			document.getElementById('textDragFile').innerHTML = 'Files Successfully Selected<br><br>';
		}
		else if(fileExt=="pdf"){
			pdfAnsFiles.push(document.getElementById('attachement').files[x].name);
			document.getElementById('textDragFile').innerHTML = 'Files Successfully Selected<br><br>';
		}
		else{
			/*
			ansFiles=[];
			pdfAnsFiles=[];
			alert("Please enter STL and PDF files only.");
			document.getElementById('textDragFile').innerHTML = 'Choose Answer STL Files<br>...<br>';
			return 0;
			*/
			document.getElementById('attachement').files[x]="";
			nonCorrectFile+=1;
		}
	}
}

function fileSelected2(input){
	studentFiles=[];
	pdfStudentFiles=[];
	var nonCorrectFile=0;//change
	var form_data2 = new FormData();
	var ins2 = document.getElementById('attachement2').files.length;
	var fileExt = "";
	for (var x = 0; x < ins2; x++) {
		fileExt = document.getElementById('attachement2').files[x].name.split('.').pop();
		if(fileExt=="stl"){
			studentFiles.push(document.getElementById('attachement2').files[x].name);
			document.getElementById('textDragFile2').innerHTML = 'Files Successfully Selected<br><br>';
		}
		else if(fileExt=="pdf"){
			pdfStudentFiles.push(document.getElementById('attachement2').files[x].name);
			document.getElementById('textDragFile2').innerHTML = 'Files Successfully Selected<br><br>';
		}
		else{
			/*
			studentFiles=[];
			pdfStudentFiles=[];
			alert("Please enter STL and PDF files only.");
			document.getElementById('textDragFile2').innerHTML = 'Choose Student STL Files<br>...<br>';
			return 0;
			*/
			document.getElementById('attachement2').files[x]="";
			nonCorrectFile+=1;
		}
	}
}

$( "#newAssName" ).keypress(function() {
  newAssNameValue=document.getElementById("newAssName").value;
});

$('#emailBody').val("Guidelines For Marking:\nAre all parts submitted correctly?(/4)\n-Are all files named correctly?\n-Are all files submitted?\nIs there no interference?(/1)\nAre all features present with no extraneous facets?(/10)\n-Does the model completely represent the drawing?\nDoes model contain correct shape and proportions?(/5)\n-Is the model made with the correct units?\nTotal Mark:(/20)");

//to newAss from student files upload
$("#setGuidelines").click(function(){
	newAssNameValue=document.getElementById("newAssName").value;
	if(newAssNameValue){
		if($('#emailHead').val()==""){
			$('#emailHead').val(newAssNameValue+" Guidelines");
		}
	}
	$('#emailGuidelines').slideToggle();
});

$("#createAssBut").click(function(){
  if(document.getElementById("newAssName").value !=""){
    document.getElementById("assNameLabel").innerHTML = document.getElementById("newAssName").value;
    if(document.getElementById('Vol').checked || document.getElementById('SA').checked || document.getElementById('CoG').checked || document.getElementById('MoI').checked){
      if(ansFiles !=""){
		var form_data = new FormData();
		var ins = document.getElementById('attachement').files.length;
		var fileExt = "";
		var nonCorrectFile=0;//change
		for (var x = 0; x < ins; x++) {
			fileExt = document.getElementById('attachement').files[x].name.split('.').pop();
			if(fileExt=="stl" || fileExt=="pdf"){
				form_data.append("files[]", document.getElementById('attachement').files[x]);
			}
			else{
				/*
				ansFiles=[];
				alert("Please enter STL files only.");
				return 0;
				*/
				document.getElementById('attachement').files[x]="";
				nonCorrectFile+=1;
			}
		}
		$.ajax({
			url: 'php/uploadFiles.php?name='+document.getElementById("newAssName").value, // point to server-side PHP script 
			dataType: 'text', // what to expect back from the PHP script
			cache: false,
			contentType: false,
			processData: false,
			data: form_data,
			type: 'post',
			success: function (response) {
				document.getElementById('textDragFile').innerHTML = 'Files Successfully Uploaded<br><br>';
			},
			error: function (response) {
				alert(response);
			}
		});
        $('#mainNEWASS').animate({'left':'-375px'}, 500, function() {});
        document.getElementById("mainStudentFiles").style.left = "375px";
        $('#mainStudentFiles').animate({'left':'0px'}, 500, function() {});
      }
      else{
        alert("Please select the answer files.")
      }
    }
    else{
      alert("Please select a marking metric.")
    }
  }
  else{
    alert("Please enter assignment name.");
  }
});

$("#markBut").click(function(){
  if(studentFiles!=""){
	//upload files
	var form_data2 = new FormData();
	var ins2 = document.getElementById('attachement2').files.length;
	var fileExt = "";
	var nonCorrectFile=0;//change
	for (var x = 0; x < ins2; x++) {
		fileExt = document.getElementById('attachement2').files[x].name.split('.').pop();
		if(fileExt=="stl" || fileExt=="pdf"){
			form_data2.append("files[]", document.getElementById('attachement2').files[x]);
		}
		else{
			/*
			studentFiles=[];
			alert("Please enter STL files only.");
			return 0;
			*/
			document.getElementById('attachement2').files[x]="";
			nonCorrectFile+=1;
		}
	}
	alert("Files being uploaded...");
	//run through ansFiles
	for (var i = 0; i < ansFiles.length; i++) {
		//adjust filepath
		ansFiles[i]='/wamp64/www/website_local/file_submissions/'+document.getElementById("newAssName").value+'/'+ansFiles[i];
	}
	
	//run through studentFiles
	for (var i = 0; i < studentFiles.length; i++) {
		//adjust filepath
		studentFiles[i]='/wamp64/www/website_local/file_submissions/'+document.getElementById("newAssName").value+'/'+studentFiles[i];
	}
	//Data to be sent database
    markingData = JSON.stringify({
      "assName": document.getElementById("newAssName").value,
      "ansFiles": ansFiles,
      "studentFiles": studentFiles,
      "mMetrics": [Boolean(document.getElementById('Vol').checked), Boolean(document.getElementById('SA').checked), Boolean(document.getElementById('CoG').checked), Boolean(document.getElementById('MoI').checked)],
      "tolerance": newAssToleranceValues,
      "markingDate": document.getElementById("selectDate").value,
	  "markingGuide": $('#emailBody').val()
    });
	
	sendFiles = JSON.stringify({
      "ansFiles": ansFiles,
      "studentFiles": studentFiles,
      "assName": document.getElementById("newAssName").value
    });
	//alert("start"); Might be crucial, don't delete
	//insert pdfs in database with pdfAnsFiles and pdfStudentFiles
   var uniqid = Date.now();
   if(pdfAnsFiles!="" && pdfStudentFiles!=""){
		$.ajax({
			type: 'POST',
			dataType: 'json', // what to expect back from the PHP script
			url: 'php/uploadPDFFiles.php', // point to server-side PHP script 
			data: {
				"assName": document.getElementById("newAssName").value,
				"pdfAnsFiles": pdfAnsFiles, 
				"pdfStudentFiles": pdfStudentFiles,
				"markingDate": document.getElementById("selectDate").value,
				"uuid":uniqid,
				"markingGuide": $('#emailBody').val()
			},
			success: function (response) {
				//document.getElementById('textDragFile').innerHTML = 'Files Successfully Uploaded<br><br>';
				//alert("PDF Successfully Uploaded");
			},
			error: function (response) {
				alert("error: uploadPDFFiles.php"+response);
			}
		});
	}
	
	$.ajax({
		url: 'php/uploadFiles.php?name='+document.getElementById("newAssName").value, // point to server-side PHP script 
		dataType: 'text', // what to expect back from the PHP script
		cache: false,
		contentType: false,
		processData: false,
		data: form_data2,
		type: 'post',
		success: function (response) {
			alert("Files successfully uploaded.");
			document.getElementById('textDragFile2').innerHTML = 'Files Successfully Uploaded<br><br>';
			//run python script and upload to server
			$.ajax({
				url: "http://localhost:92/website_local/cgi-bin/hi3.py",
				type: "POST",
				data: {foo: 'bar', bar: markingData},
				success: function(response){
					//$("#div").html(response);
					//alert("Files Successfully Graded. hi3.py ");
					//console.log("success"+response);
					var markedData=response;
					var markedArr=markedData.split(":");
					var markedArr2=[]
					for(var i=0; i<markedArr.length; i++){
						markedArr2.push(markedArr[i].split("|"));
					}
					for(var i=0; i<markedArr2.length; i++){
						if(markedArr2[11]){
							console.log("in there");
							if(markedArr2[11].toLowerCase=="true"){
								markedArr2[11]=true;
							}
							else if(markedArr2[11].toLowerCase=="false"){
								markedArr2[11]=false;
							}
						}
					}
					$.ajax({
						type: 'POST',
						//dataType: 'json', // what to expect back from the PHP script
						url: 'php/insertRecord.php', // point to server-side PHP script 
						data: {
							"markingGuide": $('#emailBody').val(),
							"markedData": markedArr2
						},
						success: function (response) {
							//document.getElementById('textDragFile').innerHTML = 'Files Successfully Uploaded<br><br>';
							alert("Files successfully graded.");
						},
						error: function (response) {
							alert("error: uploadPDFFiles.php"+response);
						}
					});
				},
				error: function(response){
					alert("Error hi3.py"+response);
					console.log("Error: hi3.py"+response);
				}
		   });
	   //alert("end"); Might be crucial, don't delete
		},
		error: function (response) {
			alert(response);
		}
	});
	
    //reset things
    ansFiles=[];
    studentFiles=[];
    newAssToleranceValues = [[[25], [20], [15], [10], [5]], [[25], [20], [15], [10], [5]], [[25], [20], [15], [10], [5]], [[25], [20], [15], [10], [5]]];
    document.getElementById("newAssName").value="";
    document.getElementById('Vol').checked=false;
    document.getElementById('SA').checked=false;
    document.getElementById('MoI').checked=false;
    document.getElementById('CoG').checked=false;
	
	//location.reload(true); commented this out
    //transition back
	/*
    $('#mainStudentFiles').animate({'left':'-375px'}, 500, function() {});
    document.getElementById("mainNEWASS").style.left = "375px";
    $('#mainNEWASS').animate({'left':'0px'}, 500, function() {});
	*/
    //reset more stuff
    document.getElementById('textDragFile').innerHTML = 'Drag Answer Files Here<br><br>';
    document.getElementById('textDragFile2').innerHTML = 'Drag Student Files Here<br><br>';
  }
  else{
    alert("Please select student files.");
  }
});
