window.onload = function(){
    var addUrl = $(".addressUrl").val();
    //消息展示区域高度
    var minHeight = $(window).height()-$(".head").height()-$(".middle").height()-$(".bottom_box").height();
    $(".voice_show").height(minHeight);
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
//	//阻止微信浏览器下拉事件
//	var overscroll = function(e) {
//	  	e.addEventListener('touchstart', function() {
//	    var top = e.scrollTop
//	      , totalScroll = e.scrollHeight
//	      , currentScroll = top + e.offsetHeight;
//	    //If we're at the top or the bottom of the containers
//	    //scroll, push up or down one pixel.
//	    //
//	    //this prevents the scroll from "passing through" to
//	    //the body.
//	    if(top === 0) {
//	      e.scrollTop = 1;
//	    } else if(currentScroll === totalScroll) {
//	      e.scrollTop = top - 1;
//	    }
//	  });
//	  e.addEventListener('touchmove', function(evt) {
//	    //if the content is actually scrollable, i.e. the content is long enough
//	    //that scrolling can occur
//	    if(e.offsetHeight < e.scrollHeight)
//	      evt._isScroller = true;
//	  });
//	}
//	overscroll(document.querySelector('.scroll'));
//	document.body.addEventListener('touchmove', function(evt) {
//	  //In this case, the default behavior is scrolling the body, which
//	  //would result in an overflow.  Since we don't want that, we preventDefault.
//	  if(!evt._isScroller) {
//	    evt.preventDefault();
//	  }
//	});
}
$(document).ready(function(){
    var addUrl = $(".addressUrl").val();
    var nick_name = $('.pic-nick-name').attr('data-nick-name');
    var head_img_url = $('.pic-nick-name').attr('data-head-img-url');
    var user_nick_name = $('.pic-nick-name').attr("data-user-nick-name");
    var user_head_img_url = $('.pic-nick-name').attr("data-user-img-url");
    //录音框出来时录音展区的高度
    var reHeight = $(window).height()-$(".head").height()-$(".middle").height()-$(".bottom_box").height()-$(".tape_box").height();
    var minHeight = $(window).height()-$(".head").height()-$(".middle").height()-$(".bottom_box").height();
    var arr = [];
    var arr2 =[];
    var al;
    var arrSrc =[];
    //提取课程id
    var href=window.location.href;
    var hrefArr=href.split("/");
    var length=hrefArr.length;
//  console.log(hrefArr+','+hrefArr.length);
    var less_id=hrefArr[length-1].split('.')[0];

    //讲师消息
    function addMessage(length){
        var str='';
        for(var i=length-5;i<length;i++){
            console.log(arr);
            if(arr[i].type=='1'){
                var wid = '';
                wid = arr[i].voice_len/60*1.0+"rem";
                if(arr[i].audio_url==''){
                    $(".voice_show").append('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'">' +
                    '<audio src="" data-src="'+arr[i].bro_content+'" type="video/mp3" class="yy" preload="auto"></audio><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'/jzb2/images/zj-stop.png" class="gif"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
                }else{
                    $(".voice_show").append('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'">' +
                    '<audio src="'+arr[i].audio_url+'" type="video/mp3" preload="auto" class="yy"></audio><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'/jzb2/images/zj-stop.png" class="gif"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
                }
            }else if(arr[i].type=='2'){
                $(".voice_show").append('<div class="word_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao1"/><div class="word_c">'+arr[i].bro_content+'</div></div></div></div>');
            }else if(arr[i].type=='4'){
                if(arr[i].lr_content==''){
                    $(".voice_show").append('<div class="up_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><div class="up_question"><span class="up_peo">'+arr[i].nick_name+'：</span><span class="up_ask">'+arr[i].ld_content+'</span></div></div></div></div></div>');
                }else{
                    $(".voice_show").append('<div class="up_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><div class="up_question"><span class="up_peo">'+arr[i].nick_name+'：</span><span class="up_ask">'+arr[i].ld_content+'</span></div><div class="reply_box"><span class="reply">回复：</span><span class="replay_answer">'+arr[i].lr_content+'</span></div></div></div></div></div>');
                }
                console.log(111);
            }
            $(".poster_pic").css({background:"url("+head_img_url+")",backgroundSize:"100% 100%"});
        }
    }
    var d=0;
    //页面一进来的展示
    $.ajax({
        type:"post",
        url:addUrl+"index.php/Home/Live/ajaxGetBroadcast",
        dataType:"json",
        data:{
            lesson_id:less_id
        },
        success:function(data){
            console.log(4444444444)
            if(false){
                d=0;
            }else{
                var data = eval(data);
                console.log(11111)
                console.log(data.info);
                for (var name in data.info) {
                    arr2.push(name);
                }
                $.each(data.info, function(i){
                    arr.push(data.info[i]);
                });
                console.log(arr[0].type);
                al=arr.length;//传过来录音的长度
                d=arr.length;
                /*  if(d>5){
                 addMessage(al);
                 }*/
                // if(d<=5){
                for(var i=0;i<d;i++){
                    if(arr[i].type=='1'){
                        var wid = '';
                        wid = arr[i].voice_len/60*1.0+"rem";
                        if(arr[i].audio_url==''){
                            $(".voice_show").append('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'">' +
                            '<audio src="" data-src="'+arr[i].bro_content+'" type="video/mp3" preload="auto" class="yy"></audio><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'/jzb2/images/zj-stop.png" class="gif"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
                        }else{
                            $(".voice_show").append('<div id="'+i+'" class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'">' +
                            '<audio src="'+arr[i].audio_url+'" type="video/mp3" class="yy" preload="auto"></audio><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'/jzb2/images/zj-stop.png" class="gif"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
                        }
                    }else if(arr[i].type=='2'){
                        $(".voice_show").append('<div class="word_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao1"/><div class="word_c">'+arr[i].bro_content+'</div></div></div></div>');
                    }else if(arr[i].type=='4'){
                        if(arr[i].lr_content==''){
                            $(".voice_show").append('<div class="up_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><div class="up_question"><span class="up_peo">'+arr[i].nick_name+'：</span><span class="up_ask">'+arr[i].ld_content+'</span></div></div></div></div></div>');
                        }else{
                            $(".voice_show").append('<div class="up_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><div class="up_question"><span class="up_peo">'+arr[i].nick_name+'：</span><span class="up_ask">'+arr[i].ld_content+'</span></div><div class="reply_box"><span class="reply">回复：</span><span class="replay_answer">'+arr[i].lr_content+'</span></div></div></div></div></div>');
                        }
                    }
                    // $('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight);
                    $(".poster_pic").css({background:"url("+head_img_url+")",backgroundSize:"100% 100%"});
                    //console.log(N);
                }
                // }
                // $('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight);
                //给每条语音添加自定义属性存属性值
                for (var i=0;i<$(".message_voice").length;i++){
                    $(".message_voice").eq(i).attr("data-name",i);
                }
            }
        }
    });
    //刷新功能
    /*$(".refresh").on("click",function(){
     $(".voice_show").html("");
     var arr2=[];
     var arr=[];
     $.ajax({
     type:"post",
     url:addUrl+"index.php/Home/Live/ajaxGetBroadcast",
     dataType:"json",
     data:{
     lesson_id:less_id
     },
     success:function(data){
     console.log('lllllllllllllll');
     if(false){
     d=0;
     }else{
     var data = eval(data);
     console.log(data);
     for (var name in data.info) {
     arr2.push(name);
     }
     $.each(data.info, function(i){
     arr.push(data.info[i]);
     });
     al=arr.length;
     d=arr.length;
     console.log(arr.length);
     console.log(d);
     if(d>5){
     addMessage(al);
     }
     if(d<=5){
     for(var i=0;i<d;i++){
     if(arr[i].type=='1'){
     var wid = '';
     wid = arr[i].voice_len/60*1.0+"rem";
     if(arr[i].audio_url==''){
     $(".voice_show").append('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="" data-src="'+arr[i].bro_content+'" type="video/mp3" preload="auto" class="yy"></audio><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'/jzb2/images/zj-stop.png" class="gif"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
     }else{
     $(".voice_show").append('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="'+arr[i].audio_url+'" type="video/mp3" preload="auto" class="yy"></audio><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'/jzb2/images/zj-stop.png" class="gif"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
     }
     }else if(arr[i].type=='2'){
     $(".voice_show").append('<div class="word_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao1"/><div class="word_c">'+arr[i].bro_content+'</div></div></div></div>');
     }else if(arr[i].type=='4'){
     if(arr[i].lr_content==''){
     $(".voice_show").append('<div class="up_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><div class="up_question"><span class="up_peo">'+arr[i].nick_name+'：</span><span class="up_ask">'+arr[i].ld_content+'</span></div></div></div></div></div>');
     }else{
     $(".voice_show").append('<div class="up_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><div class="up_question"><span class="up_peo">'+arr[i].nick_name+'：</span><span class="up_ask">'+arr[i].ld_content+'</span></div><div class="reply_box"><span class="reply">回复：</span><span class="replay_answer">'+arr[i].lr_content+'</span></div></div></div></div></div>');
     }
     }
     $('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight);
     //$(".poster_pic").css({background:"url("+head_img_url+")",backgroundSize:"100% 100%"});
     console.log(d);
     }
     }
     $('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight);
     //给每条语音添加自定义属性存属性值
     for (var i=0;i<$(".message_voice").length;i++){
     $(".message_voice").eq(i).attr("data-name",i);
     }
     }
     }

     });
     })*/
    //弹幕区显示
    var M;
    $.ajax({
        type:"post",
        url:addUrl+"index.php/Home/Live/ajaxGetDiscussAll",
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
            for(var i=data.info.length-1,j=0;j<data.info.length&&i>=0&&i<data.info.length;i--,j++){
                $(".scr_pic").eq(j).css({
                    background:"url("+data.info[i].head_img_url+")",
                    backgroundSize:"100% 100%",
                    borderRadius:"50%"
                });
            }
        },
        error:function(){
            M=0;
        }
    });
    //展示最新的消息
    setInterval(function(){
        $.ajax({
            type:"post",
            url:addUrl+"index.php/Home/Live/ajaxGetBroadcast",
            dataType:"json",
            data:{
                lesson_id:less_id
            },
            success:function(data){
                console.log(2222222222222)
                console.log(data.info)
                var state = data.success;
                if(state==false){
                    d=0;
                }else{
                    var newarr=[];
                    var newinfo=[];
                    var data = eval(data);
                    for (var name in data.info) {
                        newarr.unshift(name);
                    }
                    $.each(data.info, function(i){
                        newinfo.unshift(data.info[i]);
                    });
                    if(d<newarr.length){
                        if(newinfo[0].type=='1'){
                            var wid = '';
                            wid = newinfo[0].voice_len/60*1.0+"rem";
                            if(newinfo[0].audio_url==''){
                                $(".voice_show").append('<div class="voice_message message"><div class="message_time">'+newarr[0]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="" data-src="'+newinfo[0].bro_content+'" type="video/mp3" preload="auto" class="yy"></audio><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'/jzb2/images/zj-stop.png" class="gif"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+newinfo[0].voice_len+'"</div></div></div></div></div>');
                            }else{
                                $(".voice_show").append('<div class="voice_message message"><div class="message_time">'+newarr[0]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="'+newinfo[0].audio_url+'" type="video/mp3" preload="auto" class="yy"></audio><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'/jzb2/images/zj-stop.png" class="gif"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+newinfo[0].voice_len+'"</div></div></div></div></div>');
                            }
                        }else if(newinfo[0].type=='2'){
                            $(".voice_show").append('<div class="word_message message"><div class="word_time">'+newarr[0]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao1"/><div class="word_c">'+newinfo[0].bro_content+'</div></div></div></div>');
                        }else if(newinfo[0].type=='4'){
                            if(newinfo[0].lr_content==''){
                                $(".voice_show").append('<div class="up_message message"><div class="word_time">'+newarr[0]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><div class="up_question"><span class="up_peo">'+newinfo[0].nick_name+'：</span><span class="up_ask">'+newinfo[0].ld_content+'</span></div></div></div></div></div>');
                            }else{
                                $(".voice_show").append('<div class="up_message message"><div class="word_time">'+newarr[0]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><div class="up_question"><span class="up_peo">'+newinfo[0].nick_name+'：</span><span class="up_ask">'+newinfo[0].ld_content+'</span></div><div class="reply_box"><span class="reply">回复：</span><span class="replay_answer">'+newinfo[0].lr_content+'</span></div></div></div></div></div>');
                            }
                        }
                        d = newarr.length;
                        //$('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight);
                    }
                    //$(".poster_pic").css({background:"url("+head_img_url+")",backgroundSize:"100% 100%"});
                    //给每条语音添加自定义属性存属性值
                    for (var i=0;i<$(".message_voice").length;i++){
                        $(".message_voice").eq(i).attr("data-name",i);
                    }
                }
            },
            error:function(){
                console.log("实时请求消息出错");
            }
        },5000);
        //弹幕区
        $.ajax({
            type:"post",
            url:addUrl+"index.php/Home/Live/ajaxGetDiscussAll",
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
                }else if(M==0&&data.info.length==1){
                    $(".bullet_screen").append('<ul class="scr_mes"><li class="mes_con">'+data.info[i].content+'</li><li class="sanj"></li><li class="scr_pic"></li></ul>');
                    M =data.info.length;
                    $(".scr_pic").eq(0).css({
                        background:"url("+data.info[i].head_img_url+")",
                        backgroundSize:"100% 100%",
                        borderRadius:"50%"
                    });
                }
            },
            error:function(){
                M=0;
            }
        });
        //统计人次
        $.ajax({
            type:"get",
            url:addUrl+"index.php/Home/Live/ajaxGetPerTimes",
            dataType:"jsonp",
            success:function(data){
                //console.log(data);
                $(".peo_num").html(data.info+"人次");
            },
            error:function(){
                //alert("统计人次出错");
            }
        });
    },1000)


    //下拉加载更多
    /*var startY,endY,_touch,_touche;
     $(".voice_show").on("touchstart",function(e){
     _touch = e.originalEvent.targetTouches[0];
     startY= _touch.pageY;
     });
     $(".voice_show").on("touchmove",function(e){
     if($('.voice_show')[0].scrollHeight>0){
     $(".alert_loading").css("display","block");
     }
     })
     console.log($('.voice_show')[0].scrollHeight);
     $(".voice_show").on("touchend",function(e){
     _touche = e.originalEvent.changedTouches[0];
     endY= _touche.pageY;
     var scrollTop = $('.voice_show').scrollTop();
     console.log(scrollTop)
     //		if(endY-startY>=3){
     if(scrollTop==0){
     al = al-5;
     $(".alert_loading").css("display","none");
     for(var i=al-1;i>=al-5&&i>=0;i--){
     if(i<=0){
     $(".alert_nomore").css("display","block");
     $(".alert_nomore").fadeOut(1500);
     $(".alert_loading").css("opacity",0);
     }
     if(arr[i].type=='1'){
     var wid = '';
     wid = arr[i].voice_len/60*1.0+"rem";
     if(arr[i].audio_url==''){
     $(".message").eq(0).before('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="" data-src="'+arr[i].bro_content+'" type="video/mp3" preload="auto" class="yy"></audio><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'/jzb2/images/zj-stop.png" class="gif"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
     }else{
     $(".message").eq(0).before('<div class="voice_message message"><div class="message_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="message_info"><div class="poster_pic"></div><div class="voiceandtime"><div class="message_voice" style="width:'+wid+'"><audio src="'+arr[i].audio_url+'" type="video/mp3" preload="auto" class="yy"></audio><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao"/><img src="'+urlval+'/jzb2/images/zj-stop.png" class="gif"/></div><div class="voice_time"><div class="red_cir"></div><div class="time_num">'+arr[i].voice_len+'"</div></div></div></div></div>');
     }
     }else if(arr[i].type=='2'){
     $(".message").eq(0).before('<div class="word_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao1"/><div class="word_c">'+arr[i].bro_content+'</div></div></div></div>');
     }else if(arr[i].type=='4'){
     $(".message").eq(0).before('<div class="up_message message"><div class="word_time">'+arr2[i]+'</div><div class="poster_info"><p class="poster_name">'+nick_name+'</p><p class="poster_iden">讲师</p></div><div class="word_info clearfix"><div class="poster_pic"></div><div class="message_word"><img src="'+urlval+'/jzb2/images/zj-jiao.png" class="jiao1"/><div class="up_message_box"><div class="up_question"><span class="up_peo">'+arr[i].nick_name+'：</span><span class="up_ask">'+arr[i].ld_content+'</span></div><div class="reply_box"><span class="reply">回复：</span><span class="replay_answer">'+arr[i].lr_content+'</span></div></div></div></div></div>');
     }
     //$(".poster_pic").css({background:"url("+head_img_url+")",backgroundSize:"100% 100%"});
     }
     //给每条语音添加自定义属性存属性值
     for (var i=0;i<$(".message_voice").length;i++){
     $(".message_voice").eq(i).attr("data-name",i);
     }
     }
     });*/
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
    //点击语音播放  动态创建的dom节点用delegate绑定
    var n;
    var c;
    $(".voice_show").delegate(".message_voice","click",function(){
        n=$(this).attr("data-name");
        var src=$(".message_voice").eq(n).children(".yy").attr("src");
        var dataSrc=$(".message_voice").eq(n).children(".yy").attr("data-src");
        var dataLocal=$(".message_voice").eq(n).children(".yy").attr("data-localsrc");
        c=0;
        if(src!=''){
            if($(".yy")[n].paused){
                $.each($(".message_voice"), function(b) {
                    clearInterval(time);
                    $(".yy")[b].pause();
                    $(".gif").eq(b).attr("src",urlval+"/jzb2/images/zj-stop.png");
                });
                $(".gif").eq(n).attr("src",urlval+"/jzb2/images/zj-play.gif");
                $(".message_voice").eq(n).siblings(".voice_time").children(".red_cir").css({display:"none"});
                $(".yy")[n].play();

                //图片闪动,语音播放完图片静止
                time = setInterval(function(){
                    var allTime = $(".yy")[n].duration;
                    var curTime = $(".yy")[n].currentTime;
                    if(allTime-curTime>0){
                        $(".yy")[n].play();
                        $(".gif").eq(n).attr("src",urlval+"/jzb2/images/zj-play.gif");
                    }else{
                        $(".yy")[n].pause();
                        $(".gif").eq(n).attr("src",urlval+"/jzb2/images/zj-stop.png");
                        //自动播放下一条
                        n = Number(n)+1;
                        $(".yy")[n].play();
                        $(".gif").eq(n).attr("src",urlval+"/jzb2/images/zj-play.gif");
                        $(".red_cir").eq(n).css("display","none");
                    }
                },1000)
            }else{
                $(".yy")[n].pause();
                clearInterval(time);
                $(".gif").eq(n).attr("src",urlval+"/jzb2/images/zj-stop.png");
            }
        }else{
            if(c==0){
                $.each($(".message_voice"), function(b){
                    $(".gif").eq(b).attr("src",urlval+"/jzb2/images/zj-stop.png");
                });
                playVoice(dataSrc);
                $(".message_voice").eq(n).children(".gif").attr("src",urlval+"/jzb2/images/zj-play.gif");
                $(".message_voice").eq(n).siblings(".voice_time").children(".red_cir").css({display:"none"});
                c=1;
                listenEnd(n,c);
            }else{
                stopPlay(dataLocal)//语音停止
                $(".gif").eq(n).attr("src",urlval+"/jzb2/images/zj-stop.png");
                c=0;
            }
        }
    });
    //点击文本框取消按钮
    $(".cancel").on("click",function(){
        $(".text_box").css("display","none");
    });
    //弹幕点击文本框确认发送
    $(".send").on("click",function(){
        var a=$(".write").val();
        if($.trim($(".write").val())==""){
            //alert(1)
            alert("评论内容不可以为空！");
        }else{
            $.ajax({
                type:'post',
                url:addUrl+'index.php/Home/Live/ajaxAddDiscuss',
                dataType:'jsonp',
                data:{
                    content:$(".write").val()
                },
                success:function(){
                    objBlur("write",".write",300);
                    $(".nomore").css("display","block");
//					if($(".question").length==0){
//						$(".nomore").before('<ul class="question"><li class="asker_pic"></li><li class="asker_name">'+user_nick_name+'</li><li class="ask_time"><span class="ask_month">08-20</span><span class="ask_min">18:29</span></li><li class="ask_con">'+$(".write").val()+'</li></ul>');
//					}else{
//						$(".question").eq(0).before('<ul class="question"><li class="asker_pic"></li><li class="asker_name">'+user_nick_name+'</li><li class="ask_time"><span class="ask_month">08-20</span><span class="ask_min">18:29</span></li><li class="ask_con">'+$(".write").val()+'</li></ul>');
//					}
//					if($(".scr_mes").length==0){
//						$(".bullet_screen").append('<ul class="scr_mes"><li class="mes_con">'+$(".write").val()+'</li><li class="sanj"></li><li class="scr_pic"></li></ul>');
//					}
//					$(".scr_pic").first().css({background:"url("+user_head_img_url+")",backgroundSize:"100% 100%",borderRadius:"50%"});
//					$(".asker_pic").first().css({background:"url("+user_head_img_url+")",backgroundSize:"100% 100%"});
                    $(".text_box").css("display","none");
                    $(".no_question").css("display","none");
                    $(".write").val("");
                    $('.voice_show').scrollTop( $('.voice_show')[0].scrollHeight );
                },
                error:function(){
                    alert("您已被禁言！");
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
            $(".jt").css({"background":"url("+urlval+"/jzb2/images/arrows2.png)","background-size":"100% 100%"});
        }else{
            $(".peo_pic").css("display","block");
            $(".peo_num").css("display","block");
            $(".line").css("display","block");
            $(".wri_pic").css("display","block");
            $(".jt").css({"background":"url("+urlval+"/jzb2/images/arrows.png)","background-size":"100% 100%"});
        }
    });

    //点击讨论弹出讨论区
    $(".discuss_room").on("click",function(){
        $(".dis_show").html("");
        $.ajax({
            type:"post",
            url:addUrl+"index.php/Home/Live/ajaxGetDiscussAll",
            dataType:"jsonp",
            success:function(data){
                var str = '';
                if(data.info.length!=0){
                    $(".no_question").css("display","none");
                    $(".nomore").css("display","block");
                }
                for(var i=data.info.length-1;i>=0&&i<data.info.length;i--){
                    if(data.info[i].status==1){
                        str += '<ul class="question" data-name='+data.info[i].discuss_id+'><li class="asker_pic" style="background:url"'+data.info[i].head_img_url+'")"></li><li class="asker_name">'+data.info[i].nick_name+'</li><li class="ask_time"><span class="ask_month">'+data.info[i].create_time+'</span><span class="ask_min"></span></li><li class="ask_con">'+data.info[i].content+'</li></ul>';
                    }else{
                        str += '<ul class="question" data-name='+data.info[i].discuss_id+'><li class="asker_pic" style="background:url"'+data.info[i].head_img_url+'")"></li><li class="asker_name">'+data.info[i].nick_name+'</li><li class="ask_time"><span class="ask_month">'+data.info[i].create_time+'</span><span class="ask_min"></span></li><li class="ask_con">'+data.info[i].content+'</li></ul>';
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
        $(".discuss_box").css("display","none");
        $(".voice_word").css("display","block");
        $(".voice_word").css("bottom","0");
        $(".sounds").css("color","#888");
        $(".sounds img").attr("src",urlval+"/jzb2/images/voice.png");
    });
    $(".return_room").on("click",function(){
        $(".discuss_box").css("display","none");
        $(".voice_word").css("display","block");
        $(".voice_word").css("bottom","0");
        $(".sounds").css("color","#888");
        $(".sounds img").attr("src",urlval+"/jzb2/images/voice.png");
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
            upLoadVoice(localId,m);
        }
    });
}
//voice文件上传至微信服务器
function upLoadVoice(localId,m){
    wx.uploadVoice({
        localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
           // alert(res)
            $.ajax({
                url:addUrl+'index.php/Home/Live/ajaxSaveVoice',
                type:'post',
                dataType:'json',
                data:{
                    bro_content:res.serverId,
                    type:1,
                    voice_len:m
                }
            })
            $("audio").last().attr("data-src",res.serverId);
        }
    });
}
//监听语音播放结束的函数
function listenEnd(n,c){
    wx.onVoicePlayEnd({
        success: function (res) {
            //var localId = res.localId; // 返回音频的本地ID
            $(".gif").attr("src",urlval+"/jzb2/images/zj-stop.png");
            n=Number(n)+1;
            var dataSrc=$(".message_voice").eq(n).children(".yy").attr("data-src");
            playVoice(dataSrc);
            $(".message_voice").eq(n).children(".gif").attr("src",urlval+"/jzb2/images/zj-play.gif");
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
            // console.log(arrSrc);
        }
    });
}