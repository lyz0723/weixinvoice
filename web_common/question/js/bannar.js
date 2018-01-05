$(function(){
	var pageHeight = $(window).height();
	$(".bg").css("min-height",pageHeight);
	var addUrl=$(".addressUrl").val();
	$(".bannar").on("click",function(){
		//window.location.href=addUrl+"index.php/Course/isEvaluating/course_id/1";
	});
	//var pic = [""+urlval+"/jzb2/images/course1.jpg",""+urlval+"/jzb2/images/course2.jpg",""+urlval+"/jzb2/images/course3.jpg",""+urlval+"/jzb2/images/course4.jpg",""+urlval+"/jzb2/images/course5.jpg",""+urlval+"/jzb2/images/course6.jpg",];
	//$.each($(".cou-pic"), function(i) {
	//	$(".cou-pic").eq(i).css({"background":"url("+pic[i]+")","backgroundSize":"100% 100%"});
	//});
})
