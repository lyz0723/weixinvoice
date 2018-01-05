$(function($){
	//定义空数组来存取数据
	var arr=[];
	//存放每个人名字的空数组
	var arrname=[];
	//存放每个评价人的头像
	var arrpic=[];
	//存放每个人评价的星级
	var arrstar=[];
	//存放每条评价的评论内容
	var arrcon=[];
	//存放每条评价的评价时间
	var arrtime=[];
	//已经购买评价页调数据
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
	//评价页调数据
	$.ajax({
		type:"get",
		url:addressUrl+"index.php/Home/Api/getComment",
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
				str += '<ul class="every-pj clearfix"><li class="pj-touxiang"><img src="'+data.info[i].head_img_url+'"></li><li class="pj-name">'+data.info[i].geval_ordername+'</li><li class="everyone-starts">'+star+'</li><li class="pj-content hidden">'+replace_em(data.info[i].geval_content)+'</li><li class="pj-time"><span class="pj-ymd">'+data.info[i].geval_addtime+'</span></li></ul>';
			}
			function replace_em(str){
				str = str.replace(/\</g,'&lt;');
				str = str.replace(/\>/g,'&gt;');
				str = str.replace(/\n/g,'<br/>');
				str = str.replace(/\[em_([0-9]*)\]/g,'<img src="http://qd.vxin365.com/test_project/jzb/images/arclist/$1.gif" border="0" />');
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
	//已经购买课程目录调数据
	var arrtitle=[];
	var arrclasstime=[];
	var arrhref=[];
	$.ajax({
		type:"get",
		//http://testnew.vxin365.com/
		url:addressUrl+"index.php/Home/Api/getMenu",
		data:{id:aaa},
		dataType:"jsonp",
		jsonp:"callback",
		success:function(data){
			var data = eval(data);
			var str = '';
			for( var i=0;i<data.length;i++){ 
				str +='<ul class="kecheng" data-name='+data[i].id+'><a href=""><li class="yuan">'+ (i+1) +'</li><li class="mulu-title">'+ data[i].title +'</li><li class="mulu-time">'+ data[i].start_at +'</li></a></ul>';
//				str += '<div class="kecheng"><a href=""><ul class="mulu"><li class="mulu-title">'+ data[i].title +'</li><li class="mulu-time">课程时间：'+ data[i].start_at +'</li></ul><div class="yuan color0">'+ (i+1) +'</div></a></div>'
			}
			$(".show .bg").html(str);
			changeClo($(".yuan"));
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
			//console.log(data);
			var c=eval(data);
			$.each(c,function(i){
				arrxqstar.push(c[i]);
			});
			//console.log(arrxqstar[0].cover_url);
			//课程评价星级
			for(var j=0;j<arrxqstar[1];j++){
				$(".peo-num").append('<span class="start"></span>')
			}
			for(var j=0;j<5-arrxqstar[1];j++){
				$(".peo-num").append('<span class="start2"></span>')
			}
			$(".pro-name").html("课程名称："+arrxqstar[0].coursename)
			$(".num").html(arrxqstar[0].playamount+"人学过")
			$(".detail").html(arrxqstar[0].content);
			$(".age").html(arrxqstar[0].people+"岁儿童");
			$(".pho").css({background:"url("+addressUrl+arrxqstar[0].cover_url+")",
				backgroundSize:"100% 100%"
			})

			console.log("--------------------");
			console.log(arrxqstar[0]);
			console.log("--------------------");
			$(".head").css({background:"url("+addressUrl+arrxqstar[0].course_pic+")",
				backgroundSize:"100% 100%"
			})
			$(".jsh").html(arrxqstar[0].lecturer_name);
			$(".jianjie").html(arrxqstar[0].cont);
		}
	})

})
