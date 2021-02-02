$("#demo td").click(function(e){     //function_td
	//html cell value
	var mark=$(this).text();
	//row and col index
	var $tr=$(this).closest('tr');
	var colNum=$(this).index();
	var rowNum=$tr.index();
	//row and col values
	var head = $("#demo thead")[0];
	var body = $("#demo tbody")[0];
	var headCell = head.rows[0].cells[colNum].innerHTML; // This is a DOM "TD" element
	var studentNumber = body.rows[rowNum].cells[1].innerHTML; // This is a DOM "TD" element
	if(colNum>2){
		if(mark=="MSAF"){
			if(confirm("Remove MSAF label from assignment?") == true){
				$.ajax({
					type: "POST",
					url: '../website_local/php/updateAssMarks.php',
					data: {mark:mark, markType:"No Submission", studentNumber:studentNumber, headCell:headCell},
					success: function (response) {
						//alert(response);
						//$(this).text("No Submission");
						body.rows[rowNum].cells[colNum].innerHTML="No Submission";
						alert("MSAF REMOVED");
					},
					error: function (response) {
						alert(response);
					}
				});
			}
		}
		else if(mark=="No Submission"){
			if(confirm("Label assignment as MSAF?") == true){
				$.ajax({
					type: "POST",
					url: '../website_local/php/updateAssMarks.php',
					data: {mark:mark, markType:"MSAF", studentNumber:studentNumber, headCell:headCell},
					success: function (response) {
						body.rows[rowNum].cells[colNum].innerHTML="MSAF";
						alert("MSAF ADDED");
					},
					error: function (response) {
						alert(response);
					}
				});
			}
		}
		else if(mark.indexOf("/")!=-1){
			$.ajax({
				type: "POST",
				url: '../website_local/php/returnAss.php',
				data: {studentNum:studentNumber, assName: headCell},
				success: function (response) {
					alert("Assignments Submitted:\n"+response);
				},
				error: function (response) {
					alert(response);
				}
			});
		}
	}
	if(colNum==1){
		if(confirm("Delete student number?") == true){
			if(confirm("Student number and all associated assignments will be deleted. Continue?") == true){
				$.ajax({
					type: "POST",
					url: '../website_local/php/deleteStudent.php',
					data: {studentNum:mark},
					success: function (response) {
						alert("Student number successfully deleted.");
						$("#demo tr:eq("+rowNum+1+")").hide();
					},
					error: function (response) {
						alert(response);
					}
				});
			}
		}
	}
  e.stopPropagation();
});

$('#filterBut').click(function(e){
    $('#filterBox').slideToggle();
});

$("#flagFilt, #studentNumberFilt, #missedAssFilt, #msafFilt").on('change paste keyup input', function () {
	//filter values
	var flagFiltVal = document.getElementById('flagFilt').value;//flag filt value
	var studentNumberFiltVal = document.getElementById('studentNumberFilt').value.toLowerCase();//Student Number filt value
	var missedAssFiltVal = document.getElementById('missedAssFilt').value;//flag filt value
	var msafFiltVal = document.getElementById('msafFilt').value;//flag filt value
	//number of rows on table
	var rowCount = $('#demo tr').length;
	for(var i=1; i<rowCount; i++){
		//row values
		var flagRowVal=$("#demo tr:eq("+i+")").attr('class');
		var studentNumberRowVal=$("#demo tr:eq("+i+") td:eq(1)").html().toLowerCase();
		//var assNameRowVal=$("#demo tr:eq("+i+") td:eq(2)").html().toLowerCase();
		//var ansFileNameRowVal=$("#demo tr:eq("+i+") td:eq(4)").html().toLowerCase();
		//var versionRowVal=$("#demo tr:eq("+i+") td:eq(5)").html().toLowerCase();
		var shown = true;
		//check to see if number of submissions is greater selected number
		if(missedAssFiltVal!=0){
			var count=0;
			for(var j=2; j<$( "#demo tr:nth-child("+i+") td" ).length; j++){
					if($("#demo tr:eq("+i+") td:eq("+j+")").html()=="No Submission"){
						count++
					}
					if(count<missedAssFiltVal){
						shown=false;
					}
					else if(count>=missedAssFiltVal){
						shown=true;
						break;
					}
			}
		}
		if(studentNumberFiltVal && studentNumberRowVal.indexOf(studentNumberFiltVal)==-1){
			shown=false;
		}
		else if(flagFiltVal && flagFiltVal!=flagRowVal){
			shown=false;
		}
		//check to see if MSAF in row
		if(msafFiltVal=="msafUsed"){
			for(var j=2; j<$( "#demo tr:nth-child("+i+") td" ).length; j++){
					if($("#demo tr:eq("+i+") td:eq("+j+")").html()!="MSAF"){
						shown=false;
					}
					else if($("#demo tr:eq("+i+") td:eq("+j+")").html()=="MSAF"){
						shown=true;
						break;
					}
			}
		}
		/*
		else if(assNameFiltVal && assNameRowVal.indexOf(assNameFiltVal)==-1){
			shown=false;
		}
		else if(ansFileNameFiltVal && ansFileNameRowVal.indexOf(ansFileNameFiltVal)==-1){
			shown=false;
		}
		else if(versionFiltVal && versionRowVal.indexOf(versionFiltVal)==-1){
			shown=false;
		}
		else if(flagFiltVal && flagFiltVal!=flagRowVal){
			shown=false;
		}*/
		if(shown){
			$("#demo tr:eq("+i+")").show();
		}
		else{
			$("#demo tr:eq("+i+")").hide();
		}
		
	}
});

//converts table to json, where headers are table, gets stored in global variable
$("#csvBut").click(function(){
	var tableJSON={};
	var tableArr=[];
	//alert("Table as filtered below successfully downloaded.");
	$('#demo tr').each(function(){
		if($(this).is(':visible')){
			var row = [];
			$(this.cells).each(function(){
				if($(this).is(':visible')){
					if($(this).attr('class')){
						if($(this).attr('class')=="flaggedBox"){
							row.push("Flagged");
						}
						else if($(this).attr('class')=="notFlaggedBox"){
							row.push("Not Flagged");
						}
					}
					else if($(this).text().indexOf("/")!="-1"){
						var num=$(this).text().split("/")[0];
						row.push((num));
					}
					else{
						row.push(($(this).text()));
					}
				};
			});
			tableArr.push(row);
		};
	});
	//embedd in json
	tableJSON=JSON.stringify({
		"tableArr":tableArr
	});
	//run python script and upload to server
	$.ajax({
		url: "http://localhost:92/website_local/cgi-bin/makeCSV.py",
		type: "POST",
		data: {bar: tableJSON},
		success: function(response){
			//$("#div").html(response);
			alert("CSV successfully filtered and downloaded.");
			var csvURL=response;
			window.open(csvURL);
		},
		error: function(response){
			alert("Error"+response);
			console.log("Error"+response);
		}
	});
	//alert("end"); Might be crucial, don't delete
});