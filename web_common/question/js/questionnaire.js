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
			"1.您的孩子动手打了另一个孩子时，您会：",
			"A.惩罚孩子，让他不再发生类似的事情",
			"B.看情况，只要自己的孩子不吃亏就不管",
			"C.不干涉，小朋友间发生冲突很正常",
			"D.问清楚孩子发生冲突的原因，引导孩子自己处理冲突"
		],
		[
			"2. 您的孩子把房间弄得乱七八糟，不整理就想跑出去和别的小朋友玩，这时您会：",
			"A．要求孩子立刻整理，如果孩子拒绝，会进行一定的惩罚，希望他下次可以改正",
			"B．认为孩子还小，房间乱点也很正常，不用太过在意",
			"C．尽量满足孩子要出去玩的要求，帮他整理",
			"D．询问孩子不收拾房间的原因，如果孩子急着出去玩，会问孩子打算什么时候整理，约定好后再让孩子出去玩"
		],
		[
			"3. 当孩子在百货商店看到一个玩具，吵着要买，这时您会：",
			"A．严厉地制止，告诉孩子家里玩具已经很多了，不能再买了",
			"B．虽然很烦，但是没关系，就让他吵，看他可以吵多久",
			"C．孩子高兴最重要，就立刻买给他，不能让他再哭闹",
			"D．提醒他已经有许多好玩的玩具了，如果孩子还想买，问孩子是否可以从他省下的零用钱或压岁钱扣款，请孩子自己考虑，是否愿意将现在存的钱花在这个玩具上，自己决定是否购买"
		],
		[
			"4. 当孩子摔破家里的东西时，这时您会：",
			"A．忍不住发火，呵斥，让孩子和自己一起收拾好地上的碎片",
			"B．赶快把地上的碎片清一清，认为多说无益",
			"C．赶快问孩子是否受伤，害怕孩子因此受到惊吓",
			"D．告诉孩子下次要小心，在确定孩子能够认可自己的话之后，和孩子一起把地上的碎片清理干净"
		],
		[
			"5. 请回想一下，当孩子做了一些您不太支持的事情时，您是如何回应的呢？",
			"A.“你为什么不提前和我说呢？”",
			"B.“随你便吧！”",
			"C.“好吧，你做什么决定，爸爸妈妈都支持你！”",
			"D.“我只是提示你这几点，其他的事可以由你自己做决定。”"
		],
		[
			"6. 您在养育孩子的过程中，以下哪种言语习惯更符合您的常态：",
			"A.在生活中，常采用“不可以、不能、你必须……”等表达方式",
			"B.与孩子的对话较为简短，常采用：“不知道！”“没有！”“就这样！”“再说！”等等表达方式",
			"C.常使用“好”“可以”“行！”等表达方式",
			"D.全神贯注地倾听， 并用“哦……”“嗯……”“这样啊……”来回应孩子的感受"
		],
		[
			"7．您希望通过自己的教育，孩子可以成为什么样的人？",
			"A．希望培养出听话的孩子，长大后成为团队中很好的协作者",
			"B．尽量不干涉孩子的成长，希望孩子能任其天性自然发展",
			"C．希望孩子能够快乐幸福地成长就可以了",
			"D．教导孩子成为一个正当﹑有社会能力的人，能够过好自己的人生"
		]
	];
	j=0;
	showPage(j);
	var checkEnd = [];
	var stepWidth = 2.5/7;
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
			checkEnd.splice(j,7,checkNum);
			console.log(checkEnd);
			if(j<6){
				setTimeout(function(){
					j=j+1;
					showPage(j);
				},300);
				$(".next-step").css("opacity",0);
			}
			if(j==6){
				$(".next-step").css("opacity",1);
			}
			$(".up-ques").html("上一题");
			var wid = stepWidth*checkEnd.length;
			$(".doing-bar").css("width",wid+"rem");
			$(".num-ratio").html((j+1)+"/7");
	})
	//点击上一题
	$(".up-ques").on("click",function(){
		j=j-1;
		$(".num-ratio").html((j+1)+"/7");
		if(j==0){
			$(".up-ques").html("");
			$(".num-ratio").html("1/7");
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
			url:addUrl+"index.php/Home/Course/ajaxGetOptions",
			dataType:"jsonp",
			data:{
				option:checkEnd
			},
			success:function(data){
				console.log(data);
				if(data.code==1){
					window.location.href=addUrl+"index.php/Home/Course/childQue.html";
				};
			},
			error:function(){
				alert("1");
			}
		})
	})
})
