//login credentials
var USERNAME_TA="MacEng1TA";
var PASSWORD_TA="1234";
var USERNAME_ADMIN="MacEng1ADMIN";
var PASSWORD_ADMIN="admin";

//File Dialog Stuff
var ansFiles=[];
var studentFiles=[];

//newAss Properties
var newAssNameValue="";
var newAssToleranceValues = [[[25], [20], [15], [10], [5]], [[25], [20], [15], [10], [5]], [[25], [20], [15], [10], [5]], [[25], [20], [15], [10], [5]]];
var markingData = {
  "ansFiles": [], //changed from [] to ""
  "studentFiles": [], //changed from [] to ""
  "mMetrics": [], //changed from [] to ""
  "tolerance": [], //changed from [] to ""
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


document.getElementById("mainNEWASS").style.left = "0px";

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
});
$("#select-file").click(function(){
  document.getElementById('attachement').click();
});

$("#select-file2").click(function(){
  document.getElementById('attachement2').click();
});

//open server file viewer
$("#selectServerFile").click(function(){
	document.getElementById("ansFileSelection").style.display = 'block';
	document.getElementById("ansFileSelection").style.top = "-500px";
	$('#ansFileSelection').animate({'top':'0px'}, 500, function() {});
});

//close server file viewer
$("#closeAnsFile").click(function(){
  //$('#mainNEWASS').animate({'left':'375px'}, 500, function() {});
  document.getElementById("ansFileSelection").style.display = 'none';
});

//file variables
var form_data2;
var ins2;

function fileSelected2(input){
	studentFiles=[];
	var form_data2 = new FormData();
	var ins2 = document.getElementById('attachement2').files.length;
	for (var x = 0; x < ins2; x++) {
		if(document.getElementById('attachement2').files[x].name.split('.').pop()=="stl"){
			studentFiles.push(document.getElementById('attachement2').files[x].name);
			//document.getElementById('textDragFile2').innerHTML = 'Files Successfully Selected<br><br>';
			document.getElementById('textDragFile2').innerHTML = document.getElementById('attachement2').files[x].name+"<br><br>";
		}
		else{
			studentFiles=[];
			alert("Please enter STL files only.");
			return 0;
		}
	}
}

$( "#newAssName" ).keypress(function() {
  newAssNameValue=document.getElementById("newAssName").value;
});

var fileNameID = 43;

//filter answer files
$("#ansFileFilt").on('change paste keyup input', function () {
	var ansFileFiltVal=$("#ansFileFilt").val().toLowerCase();
	var fileName;
	$('#ansFiles input:radio').each(function() {
		fileName=$(this).attr('id').toLowerCase();
		if(fileName.indexOf(ansFileFiltVal)!=-1 || ansFileFiltVal=="") {
			// You have a checked radio button here...
			$(this).parent().show();
		} 
		else {
			// Or an unchecked one here...
			$(this).parent().hide();
		}
	});
});

//select answer file and push it to array
$('#ansFiles input:radio').click(function() {
	//fileName=$(this).attr('id').toLowerCase();
	ansFiles=[$(this).attr('id')];
	document.getElementById('textDragFile').innerHTML = ansFiles[0]+"<br><br>";
});

$("#createAssBut").click(function(){
    if(document.getElementById('Vol').checked || document.getElementById('SA').checked || document.getElementById('CoG').checked || document.getElementById('MoI').checked){
      if(ansFiles !="" || ansFiles !=[]){
		fileNameID = Date.now()+Math.floor(Math.random() * 100);
		
		//document.getElementById('textDragFile').innerHTML = 'Files Successfully Uploaded<br><br>';
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
});

$("#markBut").click(function(){
  if(studentFiles!="" || studentFiles!={}){
	//upload files
	var form_data2 = new FormData();
	var ins2 = document.getElementById('attachement2').files.length;
	for (var x = 0; x < ins2; x++) {
		if(document.getElementById('attachement2').files[x].name.split('.').pop()=="stl"){
			form_data2.append("files[]", document.getElementById('attachement2').files[x]);
		}
		else{
			studentFiles=[];
			alert("Please enter STL files only.");
			return 0;
		}
	}
	$.ajax({
		url: 'php/uploadFiles.php?name='+fileNameID, // point to server-side PHP script 
		dataType: 'text', // what to expect back from the PHP script
		cache: false,
		contentType: false,
		processData: false,
		data: form_data2,
		type: 'post',
		success: function (response) {
			alert("Files successfully uploaded.");
			//document.getElementById('textDragFile2').innerHTML = 'Files Successfully Uploaded<br><br>';
		},
		error: function (response) {
			alert(response);
		}
	});
	alert("Files being uploaded...");

	//run through ansFiles
	for (var i = 0; i < ansFiles.length; i++) {
		//adjust filepath
		ansFiles[i]='/wamp64/www/website_local/file_practice_answer/'+ansFiles[i];
	}
	
	//run through studentFiles
	for (var i = 0; i < studentFiles.length; i++) {
		//adjust filepath
		studentFiles[i]='/wamp64/www/website_local/file_practice/'+fileNameID+'/'+studentFiles[i];
	}
	
    //Data to be sent database
    markingData = JSON.stringify({
      "ansFiles": ansFiles,
      "studentFiles": studentFiles,
      "mMetrics": [Boolean(document.getElementById('Vol').checked), Boolean(document.getElementById('SA').checked), Boolean(document.getElementById('CoG').checked), Boolean(document.getElementById('MoI').checked)],
      "tolerance": newAssToleranceValues
    });

	//alert("start"); Might be crucial, don't delete
	//run python script and upload to server
	$.ajax({
		url: "http://localhost:92/website_local/cgi-bin/studentTest.py",
		type: "POST",
		data: {foo: 'bar', bar: markingData},
		success: function(response){
			//$("#div").html(response);
			//alert("Success"+response); Might be crucial, don't delete
			//console.log("success"+response);
			alert(response);
			$.ajax({
				url: 'php/deleteFolder.php?name='+fileNameID, // point to server-side PHP script 
				dataType: 'text', // what to expect back from the PHP script
				cache: false,
				contentType: false,
				processData: false,
				type: 'post',
				success: function (response) {
					//alert("hii.");
				},
				error: function (response) {
					alert(response);
				}
			});
			//reset things	
			ansFiles=[];
			studentFiles=[];
			newAssToleranceValues = [[[25], [20], [15], [10], [5]], [[25], [20], [15], [10], [5]], [[25], [20], [15], [10], [5]], [[25], [20], [15], [10], [5]]];
			document.getElementById('Vol').checked=false;
			document.getElementById('SA').checked=false;
			document.getElementById('MoI').checked=false;
			document.getElementById('CoG').checked=false;
			
			//location.reload(true); commented this out
			//transition back
			
			$('#mainStudentFiles').animate({'left':'-375px'}, 500, function() {});
			document.getElementById("mainNEWASS").style.left = "375px";
			$('#mainNEWASS').animate({'left':'0px'}, 500, function() {});
			
			//reset more stuff
			document.getElementById('textDragFile').innerHTML = 'Choose Submission STL File<br>...<br>';
			document.getElementById('textDragFile2').innerHTML = 'Choose Submission STL File<br>...<br>';
			$("#attachement")[0].value = '';
			$("#attachement2")[0].value = '';
		},
		error: function(response){
			alert("Error"+response);
			alert("Please refresh page.");
			console.log("Error"+response);
		}
   });
   //alert("end"); //Might be crucial, don't delete
    //location.reload()
  }
  else{
    alert("Please select student files.");
  }
});
