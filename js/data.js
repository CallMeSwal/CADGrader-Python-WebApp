//Hide columns by default
/*
$('td:nth-child(4),th:nth-child(4)').hide();
$('td:nth-child(5),th:nth-child(5)').hide(); 

$("#backBut").click(function(){
	$('td:nth-child(4),th:nth-child(4)').show();
	$('td:nth-child(5),th:nth-child(5)').show();
});
*/
var colCount=12;
function checkbox(id, colNum){
	if(document.getElementById(id).checked === true){
		//document.getElementById(id+'Box').style.backgroundColor = "grey";
		$('td:nth-child(' + colNum + '),th:nth-child(' + colNum + ')').show();
		$('td:nth-child(' + colNum + '),th:nth-child(' + colNum + ')').show();
		colCount+=1;
	}else{
		if(colCount>3){
			document.getElementById(id+'Box').style.backgroundColor = "rgb(51, 51, 51)";
			$('td:nth-child(' + colNum + '),th:nth-child(' + colNum + ')').hide();
			$('td:nth-child(' + colNum + '),th:nth-child(' + colNum + ')').hide();
			
			colCount-=1;
		}
		else{
			document.getElementById(id).checked = true;
			alert("Please select atleast three columns.");
		}
	}
}

document.getElementById("dataTableCont").addEventListener("scroll", function(){
   var translate = "translate(0,"+this.scrollTop+"px)";
   this.querySelector("thead").style.transform = translate;
});
/*
$(document).ready(function() {
	$('#demo tr').each(function() {
		if (this.rowIndex){; // skip first row
			var num = parseInt(this.cells[6].innerHTML[0]) + parseInt(this.cells[7].innerHTML[0]) + parseInt(this.cells[8].innerHTML[0]) + parseInt(this.cells[9].innerHTML[0]) + parseInt(this.cells[10].innerHTML[0]);
			var den = parseInt(this.cells[6].innerHTML[2]) + parseInt(this.cells[7].innerHTML[2]) + parseInt(this.cells[8].innerHTML[2]) + parseInt(this.cells[9].innerHTML[2]) + parseInt(this.cells[10].innerHTML[2]);
			this.cells[11].innerHTML=num+"/"+den;
		}
	});
});
*/
var url="index.html"
$("#backBut").click(function(){
	if(version=="admin"){
		window.location.href = url;
	}
	else{
		window.location.href = url;
	}
});

var row;

var lastMarked="";
var reasonsFlagged;
var prevent_popup=false;
var prevent_popup2=false;

var dateObj = new Date();
var dateVal = dateObj.toLocaleDateString();

var assignmentNameURL;
var submissionNameURL;
var answerNameURL;

