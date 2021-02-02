//run python script and upload to server
$.ajax({
	url: "http://localhost:92/website_local/cgi-bin/hi3.py",
	type: "POST",
	data: {foo: 'bar', bar: JSON.stringify({'lat':30.5 , 'lon' : [1, 2, 3]})},
	success: function(response){
		//$("#div").html(response);
		//alert("Success"+response); //Might be crucial, don't delete
	},
	error: function(response){
		alert("Error in admin.js:hi3.py"+response);
	}
});
//alert("end"); Might be crucial, don't delete

$("#backBut").click(function(){
	window.location.href = "index.html";
});
$("#marksBut").click(function(){
	window.location.href = "data.html";
});
$("#assMarksBut").click(function(){
	window.location.href = "aMarks.html";
	//alert("start");
	//run python script and upload to server
	/*
	$.ajax({
		url: "http://localhost:92/website_local/cgi-bin/hi3.py",
		type: "POST",
		data: {foo: 'bar', bar: markingData},
		success: function(response){
			//$("#div").html(response);
			//alert("Success"+response);
		},
		error: function(response){
			alert("Error"+response);
		}
   });*/
   //alert("end");
});
$("#newAssBut").click(function(){
	if(document.getElementById('uploadPage').style.display=="none"){
		document.getElementById('uploadPage').style="display:block;"
	}
	else if(document.getElementById('uploadPage').style.display=="block"){
		document.getElementById('uploadPage').style="display:none;"
	}
});