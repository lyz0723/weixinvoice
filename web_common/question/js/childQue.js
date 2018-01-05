window.onload=function(){
	var pageHeight = $(window).height();
	$(".page").css("min-height",pageHeight);
	var bgHeight = $(window).height()-20;
	$(".bg").css("min-height",bgHeight);
	var addUrl=$(".addressUrl").val();
}
$(function(){
	var addUrl=$(".addressUrl").val();
	var arr=[
		[
			"1．孩子平时总是连蹦带跳，手舞足蹈，走路都不会好好走，总是跑来跑去，不知疲倦。",
			"A．很符合孩子的情况",
			"B．比较符合",
			"C．不太符合",
			"D．完全不符合"
		],
		[
			"2．家里来人的时候，孩子总是特别兴奋，不断地在大人面前转，还老爱插话。",
			"A．很符合孩子的情况",
			"B．比较符合",
			"C．不太符合",
			"D．完全不符合"
		],
		[
			"3．给孩子一种新的食物，孩子会很快适应并且接受。",
			"A．很符合孩子的情况",
			"B．比较符合",
			"C．不太符合",
			"D．完全不符合"
		],
		[
			"4．孩子在受到委屈或是不开心的时候，总是大哭大闹，从来不会自己躲到一边抹眼泪。",
			"A．很符合孩子的情况",
			"B．比较符合",
			"C．不太符合",
			"D．完全不符合"
		],
		[
			"5．孩子大多数时候总是开开心心的，即使有不高兴的事情也会很快忘却。",
			"A．很符合孩子的情况",
			"B．比较符合",
			"C．不太符合",
			"D．完全不符合"
		],
		[
			"6．孩子玩玩具时，如果有什么响动，马上会停下玩耍去看发生了什么事。",
			"A．很符合孩子的情况",
			"B．比较符合",
			"C．不太符合",
			"D．完全不符合"
		],
		[
			"7．孩子在玩的时候，总是左挑右拣，不断地变换玩具，对每个玩具都没有太大的耐性。",
			"A．很符合孩子的情况",
			"B．比较符合",
			"C．不太符合",
			"D．完全不符合"
		],
		[
			"8．孩子的睡眠特别沉，一般不会被外界的响动所惊醒。",
			"A．很符合孩子的情况",
			"B．比较符合",
			"C．不太符合",
			"D．完全不符合"
		]
	];
	j=0;
	showPage(j);
	var checkEnd = [];
	var stepWidth = 2.5/8;
	function showPage(j){
		$(".ques").html(arr[j][0]);
		for (var i=1;i<5;i++) {
			$(".opc").eq(i-1).html(arr[j][i]);
		}
		$(".opc").removeClass("blue");
	};
	$(".up-ques").html("");
	$(".next-step").css("opacity",0);
	//点击ABCD
	$(".opc").on("click",function(){
		var dataNum = $(this).attr("data-num");
		$(".opc").eq(dataNum-1).addClass("blue").siblings().removeClass("blue");
			var checkNum = $(".blue").attr("data-num");
			checkEnd.splice(j,8,checkNum);
			console.log(checkEnd);
			if(j<7){
				setTimeout(function(){
					j=j+1;
					showPage(j);
				},300);
				$(".next-step").css("opacity",0);
			}
			if(j==7){
				$(".next-step").css("opacity",1);
			}
			$(".up-ques").html("上一题");
			var wid = stepWidth*checkEnd.length;
			$(".doing-bar").css("width",wid+"rem");
			$(".num-ratio").html((j+1)+"/8");
	})
	//点击上一题
	$(".up-ques").on("click",function(){
		j=j-1;
		$(".num-ratio").html((j+1)+"/8");
		if(j==0){
			$(".up-ques").html("");
			$(".num-ratio").html("1/8");
		}
		showPage(j);
		$(".opc").eq(checkEnd[j]-1).addClass("blue");
		$(".next-step").css("opacity",0);
		var wid = stepWidth*j;
		$(".doing-bar").css("width",wid+"rem");
	})
	//点击下一步传给后台
	$(".next-step").on("click",function(){
		console.log(checkEnd);
		$.ajax({
			type:"get",
			url:addUrl+"index.php/Home/Course/ajaxGetMultiOptions",
			dataType:"jsonp",
			data:{
				option:checkEnd
			},
			success:function(data){
				console.log(data);
				if(data.code==1){
					window.location.href=addUrl+"index.php/Home/Course/custom.html";
				}
            },
			error:function(){
				alert("出错");
			}
		})
	})
})
