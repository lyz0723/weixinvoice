window.onload = function(){
	var addUrl = $(".addressUrl").val();
	//消息展示区域高度
	minHeight = $(window).height()-$(".head").height()-$(".middle").height()-$(".bottom_box").height();
	$(".voice_show").height(minHeight);
	reHeight = $(window).height()-$(".head").height()-$(".middle").height()-$(".voice_word").height()-$(".tape_box").height();
	//文本输入框透明浮层高度
	var writeHeight = $(window).height()-$(".write_text").height();
	$(".write_float").css("height",writeHeight);
	var wordHeight = $(window).height()-$(".write_text_word").height();
	$(".write_float_word").css("height",wordHeight);
	//讨论区高度
	var roomHeight = $(window).height()-$(".opc").height();
	var showHeight = roomHeight-$(".dis_btm").height();
	$(".dis_area").css("height",showHeight);
	//判断是否有留言
	if($(".question").length!=0){
		$(".no_question").css("display","none");
		$(".nomore").css("display","block");
	};
}
$(document).ready(function(){
	var addUrl = $(".addressUrl").val();

	var nick_name = $('.pic-nick-name').attr('data-nick-name');
	var head_img_url = $('.pic-nick-name').attr('data-head-img-url');
	//录音框出来时录音展区的高度
	var arr = [];
	var arr2 =[];
	var al;
	arrSrc =[];
	//提取课程id
	var href=window.location.href;
	var hrefArr=href.split("/");
	var length=hrefArr.length;
	console.log(hrefArr+','+hrefArr.length);
	var less_id=hrefArr[length-1];
	//讲师消息
	function addMessage(length){
		var str='';
		for(var i=length-5;i<length;i++){
			if(arr[i].type=='1'){
				var wid = '';
				wid = arr[i].voice_len/60*1.0+"rem";
				if(arr[i].audio_url==''){
					$(".voice_show").append('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="" data-src="'+arr[i].bro_content+'" type="video/mp3" class="yy"></audio><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'jzb2/images/zj-stop.png" class="gif"/><img src="'+urlval+'jzb2/images/recall.png" class="recall1 recall" data-type="'+arr[i].type+'"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
				}else{
					$(".voice_show").append('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="'+arr[i].audio_url+'" type="video/mp3" class="yy"></audio><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'jzb2/images/zj-stop.png" class="gif"/><img src="'+urlval+'jzb2/images/recall.png" class="recall1 recall" data-type="'+arr[i].type+'"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
				}
			}else if(arr[i].type=='2'){
				$(".voice_show").append('<div class="word_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao1"/><div class="word_c">'+arr[i].bro_content+'<img src="'+urlval+'jzb2/images/recall.png" class="recall" data-type="'+arr[i].type+'"/></div></div></div></div>');
			}else if(arr[i].type=='4'){
				if(arr[i].lr_content==''){
					$(".voice_show").append('<div class="up_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><img src="'+urlval+'jzb2/images/recall.png" class="recall" data-type="'+arr[i].type+'"/><div class="up_question"><span class="up_peo">'+arr[i].nick_name+'：</span><span class="up_ask">'+arr[i].ld_content+'</span></div></div></div></div></div>');
				}else{
					$(".voice_show").append('<div class="up_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><img src="'+urlval+'jzb2/images/recall.png" class="recall" data-type="'+arr[i].type+'"/><div class="up_question"><span class="up_peo">'+arr[i].nick_name+'：</span><span class="up_ask">'+arr[i].ld_content+'</span></div><div class="reply_box"><span class="reply">回复：</span><span class="replay_answer">'+arr[i].lr_content+'</span></div></div></div></div></div>');
				}
			}
			//$(".poster_pic").css({background:"url("+head_img_url+")",backgroundSize:"100% 100%"});
		}
	}
	//页面一进来的展示
	$.ajax({
		type:"post",
		//url:addUrl+"Live/ajaxGetBroadcast",
        url:addUrl+"Live/ajaxGetBroadcast.php",
		dataType:"json",
		data:{
			lesson_id:less_id
		},
		success:function(data){
			var data = eval(data);
			console.log(data);
			for (var name in data.info) {
				arr2.push(name);
			}
			$.each(data.info, function(i){
				arr.push(data.info[i]);
			});
			al=arr.length;
			if(arr.length<=5){
				for(var i=0;i<arr.length;i++){
					if(arr[i].type=='1'){
						var wid = '';
						wid = arr[i].voice_len/60*1.0+"rem";
						if(arr[i].audio_url==''){
							$(".voice_show").append('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="" data-src="'+arr[i].bro_content+'" type="video/mp3" class="yy"></audio><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'jzb2/images/zj-stop.png" class="gif"/><img src="'+urlval+'jzb2/images/recall.png" class="recall1 recall" data-type="'+arr[i].type+'"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
						}else{
							$(".voice_show").append('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="'+arr[i].audio_url+'" type="video/mp3" class="yy"></audio><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'jzb2/images/zj-stop.png" class="gif"/><img src="'+urlval+'jzb2/images/recall.png" class="recall1 recall" data-type="'+arr[i].type+'"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
						}
					}else if(arr[i].type=='2'){
						$(".voice_show").append('<div class="word_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao1"/><div class="word_c">'+arr[i].bro_content+'<img src="'+urlval+'jzb2/images/recall.png" class="recall" data-type="'+arr[i].type+'"/></div></div></div></div>');
					}else if(arr[i].type=='4'){
						if(arr[i].lr_content==''){
							$(".voice_show").append('<div class="up_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><img src="'+urlval+'jzb2/images/recall.png" class="recall" data-type="'+arr[i].type+'"/><div class="up_question"><span class="up_peo">'+arr[i].nick_name+'：</span><span class="up_ask">'+arr[i].ld_content+'</span></div></div></div></div></div>');
						}else{
							$(".voice_show").append('<div class="up_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><img src="'+urlval+'jzb2/images/recall.png" class="recall" data-type="'+arr[i].type+'"/><div class="up_question"><span class="up_peo">'+arr[i].nick_name+'：</span><span class="up_ask">'+arr[i].ld_content+'</span></div><div class="reply_box"><span class="reply">回复：</span><span class="replay_answer">'+arr[i].lr_content+'</span></div></div></div></div></div>');
						}
					}
					$('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight);
					//$(".poster_pic").css({background:"url("+head_img_url+")",backgroundSize:"100% 100%"});
				}
			}else if(arr.length>5){
				addMessage(al);
				$('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight);
			}
			//给每条语音添加自定义属性存属性值
			for (var i=0;i<$(".message_voice").length;i++){
				$(".message_voice").eq(i).attr("data-name",i);
			}
		}
	});
	//刷新功能
	$(".refresh").on("click",function(){
		$(".voice_show").html("");
		var arr=[];
		var arr2=[];
		$.ajax({
			type:"post",
			//url:addUrl+"index.php/Home/Live/ajaxGetBroadcast",
            url:addUrl+"Live/ajaxGetBroadcast.php",
			dataType:"json",
			data:{
				lesson_id:less_id
			},
			success:function(data){
				var data = eval(data);
				console.log(data);
				for (var name in data.info) {
					arr2.push(name);
				}
				$.each(data.info, function(i){
					arr.push(data.info[i]);
				});
				al=arr.length;
				if(arr.length<=5){
					for(var i=0;i<arr.length;i++){
						if(arr[i].type=='1'){
							var wid = '';
							wid = arr[i].voice_len/60*1.0+"rem";
							if(arr[i].audio_url==''){
								$(".voice_show").append('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="" data-src="'+arr[i].bro_content+'" type="video/mp3" class="yy"></audio><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'jzb2/images/zj-stop.png" class="gif"/><img src="'+urlval+'jzb2/images/recall.png" class="recall1 recall" data-type="'+arr[i].type+'"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
							}else{
								$(".voice_show").append('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="'+arr[i].audio_url+'" type="video/mp3" class="yy"></audio><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'jzb2/images/zj-stop.png" class="gif"/><img src="'+urlval+'jzb2/images/recall.png" class="recall1 recall" data-type="'+arr[i].type+'"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
							}
						}else if(arr[i].type=='2'){
							$(".voice_show").append('<div class="word_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao1"/><div class="word_c">'+arr[i].bro_content+'<img src="'+urlval+'jzb2/images/recall.png" class="recall" data-type="'+arr[i].type+'"/></div></div></div></div>');
						}else if(arr[i].type=='4'){
							if(arr[i].lr_content==''){
								$(".voice_show").append('<div class="up_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><img src="'+urlval+'jzb2/images/recall.png" class="recall" data-type="'+arr[i].type+'"/><div class="up_question"><span class="up_peo">'+arr[i].nick_name+'：</span><span class="up_ask">'+arr[i].ld_content+'</span></div></div></div></div></div>');
							}else{
								$(".voice_show").append('<div class="up_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><img src="'+urlval+'jzb2/images/recall.png" class="recall" data-type="'+arr[i].type+'"/><div class="up_question"><span class="up_peo">'+arr[i].nick_name+'：</span><span class="up_ask">'+arr[i].ld_content+'</span></div><div class="reply_box"><span class="reply">回复：</span><span class="replay_answer">'+arr[i].lr_content+'</span></div></div></div></div></div>');
							}
						}
						$('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight);
						//$(".poster_pic").css({background:"url("+head_img_url+")",backgroundSize:"100% 100%"});
					}
				}else if(arr.length>5){
					addMessage(al);
					$('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight);
				}
				//给每条语音添加自定义属性存属性值
				for (var i=0;i<$(".message_voice").length;i++){
					$(".message_voice").eq(i).attr("data-name",i);
				}
			}
		});

	})
	//下拉加载更多
	var startY,endY,_touch,_touche;
	$(".voice_show").on("touchstart",function(e){
		_touch = e.originalEvent.targetTouches[0];
		startY= _touch.pageY;
	});
	$(".voice_show").on("touchmove",function(e){
		if($('.voice_show')[0].scrollHeight>0){
			$(".alert_loading").css("display","block");
		}
	});
	$(".voice_show").on("touchend",function(e){
		_touche = e.originalEvent.changedTouches[0];
		endY= _touche.pageY;
		var scrollTop = $('.voice_show').scrollTop();
//		if(scrollTop==0){
		if(endY-startY>=10){
			al = al-5;
//			$(".alert_loading").css("display","none");
			for(var i=al-1;i>=al-5;i--){
				if(i<=0){
					$(".alert_nomore").css("display","block");
					$(".alert_nomore").fadeOut(1500);
					$(".alert_loading").css("opacity",0);
				}
				if(arr[i].type=='1'){
					var wid = '';
					wid = arr[i].voice_len/60*1.0+"rem";
					if(arr[i].audio_url==''){
						$(".message").eq(0).before('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="" data-src="'+arr[i].bro_content+'" type="video/mp3" class="yy"></audio><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'jzb2/images/zj-stop.png" class="gif"/><img src="'+urlval+'test_project/jzb2/images/recall.png" class="recall1 recall" data-type="'+arr[i].type+'"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
					}else{
						$(".message").eq(0).before('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="'+arr[i].audio_url+'" type="video/mp3" class="yy"></audio><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'jzb2/images/zj-stop.png" class="gif"/><img src="'+urlval+'jzb2/images/recall.png" class="recall1 recall" data-type="'+arr[i].type+'"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
					}
				}else if(arr[i].type=='2'){
					$(".message").eq(0).before('<div class="word_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao1"/><div class="word_c">'+arr[i].bro_content+'<img src="'+urlval+'jzb2/images/recall.png" class="recall" data-type="'+arr[i].type+'"/></div></div></div></div>');
				}else if(arr[i].type=='4'){
					$(".message").eq(0).before('<div class="up_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><img src="'+urlval+'jzb2/images/recall.png" class="recall" data-type="'+arr[i].type+'"/><div class="up_question"><span class="up_peo">'+arr[i].nick_name+'：</span><span class="up_ask">'+arr[i].ld_content+'</span></div><div class="reply_box"><span class="reply">回复：</span><span class="replay_answer">'+arr[i].lr_content+'</span></div></div></div></div></div>');
				}
				//$(".poster_pic").css({background:"url("+head_img_url+")",backgroundSize:"100% 100%"});
			}

		}
	});
	/*
	 *默认键盘隐藏
	 */
	//判断是否为苹果
	var isIphone = navigator.userAgent.toUpperCase().indexOf('iphone')!= -1;
	// 元素失去焦点隐藏iphone的软键盘
	function objBlur(id,inputname,time){
		if(typeof inputname != 'string') throw new Error('objBlur()参数错误');
		var obj = document.getElementById(id),
			time = time || 300,
			docTouchend = function(event){
				if(event.target!= obj){
					setTimeout(function(){
						obj.blur();
						document.removeEventListener('touchend', docTouchend,false);
					},time);
				}
			};
		if(obj){
			obj.addEventListener('focus', function(){
				document.addEventListener('touchend', docTouchend,false);
			},false);
		}else{
			throw new Error('objBlur()没有找到元素');
		};
	};
	if(isIphone){
		var input = new objBlur('textarea');
		input=null;
	};
	time = null;
	//点击语音弹出红色录音按钮框再点击取消
	$(".sounds").on("click",function(){
		if($(".sounds").attr("data-name")==0){
			$(".voice_show").css("height",reHeight);
			$(".tape_box").css("display","block");
			$(".sounds").attr("data-name",1);
			$(".sounds").css("color","#24BEED");
			$(".sounds img").attr("src",urlval+"jzb2/images/bluev.png");
			$('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight );
		}else{
			$(".voice_show").css("height",minHeight);
			$(".tape_box").css("display","none");
			$(".sounds").attr("data-name",0);
			$(".sounds").css("color","#888");
			$(".sounds img").attr("src",urlval+"jzb2/images/voice.png");
		}
	});
	//点击红色按钮开始录音
	var i=0;
	var numtime=null;
	function numGrow(){
		i++;
		$(".record_time").html(i+"s/60s");
		if(i==60){
			i=0;
			var myDate = new Date();
			var year = myDate.getFullYear();
			var month = myDate.getMonth()+1;
			var day = myDate.getDate();
			var hour = myDate.getHours();
			var minutes = myDate.getMinutes();
			var seconds = myDate.getSeconds();
			$(".voice_show").append('<div class="voice_message message"><div class="message_time">'+year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice"><audio src="" type="video/mp3" class="yy"></audio><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'jzb2/images/zj-stop.png" class="gif"/><img src="'+urlval+'jzb2/images/recall.png" class="recall1 recall" data-type="1"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">60"</div></div></div></div></div>');
			//$(".poster_pic").css({background:"url("+head_img_url+")",backgroundSize:"100% 100%"});
		}
	};
	$(".big_cir").on("click",function(){
		$(".recording_box").css("display","block");
		//计时器计时，开启录音功能
		wx.startRecord();
		numtime=setInterval(numGrow,1000);
	});
	//点击蓝色暂停录音
	var m;
	$(".send_cir").on("click",function(){
		m = i;   //m为录音时长
		if($(".send_cir").attr("data-name")==0){
			clearInterval(numtime);
			$(".send_cir").html("点击发送");
			$(".send_cir").attr("data-name",1);
			$(".reminder_word").html("发送之后可以录制下一条");
			voiceStop(m);
		}else{
			var wid = '';
			wid = m/60*1.0+"rem";
			var myDate = new Date();
			var year = myDate.getFullYear();
			var month = myDate.getMonth()+1;
			var day = myDate.getDate();
			var hour = myDate.getHours();
			var minutes = myDate.getMinutes();
			var seconds = myDate.getSeconds();
			$(".voice_show").append('<div class="voice_message message"><div class="message_time">'+year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="" type="video/mp3" class="yy"></audio><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'jzb2/images/zj-stop.png" class="gif"/><img src="'+urlval+'jzb2/images/recall.png" class="recall1 recall" data-type="1"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+m+'"</div></div></div></div></div>');
			//$(".poster_pic").css({background:"url("+head_img_url+")",backgroundSize:"100% 100%"});
			clearInterval(numtime);
			var upsrc = $(".upsrc").attr("data-upSrc");
			upLoadVoice(upsrc,m);
			$("body").remove(".upsrc");
			i=0;
			$(".record_time").html("0s/60s");
			$(".send_cir").attr("data-name",0);
			$(".send_cir").html('<span class="w_line"></span><span class="w_line"></span>');
			$(".recording_box").css("display","none");
			$('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight );
		}
	});
	//点击取消弹出弹框确认取消
	$(".record_cc").on("click",function(){
		$(".cc_float").css("display","block");
	});
	//点击取消按钮弹窗
	$(".alert_can").on("click",function(){
		voiceStop(m);
		$(".cc_float").css("display","none");
	});
	//点击取消弹框的确认弹框隐藏取消当前录制
	$(".alert_true").on("click",function(){
		$(".voice_show").height(minHeight);
		clearInterval(numtime);
		i=0;
		$(".record_time").html("0s/60s");
		$(".send_cir").attr("data-name",0);
		$(".send_cir").html('<span class="w_line"></span><span class="w_line"></span>');
		$(".recording_box").css("display","none");
		$(".cc_float").css("display","none");
		$(".voice_word").css("bottom","0")
		$(".tape_box").css("display","none");
		voiceStop(m);
	});
	//点击语音播放  动态创建的dom节点用delegate绑定
	var n;
	c=0;
	var dataLocal;
	$(".voice_show").delegate(".message_voice","click",function(){
		n=$(this).attr("data-name");
		var src=$(".message_voice").eq(n).children(".yy").attr("src");
		var dataSrc=$(".message_voice").eq(n).children(".yy").attr("data-src");
		dataLocal=$(".message_voice").eq(n).children(".yy").attr("data-localsrc");
		if(src!=''){
			if($(".yy")[n].paused){
				$.each($(".message_voice"), function(b) {
					clearInterval(time);
					$(".yy")[b].pause();
					$(".gif").eq(b).attr("src",urlval+"jzb2/images/zj-stop.png");
				});
				$(".gif").eq(n).attr("src",urlval+"jzb2/images/zj-play.gif");
				$(this).siblings(".voice_time").children(".red_cir").css({display:"none"});
				$(".yy")[n].play();
				//图片闪动,语音播放完图片静止
				time = setInterval(function(){
					var allTime = $(".yy")[n].duration;
					var curTime = $(".yy")[n].currentTime;
					if(allTime-curTime>0){
						$(".yy")[n].play();
						$(".gif").eq(n).attr("src",urlval+"jzb2/images/zj-play.gif");
					}else{
						$(".yy")[n].pause();
						$(".gif").eq(n).attr("src",urlval+"jzb2/images/zj-stop.png");
						//自动播放
						n = Number(n)+1;
						if(src!=""){
							$(".yy")[n].play();
							$(".gif").eq(n).attr("src",urlval+"jzb2/images/zj-play.gif");
							$(".red_cir").eq(n).css("display","none");
						}
					}
				},1000)
			}else{
				$(".yy")[n].pause();
				clearInterval(time);
				$(".gif").eq(n).attr("src",urlval+"jzb2/images/zj-stop.png");
			}
		}else{
			if(c==0){
				$.each($(".message_voice"), function(b){

					$(".gif").eq(b).attr("src",urlval+"jzb2/images/zj-stop.png");
				});
				playVoice(dataSrc);
				$(".message_voice").eq(n).children(".gif").attr("src",urlval+"jzb2/images/zj-play.gif");
				$(".message_voice").eq(n).siblings(".voice_time").children(".red_cir").css({display:"none"});
				c=1;
				listenEnd(n,c);
			}else{
				stopVoice(dataLocal)//语音停止
				$(".gif").eq(n).attr("src",urlval+"jzb2/images/zj-stop.png");
				c=0;
			}
		}
	});
	//点击文字弹出文本框
	$(".character").on("click",function(){
		$(".text_box_word").css("display","block");
		$(".sounds").css("color","#888");
		$(".sounds img").attr("src",urlval+"jzb2/images/voice.png");
		$(".character").css("color","#24BEED");
		$(".character img").attr("src",urlval+"jzb2/images/bluew.png");
	});
	//点击文本框取消按钮
	$(".cancel").on("click",function(){
		$(".text_box").css("display","none");
		$(".voice_show").css("height",minHeight);
	});
	//弹幕点击文本框确认发送
	$(".send").on("click",function(){
        alert(1)
		if($.trim($(".write").val())==""){

			alert("评论内容不可以为空！");
		}else{
			$.ajax({
				type:'post',
				//url:addUrl+'index.php/Home/Live/ajaxAddDiscuss',
                url:addUrl+'Live/ajaxAddDiscuss.php',
				//dataType:'json',
				data:{content:$(".write").val()},
				success:function(json){
					objBlur("write",".write",300);
					$(".nomore").css("display","block");
					$(".text_box").css("display","none");
					$(".no_question").css("display","none");
					$(".write").val("");
					$('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight );
                    json.success === false && alert(json.info);
				},
				error:function(){
					alert("wrong");
				}
			});
		}
	});
	//点击铅笔
	$(".wri_pic").on("click",function(){
		$(".text_box").css("display","block");
		$(".voice_word").css("bottom","0");
		$(".tape_box").css("display","none");
		$(".sounds").attr("data-name",0);
	});
	//使用说明
	$(".instructions").on("click",function(){
		$(".use_ins").css("display","block");
	})
	//我知道了
	$(".use_ins").on("click",function(){
		$(".use_ins").css("display","none");
	})
	//点击顶部箭头弹出收起
	$(".jt").on("click",function(){
		if($(".jt").attr("data-type")=='r'){
			$(".peo_pic").css("display","none");
			$(".peo_num").css("display","none");
			$(".line").css("display","none");
			$(".wri_pic").css("display","none");
			$(".jt").attr("data-type","l");
			$(".jt").css({"background":"url("+urlval+"jzb2/images/arrows2.png)","background-size":"100% 100%"});
		}else{
			$(".peo_pic").css("display","block");
			$(".peo_num").css("display","block");
			$(".line").css("display","block");
			$(".wri_pic").css("display","block");
			$(".jt").css({"background":"url("+urlval+"jzb2/images/arrows.png)","background-size":"100% 100%"});
		}
	});
	//弹幕区显示
	var M;
	$.ajax({
		type:"post",
		//url:addUrl+"index.php/Home/Live/ajaxGetDiscussAll",
        url:addUrl+"Live/ajaxGetDiscussAll.php",
		dataType:"jsonp",
		success:function(data){
			var data = eval(data);
			console.log(data);
			M = data.info.length;
			var str2 = '';
			for(var i=data.info.length-1;i>=0&&i<data.info.length;i--){
				str2 += '<ul class="scr_mes"><li class="mes_con">'+data.info[i].content+'</li><li class="sanj"></li><li class="scr_pic"></li></ul>';
				$(".bullet_screen").html(str2);
			}
			for(var i=$(".scr_pic").length-1,j=0;j<$(".scr_pic").length&&i>=0&&i<$(".scr_pic").length;i--,j++){
				$(".scr_pic").eq(j).css({
					background:"url("+data.info[i].head_img_url+")",
					backgroundSize:"100% 100%",
					borderRadius:"50%"
				});
			}
		},
		error:function(){
			M=0;
			console.log(M);
		}
	});
	//实时获取最新的弹幕并显示
	setInterval(function(){
		//给每条语音添加data-name
		//给每条语音添加自定义属性存属性值
		for (var i=0;i<$(".message_voice").length;i++){
			$(".message_voice").eq(i).attr("data-name",i);
		}
		$.ajax({
			type:"post",
			//url:addUrl+"index.php/Home/Live/ajaxGetDiscussAll",
            url:addUrl+"Live/ajaxGetDiscussAll.php",
			dataType:"jsonp",
			success:function(data){
				var data = eval(data);
				var i = data.info.length-1;
				var str2 = '';
				if(M>0&&M<data.info.length){
					$(".scr_mes").eq(0).before('<ul class="scr_mes"><li class="mes_con">'+data.info[i].content+'</li><li class="sanj"></li><li class="scr_pic"></li></ul>');
					M = data.info.length;
					$(".scr_pic").eq(0).css({
						background:"url("+data.info[i].head_img_url+")",
						backgroundSize:"100% 100%",
						borderRadius:"50%"
					});
					console.log(M);
				}else if(M==0&&data.info.length==1){
					$(".bullet_screen").append('<ul class="scr_mes"><li class="mes_con">'+data.info[i].content+'</li><li class="sanj"></li><li class="scr_pic"></li></ul>');
					M =data.info.length;
					$(".scr_pic").eq(0).css({
						background:"url("+data.info[i].head_img_url+")",
						backgroundSize:"100% 100%",
						borderRadius:"50%"
					});
				}
			}
		});
		//统计人次
		$.ajax({
			type:"get",
			//url:addUrl+"index.php/Home/Live/ajaxGetPerTimes",
            url:addUrl+"Live/ajaxGetPerTimes.php",
			dataType:"jsonp",
			success:function(data){
				$(".peo_num").html(data.info+"人次");
			},
			error:function(){
			}
		});
	},100000)
	//点击讨论弹出讨论区
	$(".discuss_room").on("click",function(){
		$(".dis_show").html("");
		$.ajax({
			type:"post",
			//url:addUrl+"index.php/Home/Live/ajaxGetDiscussAll",
            url:addUrl+"Live/ajaxGetDiscussAll.php",
			dataType:"jsonp",
			success:function(data){
				var str = '';
				if(data.info.length!=0){
					$(".no_question").css("display","none");
					$(".nomore").css("display","block");
				}
				for(var i=data.info.length-1;i>=0&&i<data.info.length;i--){
					if(data.info[i].status==1){
						str += '<ul class="question" data-name='+data.info[i].discuss_id+'><li class="asker_pic" style="background:url"'+data.info[i].head_img_url+'")"></li><li class="asker_name">'+data.info[i].nick_name+'</li><li class="ask_time"><span class="ask_month">'+data.info[i].create_time+'</span><span class="ask_min"></span><span class="forbid">禁言</span></li><li class="a">已上墙</li><li class="ask_con">'+data.info[i].content+'</li></ul>';
					}else{
						str += '<ul class="question" data-name='+data.info[i].discuss_id+'><li class="asker_pic" style="background:url"'+data.info[i].head_img_url+'")"></li><li class="asker_name">'+data.info[i].nick_name+'</li><li class="ask_time"><span class="ask_month">'+data.info[i].create_time+'</span><span class="ask_min"></span><span class="forbid">禁言</span></li><li class="up_wall">上墙</li><li class="ask_con">'+data.info[i].content+'</li></ul>';
					}
				}
				$(".dis_show").html(str);
				for(var i=$(".asker_pic").length-1,j=0;j<$(".asker_pic").length&&i>=0&&i<$(".asker_pic").length;i--,j++){
					$(".asker_pic").eq(j).css({
						background:"url("+data.info[i].head_img_url+")",
						backgroundSize:"100% 100%"
					});
				}
			}
		});
		$(".discuss_box").css("display","block");
		$(".voice_word").css("display","none");
		$(".tape_box").css("display","none");
		$(".sounds").attr("data-name",0);
		$(".voice_show").css("padding-bottom","0");
	});
	//点击输入栏弹出输入框
	$(".dis_pj").on("click",function(){
		$(".text_box").css("display","block");
	})
	//返回直播页面
	$(".opc").on("click",function(){
		$(".voice_show").height(minHeight);
		$(".discuss_box").css("display","none");
		$(".voice_word").css("display","block");
		$(".voice_word").css("bottom","0");
		$(".sounds").css("color","#888");
		$(".sounds img").attr("src",urlval+"jzb2/images/voice.png");
	});
	$(".return_room").on("click",function(){
		$(".voice_show").height(minHeight);
		$(".discuss_box").css("display","none");
		$(".voice_word").css("display","block");
		$(".voice_word").css("bottom","0");
		$(".sounds").css("color","#888");
		$(".sounds img").attr("src",urlval+"jzb2/images/voice.png");
	});
	//点击文字输入框的取消
	$(".cancel_word").on("click",function(){
		$(".voice_show").height(minHeight);
		$(".text_box_word").css("display","none");
		$(".write_word").val("");
		$(".tape_box").css("display","none");
		$(".sounds").attr("data-name",0);
		$(".character").css("color","#888");
		$(".character img").attr("src",urlval+"jzb2/images/word.png");
	});
	//点击文字输入框的发送
	$(".send_word").on("click",function(){
		if($.trim($(".write_word").val())==""){
			alert("发送内容不能为空！");
		}else{
			objBlur("write_word",".write_word",300);
			//讲师文字数据交互
			$.ajax({
				type:"post",
				//url:addUrl+"index.php/Home/Live/ajaxSaveVoice",
                url:addUrl+"Live/ajaxSaveVoice.php",
				dataType:"jsonp",
				data:{
					type:2,
					bro_content:$(".write_word").val()
				},
				success:function(){
					var myDate = new Date();
					var year = myDate.getFullYear();
					var month = myDate.getMonth()+1;
					var day = myDate.getDate();
					var hour = myDate.getHours();
					var minutes = myDate.getMinutes();
					var seconds = myDate.getSeconds();
					$(".voice_show").append('<div class="word_message message"><div class="word_time">'+year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao1"/><div class="word_c">'+$(".write_word").val()+'<img src="'+urlval+'jzb2/images/recall.png" class="recall" data-type="2"/></div></div></div></div>');
					//$(".poster_pic").css({background:"url("+head_img_url+")",backgroundSize:"100% 100%"});
					$(".text_box_word").css("display","none");
					$(".write_word").val("");
					$(".character").css("color","#888");
					$(".character img").attr("src",urlval+"jzb2/images/word.png");
					$('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight );
				}
			});
		};
	});
	//点击上墙
	var id;
	$(".dis_area").delegate(".up_wall","click",function(){
		var index = $(".up_wall").index(this);
		$(this).attr("data-name",index);
		$(this).addClass("a");
		$(".up_wall_float").css("display","block");
		id = $(this).parents(".question").attr("data-name");
	});
	//点击上墙的取消按钮
	$(".upwall_cancel").on("click",function(){
		$(".up_wall_float").css("display","none");
		$(".replay_upwall").val("");
		$(".up_wall").removeClass("a");
		$(".voice_word").css("bottom","0")
		$(".tape_box").css("display","none");
	});
	//点击上墙的确认按钮
	$(".upwall_true").on("click",function(){
        alert($(".replay_upwall").val())
		$.ajax({
			type:"post",
			//url:addUrl+"index.php/Home/Live/ajaxAddReply",
            url:addUrl+"Live/ajaxAddReply.php",
			dataType:"jsonp",
			data:{
				discuss_id:id,
				content:$(".replay_upwall").val()
			},
			success:function(){
				$(".a").html("已上墙");
				var myDate = new Date();
				var year = myDate.getFullYear();
				var month = myDate.getMonth()+1;
				var day = myDate.getDate();
				var hour = myDate.getHours();
				var minutes = myDate.getMinutes();
				var seconds = myDate.getSeconds();
				if($(".replay_upwall").val()!=''){
					$(".voice_show").append('<div class="up_message message"><div class="word_time">'+year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><img src="'+urlval+'jzb2/images/recall.png" class="recall" data-type="4"/><div class="up_question"><span class="up_peo">'+$(".a").siblings(".asker_name").html()+'：</span><span class="up_ask">'+$(".a").siblings(".ask_con").html()+'</span></div><div class="reply_box"><span class="reply">回复：</span><span class="replay_answer">'+$(".replay_upwall").val()+'</span></div></div></div></div></div>');
					//$(".poster_pic").css({background:"url("+head_img_url+")",backgroundSize:"100% 100%"});
				}else{
					$(".voice_show").append('<div class="up_message message"><div class="word_time">'+year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><img src="'+urlval+'jzb2/images/recall.png" class="recall" data-type="4"/><div class="up_question"><span class="up_peo">'+$(".a").siblings(".asker_name").html()+'：</span><span class="up_ask">'+$(".a").siblings(".ask_con").html()+'</span></div></div></div></div></div>');
					//$(".poster_pic").css({background:"url("+head_img_url+")",backgroundSize:"100% 100%"});
				}
				$(".a").removeClass("up_wall");
				$(".up_wall_float").css("display","none");
				$(".replay_upwall").val("");
				$(".voice_word").css("bottom","0")
				$(".tape_box").css("display","none");
				$('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight );
			}
		});
	})
	//点击撤销按钮
	var This;
	$(".voice_show").delegate(".recall","click",function(){
		This = $(this);
		$(".recall_float").css("display","block");
	});
	$(".recall_true").on("click",function(){
		var type = This.attr("data-type");
		//如果是上墙回复
		if(type==4){
			var content = This.siblings(".reply_box").children(".replay_answer").html();
            alert(content)
			console.log(content);
			$.ajax({
				type:"post",
				//url:addUrl+"index.php/Home/Live/ajaxDelBroContent",
                url:addUrl+"Live/ajaxDelBroContent.php",
				dataType:"jsonp",
				data:{
					type:type,
					content:content
				},
				success:function(){
					This.parentsUntil('.voice_show').remove();
					$(".recall_float").css("display","none");
				}
			});
		}else if(type==1){
			//如果是语音
			var bro_con = This.siblings(".yy").attr("data-src");
			var src_con = This.siblings(".yy").attr("src");
			if(src_con==''){
				//如果没有src存的路径是data-src；
				$.ajax({
					type:"post",
					//url:addUrl+"index.php/Home/Live/ajaxDelBroContent",
                    url:addUrl+"Live/ajaxDelBroContent.php",
					dataType:"jsonp",
					data:{
						type:type,
						bro_content:bro_con,
					},
					success:function(){
						This.parentsUntil('.voice_show').remove();
						$(".recall_float").css("display","none");
					}
				});
			}else{
				//路径变成src
				$.ajax({
					type:"post",
					//url:addUrl+"index.php/Home/Live/ajaxDelBroContent",
                    url:addUrl+"Live/ajaxDelBroContent.php",
					dataType:"jsonp",
					data:{
						type:type,
						bro_content:src_con,
					},
					success:function(){
						This.parentsUntil('.voice_show').remove();
						$(".recall_float").css("display","none");
					}
				});
			}
		}else if(type==2){
			//如果是文字
			var word_con = This.parents(".word_c").text();
			console.log(word_con);
			$.ajax({
				type:"post",
				//url:addUrl+"index.php/Home/Live/ajaxDelBroContent",
                url:addUrl+"Live/ajaxDelBroContent.php",
				dataType:"jsonp",
				data:{
					type:type,
					bro_content:word_con,
				},
				success:function(){
					This.parentsUntil('.voice_show').remove();
					$(".recall_float").css("display","none");
				}
			});
		}

	})
	$(".recall_can").on("click",function(){
		$(".recall_float").css("display","none");
	})
	//关闭直播间
	$(".close").on("click",function(){
		$(".close_float").css("display","block");
	});
	//确认关闭直播间
	$(".close_true").on("click",function(){
		$.ajax({
			type:"get",
			//url:addUrl+"index.php/Home/Live/ajaxLessonShutDown",
            url:addUrl+"Live/ajaxLessonShutDown.php",
			dataType:"jsonp",
			success:function(data){
				$(".close_float").remove();
				$(".voice_word").remove();
				$(".close").remove();
				$(".refresh").remove();
				$(".forbid").remove();
				$(".a").remove();
				$(".up_wall").remove();
				//重新计算消息展示区域高度
				var shHeight = $(window).height()-$(".head").height()-$(".middle").height();
				console.log(shHeight);
				$(".voice_show").height(shHeight);
				$(".dis_btm").css("bottom","0");
			}
		});
	});
	//取消关闭直播间
	$(".close_can").on("click",function(){
		$(".close_float").css("display","none");
	});
	//禁言功能
	var index;
	$(".dis_show").delegate(".forbid","click",function(){
		$(".forbid_float").css("display","block");
		$(this).addClass("f");
		index = $(this).parents(".question").index();
		console.log(index);
	});
	//禁言取消
	$(".forbid_can").on("click",function(){
		$(".forbid_float").css("display","none");
		$(".f").removeClass("f");
	});
	//禁言确定
	$(".forbid_true").on("click",function(){
		var userId = $(".question").eq(index).attr("data-name");
		console.log(userId);
		$.ajax({
			type:"get",
			//url:addUrl+"index.php/Home/Live/ajaxShutUp",
            url:addUrl+"Live/ajaxShutUp.php",
			dataType:"json",
			data:{
				discuss_id:userId
			},
			success:function(data){
				console.log(data);
			}
		});
		$(".f").parentsUntil('.dis_show').remove();
		$(".forbid_float").css("display","none");
		$(".scr_mes").eq(index).remove();
	});
	//点击右侧按钮最后一个
	$(".more").on("click",function(){
		$(".introduce").css("display","block");
	});
	//点击浮层退出介绍
	$(".introduce").on("click",function(){
		$(".introduce").css("display","none");
	});
})
var addUrl=$(".addressUrl").val();

//停止播放
function stopPlay(localId){
	wx.pauseVoice({
		localId: localId // 需要暂停的音频的本地ID，由stopRecord接口获得
	});
}
//停止录音
function voiceStop(m){
	wx.stopRecord({
		success: function (res) {
			var localId = res.localId;
			$("body").append("<p class='upsrc'></p>");
			$(".upsrc").attr("data-upSrc",localId);
			// upLoadVoice(localId,m);
		}
	});
}
//voice文件上传至微信服务器
function upLoadVoice(localId,m){
	wx.uploadVoice({
		localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
		isShowProgressTips: 1, // 默认为1，显示进度提示
		success: function (res) {
			$.ajax({
				//url:addUrl+'index.php/Home/Live/ajaxSaveVoice',
                url:addUrl+'Live/ajaxSaveVoice.php',
				type:'post',
				dataType:'json',
				data:{
					bro_content:res.serverId,
					type:1,
					voice_len:m
				},
				success:function(){
					alert("ok");
				}
			})
			$("audio").last().attr("data-src",res.serverId);
		}
	});
}
function listenEnd(n,c){
	wx.onVoicePlayEnd({
		success: function (res) {
			//var localId = res.localId; // 返回音频的本地ID
			$(".gif").attr("src",urlval+"jzb2/images/zj-stop.png");
			n=Number(n)+1;
			var dataSrc=$(".message_voice").eq(n).children(".yy").attr("data-src");
			playVoice(dataSrc);
			$(".message_voice").eq(n).children(".gif").attr("src",urlval+"jzb2/images/zj-play.gif");
			$(".message_voice").eq(n).siblings(".voice_time").children(".red_cir").css({display:"none"});
			c=0;
		}
	});
}
//播放语音
function playVoice(server_id){
	wx.downloadVoice({
		serverId: server_id, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
		isShowProgressTips: 1, // 默认为1，显示进度提示
		success: function (res) {
			var localId = res.localId; // 返回音频的本地ID
			wx.playVoice({
				localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
			});
			$.each($("audio"), function(i) {
				$("audio").eq(i).attr("data-localsrc",localId);
				arrSrc.push($(".yy").eq(i).attr("data-localsrc"));
			});
		}
	});
}
//停止播放
function stopVoice(localId){
	wx.stopVoice({
		localId: localId // 需要停止的音频的本地ID，由stopRecord接口获得
	});
}