if(version!="admin"){
	document.getElementById('dateTitle').innerHTML="Ver. "+version+", Mark By: "+dateVal;
	url="index.html"
}
else{
	document.getElementById('dateTitle').innerHTML="Mark By: "+dateVal;
	url="admin.html"
}
$('#demo tr').click(function() {
	var subjChange=false;
	if (this.rowIndex){ // skip first row
		num=this.rowIndex;
		row=this;
		
		assignmentNameURL=$("#demo tr:eq("+num+") td:eq(2)").html();
		submissionNameURL=$("#demo tr:eq("+num+") td:eq(3)").html();
		answerNameURL=$("#demo tr:eq("+num+") td:eq(4)").html();
		
		var fileExt = submissionNameURL.split('.').pop();
		if(fileExt=="stl"){http://docs.google.com/gview?url=http://path.com/to/your/pdf.pdf&embedded=true
			document.getElementById('studentFileViewer').setAttribute('src', "http://www.viewstl.com/?embedded&url=http://localhost:92/website_local/file_submissions/"+assignmentNameURL+"/"+submissionNameURL+"&local");
			document.getElementById('answerFileViewer').setAttribute('src', "http://www.viewstl.com/?embedded&url=http://localhost:92/website_local/file_submissions/"+assignmentNameURL+"/"+answerNameURL+"&local");
		}
		else if(fileExt=="pdf"){
			//document.getElementById('studentFileViewer').setAttribute('src', "http://docs.google.com/gview?url=http://localhost:92/website_local/file_submissions/"+assignmentNameURL+"/"+submissionNameURL+"&embedded=true");
			//document.getElementById('answerFileViewer').setAttribute('src', "http://docs.google.com/gview?url=http://localhost:92/website_local/file_submissions/"+assignmentNameURL+"/"+submissionNameURL+"&embedded=true");
			document.getElementById('studentFileViewer').setAttribute('src', "file_submissions/"+assignmentNameURL+"/"+submissionNameURL);
			document.getElementById('answerFileViewer').setAttribute('src', "file_submissions/"+assignmentNameURL+"/"+answerNameURL);
		}
		document.getElementById('fileViewer').style.display="Block";
		
		//update textbox
		/*
		if($("#demo tr:eq("+num+") td:eq(0)").attr('class')=='notFlaggedBox'){
			$("#flagFilt2").val('Not Flagged');
		}
		else if($("#demo tr:eq("+num+") td:eq(0)").attr('class')=='flaggedBox'){
			$("#flagFilt2").val('Flagged');
		}*/
		document.getElementById('studentNumberFilt2').value=$("#demo tr:eq("+num+") td:eq(1)").html();
		document.getElementById('assNameFilt2').value=$("#demo tr:eq("+num+") td:eq(2)").html();
		document.getElementById('fileNameFilt2').value=$("#demo tr:eq("+num+") td:eq(3)").html();
		document.getElementById('ansFileNameFilt2').value=$("#demo tr:eq("+num+") td:eq(4)").html();
		document.getElementById('versionFilt2').value=$("#demo tr:eq("+num+") td:eq(5)").html();
		document.getElementById('subjFilt2').value=$("#demo tr:eq("+num+") td:eq(10)").html()[0];
		
		document.getElementById('studentFileDownloadLink').href="file_submissions/"+$("#demo tr:eq("+num+") td:eq(2)").html()+"/"+$("#demo tr:eq("+num+") td:eq(3)").html();
		document.getElementById('answerFileDownloadLink').href="file_submissions/"+$("#demo tr:eq("+num+") td:eq(2)").html()+"/"+$("#demo tr:eq("+num+") td:eq(4)").html();
		
		$('#subjFilt2').on('input', function() {
			var subjMark = $(this).val();
			if(subjMark){
				subjChange=true
				/*
				if(subjMark[0]<=$("#demo tr:eq("+num+") td:eq(10)").html()[2]){
					//$("#demo tr:eq("+num+") td:eq(10)").html(subjMark[0] + "/5");
					subjChange=true;
				}
				else{
					alert("Please enter valid value!");
					document.getElementById('subjFilt2').value="";
				}*/
			}
		})
	}
	$('#showLog').click(function(e){
		if(!prevent_popup){
			alert("Last Marked By: "+$("#demo tr:eq("+num+") td:eq(13)").html()+"Subj. Mark Given: "+$("#demo tr:eq("+num+") td:eq(10)").html());
			prevent_popup=true;
			$('#studentFileViewer').addClass('fullScreen');
			setTimeout('prevent_popup=false;',1000);
			
		}
	});
	$("#markingGuide").click(function(){
		if(!prevent_popup2){
			var ident=$("#demo tr:eq("+num+")").attr("id");
			$.ajax({
				type: "POST",
				url: '../website_local/php/returnMarkingGuide.php',
				data: {id:ident},
				success: function (response) {
					alert(response);
				},
				error: function (response) {
					alert(response);
				}
			});
			prevent_popup2=true;
			setTimeout('prevent_popup2=false;',1000);
		}
	});
	$('#updateFile').click(function(e){
		if(document.getElementById('fileNameFilt2').value && document.getElementById('studentNumberFilt2').value && document.getElementById('assNameFilt2').value && document.getElementById('ansFileNameFilt2').value && document.getElementById('versionFilt2').value && document.getElementById('subjFilt2').value){
			var c = $("#demo tr:eq("+num+")").attr("id");
		
			//var flagVal = document.getElementById('flagFilt2').value;
			var studentNumberVal = document.getElementById('studentNumberFilt2').value;
			var assNameVal = document.getElementById('assNameFilt2').value;
			var fileNameVal = document.getElementById('fileNameFilt2').value;
			var ansFileNameVal = document.getElementById('ansFileNameFilt2').value;
			var versionVal = document.getElementById('versionFilt2').value;
			var subjMark= document.getElementById('subjFilt2').value;
			
			//writing to table
			$("#demo tr:eq("+num+") td:eq(1)").html(studentNumberVal);
			$("#demo tr:eq("+num+") td:eq(2)").html(assNameVal);
			$("#demo tr:eq("+num+") td:eq(3)").html(fileNameVal);
			$("#demo tr:eq("+num+") td:eq(4)").html(ansFileNameVal);
			$("#demo tr:eq("+num+") td:eq(5)").html(versionVal);
			$("#demo tr:eq("+num+") td:eq(10)").html(subjMark + "/20");
			$("#demo tr:eq("+num+") td:eq(13)").html(usernameLog+" "+dateVal+"\n");
			var nume = 0;
			var dene = 0;
			var numb = [];
			for(var i=6; i<=10; i++){
				if(row.cells[i].innerHTML!="-"){
					numb=row.cells[i].innerHTML.split("/");
					nume+=parseInt(numb[0]);
					dene+=parseInt(numb[1]);
				}
			}
			
			row.cells[11].innerHTML=nume+"/"+dene;
			var totalMark = row.cells[11].innerHTML;
			
			//update last marked variable and write to log
			var temp2 = $("#demo tr:eq("+num+") td:eq(13)").html();
			$.ajax({
				type: "POST",
				url: 'php/insert.php',
				data: {rowC:c, studentNumberVal:studentNumberVal, assNameVal:assNameVal, fileNameVal:fileNameVal, ansFileNameVal:ansFileNameVal, versionVal:versionVal, subjMark:subjMark, lastMarked:temp2, totalMark:totalMark}
			});
			
			document.getElementById('fileViewer').style.display="None";
		}
		else{
			alert("Please fill in all values");
		}
	});
})

