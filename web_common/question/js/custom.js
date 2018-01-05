window.onload=function(){
	var pageHeight = $(window).height();
	$(".bg").css("min-height",pageHeight);
	var addUrl=$(".addressUrl").val();
}
$(function(){
	var idname=$(".idname").val();

	var addUrl=$(".addressUrl").val();
	$(".check-show div").on("touchend",function(){
		var st = $(this).attr("data-style");
		if($(".yel").length<6){
			$(".check").attr("data-style",0);
			$(".tishi").css("opacity",0);
			if(st==0){
				$(this).addClass("yel");
				$(this).removeClass("check");
				$(this).attr("data-style",1);
				$(".c6").css({"lineHeight":"normal","paddingTop":"0.3rem","height":"0.4rem"});
			}else if(st==1){
				$(this).addClass("check");
				$(this).removeClass("yel");
				$(this).attr("data-style",0);
				$(".check").attr("data-style",0);
			}
		}else{
			$(".check").attr("data-style",2);
			$(".tishi").css("opacity",1);
			if(st==1){
				$(this).addClass("check");
				$(this).removeClass("yel");
				$(this).attr("data-style",0);
				$(".check").attr("data-style",0);
				$(".tishi").css("opacity",0);
			}
		}
	});

	$(".create").click(function(){
		var orders=[];
		$.each($(".yel"), function(i) {
			orders.push($(".yel").eq(i).attr("data-name"));
		});
		if(orders.length>6 || orders.length<3){
			$(".tishi").css("opacity",1);
		}else{
			$(".tishi").css("opacity",0);
			console.log(orders);
			$.ajax({
				type:"get",
				url:addUrl+"index.php/Home/Course/ajaxGetOrders",
				dataType:"jsonp",
				data:{
					orders:orders,
					id:idname
				},
				success:function(data){
					if(data.code==1){  
						// window.location.href=addUrl+"index.php/Home/Course/detail/id/1";
						window.location.href=addUrl+"index.php/Home/Course/startPay/tid/2";
					}
					console.log(data);
				},
				error:function(){
					//alert("X");
				}
			});
		}
	})
})
