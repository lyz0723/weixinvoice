window.onload=function(){
	var addUrl=$(".addressUrl").val();
	var states=$(".states").val();
	var pageHeight = $(window).height();
	$(".bg").css("min-height",pageHeight);
	$(".next-step").on("click",function(){
		if (states == '1') {
			window.location.href=addUrl+"index.php/Course/info.html";
		}
		// if (states == '2') {
		// 	alert('您暂时不能定制课程!');
		// }
		if (states == '0') {
			alert('您暂时不能定制课程!');
			// var orderId="JZB"+new Date().getTime();
			// var open_id = $(".open_id").val();
			// toPay("JZB005","家长帮直播课",orderId,0.01,open_id,1);
		}
	})
}