$("#fullScreenStudent").click(function(){
	document.getElementById('fullViewer').setAttribute('src', document.getElementById('studentFileViewer').src);
	document.getElementById('fullViewer').style.display="block";
	setTimeout(function(){
		document.getElementById('closeFullScreen').style.display="block";
	}, 1500); 
});

$("#fullScreenAnswer").click(function(){
	document.getElementById('fullViewer').setAttribute('src', document.getElementById('answerFileViewer').src);
	document.getElementById('fullViewer').style.display="block";
	setTimeout(function(){
		document.getElementById('closeFullScreen').style.display="block";
	}, 1500);
});

$("#closeFullScreen").click(function(){
	document.getElementById('fullViewer').style.display="none";
	document.getElementById('closeFullScreen').style.display="none";
	document.getElementById('fullViewer').setAttribute('src', "");
});

//converts table to json, where headers are table, gets stored in global variable
$("#csvBut").click(function(){
	var tableJSON={};
	var tableArr=[];
	var num2=0;
	var markedBy;
	var taGradesArr=[];
	var rowI;
	var colI;
	//alert("Table as filtered below successfully downloaded.");
	$('#demo tr').each(function(){
		if($(this).is(':visible')){
			var row = [];
			markedBy=$("#demo tr:eq("+num2+") td:eq(13)").html();
			if(markedBy!="Not Peer Marked"){
				rowI=-1;
				colI=-1;
				/*
				for(var i=0; i<taGradesArr.length; i++){
					if(taGradessArr[i])
				}*/
			}
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
					else{
						row.push(($(this).text()));
					}
				};
			});
			tableArr.push(row);
		};
		num2+=1;
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

$("#filterBox").hide();

$('#filterBut').click(function(e){
    $('#filterBox').slideToggle();
});

$('#delBut').click(function(e){
	if(confirm("All visible student submissions will be deleted. Continue?") == true){
		var idArr=[];
		//alert("Table as filtered below successfully downloaded.");
		$('#demo tr').each(function(){
			var rowNum=$(this).index();
			if($(this).is(':visible')){
				if($(this).attr('id')){
					//var row = [];
					idArr.push($(this).attr('id'));
					//alert($('#demo tr:eq('+rowNum+') td:eq(1)').text()); student number
				}
			}
		});
		var jsonString = JSON.stringify(idArr);
		//run python script and upload to server
		$.ajax({
			url: "php/deleteSubmission.php",
			type: "POST",
			data: {data: jsonString},
			success: function(response){
				//$("#div").html(response);
				alert(response+" submissions successfully deleted.");
				window.location.reload(false);
				//var csvURL=response;
				//window.open(csvURL);
			},
			error: function(response){
				alert("Error"+response);
				console.log("Error"+response);
			}
		});
	}
});

$('#slideOutNav').click(function(e){
	document.getElementById('colFilter').style.right="-18em";
    $("#colFilter").animate({'right': '0px'},'slow');
});

$('#closeColFilter').click(function(e){
	document.getElementById('colFilter').style.right="-18em";
});

/*
$('#closeFileViewer').click(function(e){
	document.getElementById('fileViewer').style.display="None";
	document.getElementById('subjInput').value="";
});
*/

 $("#flagFilt, #studentNumberFilt, #assNameFilt, #ansFileNameFilt, #versionFilt").on('change paste keyup input', function () {
	//filter values
	var flagFiltVal = document.getElementById('flagFilt').value;//flag filt value
	var studentNumberFiltVal = document.getElementById('studentNumberFilt').value.toLowerCase();//Student Number filt value
	var assNameFiltVal = document.getElementById('assNameFilt').value.toLowerCase();//Student Number filt value
	var ansFileNameFiltVal = document.getElementById('ansFileNameFilt').value.toLowerCase();
	var versionFiltVal = document.getElementById('versionFilt').value.toLowerCase();
	//number of rows on table
	var rowCount = $('#demo tr').length;
	for(var i=1; i<rowCount; i++){
		//row values
		var flagRowVal=$("#demo tr:eq("+i+") td:eq(0)").attr('class');
		var studentNumberRowVal=$("#demo tr:eq("+i+") td:eq(1)").html().toLowerCase();
		var assNameRowVal=$("#demo tr:eq("+i+") td:eq(2)").html().toLowerCase();
		var ansFileNameRowVal=$("#demo tr:eq("+i+") td:eq(4)").html().toLowerCase();
		var versionRowVal=$("#demo tr:eq("+i+") td:eq(5)").html().toLowerCase();
		var shown = true;
		if(studentNumberFiltVal && studentNumberRowVal.indexOf(studentNumberFiltVal)==-1){
			shown=false;
		}
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
		}
		if(shown){
			$("#demo tr:eq("+i+")").show();
		}
		else{
			$("#demo tr:eq("+i+")").hide();
		}
		
	}
});

