$(function() {
    $('body').on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

$('body').scrollspy({
    target: '.navbar-fixed-top'
})

$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

var state=1;
function changePic(){
	 if(state==1){
		document.getElementById("ins").src = "img/robotGreen.png";
	 }
	 else if(state==-1){
		document.getElementById("ins").src = "img/robotWhite.png";
	 }
	 state*=-1;
}

$(document).ready(function () {
    $("#toggle").click(function () {
        $("#filterBox").toggleClass("hidden unhidden");
    });
});

var color1="rgb(231, 76, 60)";
var color2="grey";
var selectedColor=color1;

$(document).ready(function () {
	var selectedOption="single";
    $("#filterBut1").click(function () {
		var selectedOption="single";
        document.getElementById("filterBut1").style.backgroundColor = color2;
		document.getElementById("filterBut2").style.backgroundColor = color1;
    });
	$("#filterBut2").click(function () {
		var selectedOption="all";
        document.getElementById("filterBut2").style.backgroundColor = color2;
		document.getElementById("filterBut1").style.backgroundColor = color1;
    });
});

var skills = ['cad', '3d printing', 'lathe and mill', 'programming', 'microcontrollers']
$(document).ready(function () {
    $("#skill1").click(function () {
		if(selectedColor==color1){
			selectedColor=color2;
			if(skills.indexOf('CAD')==-1){
				skills.push('CAD');
			}
		}
		else{
			if(skills.indexOf('CAD')!=-1){
				delete skills[skills.indexOf('CAD')];
			}
			selectedColor=color1;
		}
        document.getElementById("skill1").style.backgroundColor = selectedColor;
    });
	$("#skill2").click(function () {
		if(selectedColor==color1){
			selectedColor=color2;
			if(skills.indexOf('3d printing')==-1){
				skills.push('3d printing');
			}
		}
		else{
			if(skills.indexOf('3d printing')!=-1){
				delete skills[skills.indexOf('3d printing')];
			}
			selectedColor=color1;
		}
        document.getElementById("skill2").style.backgroundColor = selectedColor;
    });
	$("#skill3").click(function () {
		if(selectedColor==color1){
			selectedColor=color2;
			if(skills.indexOf('lathe and mill')==-1){
				skills.push('lathe and mill');
			}
		}
		else{
			selectedColor=color1;
			if(skills.indexOf('lathe and mill')!=-1){
				delete skills[skills.indexOf('lathe and mill')];
			}
		}
        document.getElementById("skill3").style.backgroundColor = selectedColor;
    });
	$("#skill4").click(function () {
		if(selectedColor==color1){
			selectedColor=color2;
			if(skills.indexOf('programming')==-1){
				skills.push('programming');
			}
		}
		else{
			selectedColor=color1;
			if(skills.indexOf('programming')!=-1){
				delete skills[skills.indexOf('programming')];
			}
		}
        document.getElementById("skill4").style.backgroundColor = selectedColor;
    });
	$("#skill5").click(function () {
		if(selectedColor==color1){
			selectedColor=color2;
			if(skills.indexOf('microcontrollers')==-1){
				skills.push('microcontrollers');
			}
		}
		else{
			selectedColor=color1;
			if(skills.indexOf('microcontrollers')!=-1){
				delete skills[skills.indexOf('microcontrollers')];
			}
		}
        document.getElementById("skill5").style.backgroundColor = selectedColor;
    });
});