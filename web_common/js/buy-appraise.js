$(function(){
	var addressUrl = $(".addressUrl").val();
	$(".nav").eq(0).css({color:"#41d5f5"})
	$(".show").hide();
	$(".show").eq(0).show();
	$(".nav").eq(0).addClass("bot-line");
	//点击nav当是评价页的时候，底部显示评价栏
	$(".nav").click(function(){
		$(this).addClass("bot-line").siblings().removeClass("bot-line");
		$(this).css({color:"#41d5f5"}).siblings().css({color:"#333"})
		$(".show").hide().eq($('.nav').index(this)).show();
		if($('.nav').index(this)==2){
			$(".bttm").css({display:"none"});
			$(".buy-pj").css({display:"block"});
		}else{
			$(".bttm").css({display:"block"});
			$(".buy-pj").css({display:"none"});
		}
	});
	//评价只显示两行，超出隐藏，点击显示
	var h=0;
	$(".pj-content").click(function(){
		if(h==0){
			$(this).removeClass("hidden");
			h=1;
		}else if(h==1){
			$(this).addClass("hidden");
			h=0;
		}
	})
	//星星打分
	var i=0;
	$(".start3").click(function(){
		if(i==0){
			$(this).css({background:"url("+urlval+"/jzb/images/start2.jpg)",backgroundSize:"100% 100%"})
			$(this).prevAll().css({background:"url("+urlval+"/jzb/images/start2.jpg)",backgroundSize:"100% 100%"})
			$(this).addClass("shibie");
			$(this).prevAll().addClass("shibie");
			i=1;
		}else if(i==1){
			$(this).css({background:"url("+urlval+"/jzb/images/start3.png)",backgroundSize:"100% 100%"})
			$(this).nextAll().css({background:"url("+urlval+"/jzb/images/start3.png)",backgroundSize:"100% 100%"})
			$(this).removeClass("shibie");
			$(this).nextAll().removeClass("shibie");
			i=0;
		}
		console.log($(".shibie").length);
	});
	//添加表情
	$('.smile').qqFace({
		id : 'facebox', //表情盒子的id
		assign:'saytext',//文本输入框的id
		path:urlval+'/jzb/images/arclist/'	//表情存放的路径
	});
	//点击提交按钮
	$(".tijiao").click(function(){

		if($(".write").val().length==0){
			alert("评论内容不能为空！");
		}else if($(".shibie").length==0){
			alert("请打分！");
		}else{
			$(".every-pj").eq(0).before('<ul class="every-pj clearfix"><li class="pj-touxiang"><img src=""></li><li class="pj-name"></li><li class="everyone-starts"></li><li class="pj-time"><span class="pj-ymd"></li><li class="pj-content hidden"></li></ul>');
			for (var i=0;i<$(".shibie").length;i++) {
				$(".everyone-starts").eq(0).append('<span class="start"></span>')
			};
			for (var i=0;i<5-$(".shibie").length;i++) {
				$(".everyone-starts").eq(0).append('<span class="start2"></span>')
			};
			//$(".every-pj").eq(0).append('<li class="pj-content hidden"></li>')
			var write=document.getElementsByTagName("textarea")[0];
			var cont=$(".pj-content").eq(0);
			$(".pj-content").eq(0).html(replace_em(write.value));
			cont.innerHTML=write.value;
			//$(".every-pj").eq(0).append('<li class="pj-time"></li>');
			//$(".pj-time").eq(0).append('<span class="pj-ymd">2016.7.11 </span>');
			
			$(".yinying").css({display:"none"});
			$(".ftop").css({display:"none"});
			$.each($(".start3"),function(i){
				$(".start3").eq(i).css({
					background:"url("+urlval+"/jzb/images/start3.png)",
					backgroundSize:"100% 100%"
				})
			})
			var value = write.value;
			console.log(write.value);
			$.ajax({
				type:"get",
				url:addressUrl+"index.php/Home/Api/addComment",
				data:{
					id:1,
					content:write.value,
					score:$(".shibie").length,
				},
				dataType:"jsonp",
				jsonp:"callback",
				success:function(data){
					var data=eval(data);
					console.log(data);
					console.log(write.value);
					$(".pj-touxiang img").eq(0).attr("src",data.head_img_url);
					console.log(data.nick_name);
					$(".pj-name").eq(0).html(data.nick_name);
					$(".pj-time").eq(0).html(data.time);
					$(".write").val("");
				},
				error:function(){
					console.log("X--------------------------");
					console.log("X");
				}
			})
			
		}
	});
	//查看结果
	function replace_em(str){
		str = str.replace(/\</g,'&lt;');
		str = str.replace(/\>/g,'&gt;');
		str = str.replace(/\n/g,'<br/>');
		str = str.replace(/\[em_([0-9]*)\]/g,'<img src="'+urlval+'/jzb/images/arclist/$1.gif" border="0" />');
		return str;
	}
	//点击请评论，弹出评论框
	$(".please").click(function(){
		$(".yinying").css({display:"block"});
		$(".ftop").css({display:"block"});
	})
	//点击取消按钮，取消评论
	$(".cancle").click(function(){
		$(".yinying").css({display:"none"});
		$(".ftop").css({display:"none"});
	})
})
	
