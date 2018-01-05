$(function($){
	//未购买评价页调数据
	var aaa = $(".lessId").val();
	var addressUrl = $(".addressUrl").val();
	//改变目录中圆圈中数字的颜色
	function changeClo(obj){
        var index = 0;
        for(var i=0;i<obj.length;i++){ 
            if(index==4){
                index=0;
            }
            obj.eq(i).addClass("color"+index);
			index++;
        };
    }
	//评价
	$.ajax({
		type:"get",
		url: addressUrl+"index.php/Api/Api/getComment",
		data:{id:aaa},
		dataType:"jsonp",
        jsonp:"callback",
		success:function(data){
			var data=eval(data);
			var str = '';
			for(var i=0;i<data.info.length;i++){
				var star = '';
				for(var j=0;j<data.info[i].geval_scores;j++){
					star += '<span class="start"></span>';
				}
				for(var j=0;j<5-data.info[i].geval_scores;j++){
					star += '<span class="start2"></span>';
				}
				str += '<ul class="every-pj clearfix"><li class="pj-touxiang"><img src="'+data.info[i].head_img_url+'"></li><li class="pj-name">'+data.info[i].geval_ordername+'</li><li class="everyone-starts">'+star+'</li><li class="pj-time"><span class="pj-ymd">'+data.info[i].geval_addtime+'</span></li><li class="pj-content hidden">'+replace_em(data.info[i].geval_content)+'</li></ul>';
			}
			//表情插件
			function replace_em(str){
				str = str.replace(/\</g,'&lt;');
				str = str.replace(/\>/g,'&gt;');
				str = str.replace(/\n/g,'<br/>');
				str = str.replace(/\[em_([0-9]*)\]/g,'<img src="../../../Public/web_common/jzb/images/arclist/$1.gif" border="0" />');
				return str;
			}
			$(".pj-show").html(str);
			// 总评价人数
			for (var i=0;i<data.eva;i++) {
				$(".statrs").append('<span class="start"></span>')
			}
			for (var i=0;i<5-data.eva;i++) {
				$(".statrs").append('<span class="start2"></span>')
			}
			// 总评价人数
			$(".pj-num").html("("+data.count+"人评价)")
		},
		error:function(){
			alert("出错！");
		}
	})
	//未购买课程目录调数据
	var arrtitle=[];
	var arrclasstime=[];
	$.ajax({
		type:"get",
		url:addressUrl+"index.php/Api/Api/getMenu",
		data:{id:aaa},
		dataType:"jsonp",
		jsonp:"callback",
		success:function(data){
			var data = eval(data);
			console.log(data);
			var str = '';
			for( var i=0;i<data.length;i++){ 
				var stringTime = data[i].start_at;
				var timestamp2 = Date.parse(new Date(stringTime));
				timestamp2 = timestamp2 / 1000;
				console.log(stringTime);
				console.log(timestamp2);
				if(timestamp2==1790589600){
					if(data[i].lesson_time == 0){
						str +='<ul class="kecheng" data-name='+data[i].id+'><a href="" class="zhibo"><li class="yuan">'+ (i+1) +'</li><li class="mulu-title dot">'+ data[i].title +'</li><li class="mulu-time"></li></a></ul>';
						//$(".mulu-title").eq(i).css({"width":"3.1rem"});
					}else{
						str +='<ul class="kecheng" data-name='+data[i].id+'><a href="" class="zhibo"><li class="yuan">'+ (i+1) +'</li><li class="mulu-title dot">'+ data[i].title +'</li><li class="mulu-time">'+ data[i].lesson_time +'</li></a></ul>';
					}
				}else{
					if(data[i].lesson_time == 0){
						str +='<ul class="kecheng" data-name='+data[i].id+'><a href="" class="zhibo"><li class="yuan">'+ (i+1) +'</li><li class="mulu-title dot">'+ data[i].title +'</li><li class="mulu-time">'+ data[i].start_at +'</li></a></ul>';
					}else{
						str +='<ul class="kecheng" data-name='+data[i].id+'><a href="" class="zhibo"><li class="yuan">'+ (i+1) +'</li><li class="mulu-title dot">'+ data[i].title +'</li><li class="mulu-time">'+ data[i].lesson_time +'</li></a></ul>';
					}
					$(".mulu-title").eq(i).css({"width":"3.1rem"});
				}
			}
			$(".show .bg").html(str);
			changeClo($(".yuan"));
			$(".kecheng").on("touchend",function(){
				var lessonId=$(this).attr("data-name");
				//$(".zhibo").attr("href",addressUrl+"index.php/Home/Live/teacherRoom.html?data="+lessonId)
				$(".zhibo").attr("href",addressUrl+"index.php/Home/Course/redirectUrl/course_id/"+lessonId);
			})
		},
		 error:function(){
		 	alert("目录页出错！");
		 }
	})
	//详情页调数据
	var arrxqstar=[];
	$.ajax({
		type:"get",
		url:addressUrl+"index.php/Home/Api/getDetail",
		data:{id:aaa},
		dataType:"jsonp",
		jsonp:"callback",
		success:function(data){
			var c=eval(data);
			$.each(c,function(i){
				arrxqstar.push(c[i]);
			});
			//课程评价星级
			for(var j=0;j<arrxqstar[1];j++){
				$(".peo-num").append('<span class="start"></span>');
			}
			for(var j=0;j<5-arrxqstar[1];j++){
				$(".peo-num").append('<span class="start2"></span>');
			}
			$(".pro-name").html("课程名称："+arrxqstar[0].coursename);
			$(".num").html(arrxqstar[0].playamount+"人学过");
			$(".detail").html(arrxqstar[0].content);
			$(".age").html(arrxqstar[0].people+"岁儿童");
			$(".pho").css({background:"url("+arrxqstar[0].cover_url+")",backgroundSize:"100% 100%"});
			$(".head").css({background:"url("+arrxqstar[0].course_pic+")",backgroundSize:"100% 100%"});
			$(".jsh").html(arrxqstar[0].lecturer_name);
			$(".jianjie").html(arrxqstar[0].cont);
			$(".o_pho").css({background:"url("+arrxqstar[0].org_url+")",backgroundSize:"100% 100%"});
			$(".o_name").html(arrxqstar[0].name);
			$(".o_jianjie").html(arrxqstar[0].intro);
			//详情页
			//超出字符数变成...点击展开可以显示内容，点击收起可以收起
			var detail=document.getElementsByClassName("detail")[0];
			//定义nn为当前文本的长度
			var nn = detail.innerHTML.length;
			//aa表示表示要隐藏起的文本
			var aa=detail.innerHTML.slice(70,nn);
			//nowWord表示要显示的文本
			var nowWord = detail.innerHTML.substr(0,70);
			//显示的内容等于要显示的文本加...展开
			detail.innerHTML=nowWord+'...展开↓';
			//定义i来判断
			var i=0;
			detail.onclick=function(){
				if(i==0){
					detail.innerHTML=nowWord+aa+'收起↑';	
					i=1;
				}else if(i==1){
					detail.innerHTML=nowWord+'...展开↓';
					i=0;
				}
			}
		}
	})
})
