window.onload=function(){
	$(".nav").eq(0).css({color:"#41d5f5"})
	$(".show").eq(2).hide();
	$(".show").eq(0).show();
	$(".show").eq(1).hide();	
	$(".nav").eq(0).addClass("bot-line");
	$(".nav").click(function(){
		$(this).addClass("bot-line").siblings().removeClass("bot-line");
		$(this).css({color:"#41d5f5"}).siblings().css({color:"#333"})
		$(".show").hide().eq($('.nav').index(this)).show(); 
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
	
}
