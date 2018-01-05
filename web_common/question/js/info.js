$(function(){
	$(".age-check .check").eq(0).css("marginLeft",0);
	$(".age-check .check").eq(3).css("marginLeft",0);
	$(".address-check .check").eq(0).css("marginLeft",0);
	$(".address-check .check").eq(3).css("marginLeft",0);
	$(".culture-check .check").eq(0).css("marginLeft",0);
	$(".culture-check .check").eq(3).css("marginLeft",0);
	$(".child-age-check .check").eq(0).css("marginLeft",0);
	$(".child-age-check .check").eq(3).css("marginLeft",0);
	$(".care-check .check").eq(0).css("marginLeft",0);
	$(".care-check .check").eq(3).css("marginLeft",0);
	//点击爸爸妈妈变色
	var gender;
	var addUrl=$(".addressUrl").val();
	$(".par").on("click",function(){
		gender='';
		$(this).children(".parent").addClass("blue");
		$(this).siblings().children(".parent").removeClass("blue");
		gender = $(".par .blue").text();
		console.log(gender);
		$(".sex").attr("data-name",1);
	});
	//选择年龄
	var age;
	$(".age-check .check").on("click",function(){
		age='';
		$(this).children(".re-radio").addClass("checked");	
		$(this).siblings().children(".re-radio").removeClass("checked");
		age = $(".age-check .check .checked").siblings().text();
		console.log(age);
		$(".age").attr("data-name",1);
	});
	//家庭所在地
	var address;
	$(".address-check .check").on("click",function(){
		address='';
		$(this).children(".re-radio").addClass("checked");	
		$(this).siblings().children(".re-radio").removeClass("checked");
		address = $(".address-check .check .checked").siblings().text();
		console.log(address);
		$(".address").attr("data-name",1);
	})
	//文化程度
	var edu_level;
	$(".culture-check .check").on("click",function(){
		edu_level='';
		$(this).children(".re-radio").addClass("checked");	
		$(this).siblings().children(".re-radio").removeClass("checked");
		edu_level = $(".culture-check .check .checked").siblings().text();
		console.log(edu_level);
		$(".culture").attr("data-name",1);
	});
	//职业
	var profession;
	$(".work-check .check").on("click",function(){
		profession='';
		$(this).children(".re-radio").addClass("checked");	
		$(this).siblings().children(".re-radio").removeClass("checked");
		profession = $(".work-check .check .checked").siblings().text();
		console.log(profession);
		$(".work").attr("data-name",1);
	});
	//孩子的性别
	var baby_gender;
	$(".chil").on("click",function(){
		baby_gender='';
		$(this).children(".baby").addClass("blue");
		$(this).siblings().children(".baby").removeClass("blue");
		baby_gender = $(".chil .blue").text();
		console.log(baby_gender);
		$(".child-sex").attr("data-name",1);
	});
	//孩子的年龄
	var baby_age;
	$(".child-age-check .check").on("click",function(){
		baby_age='';
		$(this).children(".re-radio").addClass("checked");	
		$(this).siblings().children(".re-radio").removeClass("checked");
		baby_age = $(".child-age-check .check .checked").siblings().text();
		console.log(baby_age);
		$(".child-age").attr("data-name",1);
	});
	//孩子的看护情况
	var baby_condition;
	$(".care-check .check").on("click",function(){
		baby_condition='';
		$(this).children(".re-radio").addClass("checked");	
		$(this).siblings().children(".re-radio").removeClass("checked");
		baby_condition = $(".care-check .check .checked").siblings().text();
		console.log(baby_condition);
		$(".care").attr("data-name",1);
	});
	$(".next-step").on("click",function(){
		var a=$(".sex").attr("data-name");
		var b=$(".age").attr("data-name");
		var c=$(".address").attr("data-name");
		var d=$(".culture").attr("data-name");
		var e=$(".work").attr("data-name");
		var f=$(".child-sex").attr("data-name");
		var g=$(".child-age").attr("data-name");
		var h=$(".care").attr("data-name");
		if(a!=1 || b!=1 || c!=1 || d!=1 || e!=1 || f!=1 || g!=1 || h!=1){
			$(".alet").css("opacity",1);
		}else{
			$(".alet").css("opacity",0);
			$.ajax({
				type:"get",
				url:addUrl+"index.php/Home/Course/ajaxGetInfo",
				dataType:"jsonp",
				data:{
					gender:gender,
					age:age,
					address:address,
					edu_level:edu_level,
					profession:profession,
					baby_gender:baby_gender,
					baby_age:baby_age,
					baby_condition:baby_condition
				},
				success:function(data){
					console.log(data);
					console.log(data.code);
					if(data.code==1){
                        window.location.href=addUrl+"index.php/Home/Course/questionnaire.html";
					}
				},
				error:function(){
					alert("出错");
				}
			});
		}
		console.log(gender,age,address,edu_level,profession,baby_gender,baby_age,baby_condition);
	})
})