$(document).mouseup(function(e) 
{
    var container = $("#fileViewer");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.hide();
    }
	document.getElementById('fullViewer').style.display="none";
	document.getElementById('closeFullScreen').style.display="none";
	document.getElementById('fullViewer').setAttribute('src', "");
});

/**
 * Created by Kupletsky Sergey on 05.11.14.
 *
 * Material Design Responsive Table
 * Tested on Win8.1 with browsers: Chrome 37, Firefox 32, Opera 25, IE 11, Safari 5.1.7
 * You can use this table in Bootstrap (v3) projects. Material Design Responsive Table CSS-style will override basic bootstrap style.
 * JS used only for table constructor: you don't need it in your project
 */

$(document).ready(function() {

    var table = $('#table');

    // Table bordered
    $('#table-bordered').change(function() {
        var value = $( this ).val();
        table.removeClass('table-bordered').addClass(value);
    });

    // Table striped
    $('#table-striped').change(function() {
        var value = $( this ).val();
        table.removeClass('table-striped').addClass(value);
    });
  
    // Table hover
    $('#table-hover').change(function() {
        var value = $( this ).val();
        table.removeClass('table-hover').addClass(value);
    });

    // Table color
    $('#table-color').change(function() {
        var value = $(this).val();
        table.removeClass(/^table-mc-/).addClass(value);
    });
});

// jQuery’s hasClass and removeClass on steroids
// by Nikita Vasilyev
// https://github.com/NV/jquery-regexp-classes
(function(removeClass) {

	jQuery.fn.removeClass = function( value ) {
		if ( value && typeof value.test === "function" ) {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];
				if ( elem.nodeType === 1 && elem.className ) {
					var classNames = elem.className.split( /\s+/ );

					for ( var n = classNames.length; n--; ) {
						if ( value.test(classNames[n]) ) {
							classNames.splice(n, 1);
						}
					}
					elem.className = jQuery.trim( classNames.join(" ") );
				}
			}
		} else {
			removeClass.call(this, value);
		}
		return this;
	}

})(jQuery.fn.removeClass);
/*
document.getElementById('vs_iframe').onload=function()
{	
	//document.getElementById('vs_iframe').contentWindow.postMessage({msg_type:'load', url:'http://localhost:92/1.stl&local'}, '*');
	document.getElementById('vs_iframe').setAttribute('src', "http://www.viewstl.com/?embedded&url=http://localhost:92/2.stl&local");
}*/