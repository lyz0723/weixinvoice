/**
 * Created by Administrator on 2016/10/26 0026.
 */
$(document).ready(function () {
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
    changeClo($(".bgc-color"));
    ////tab切换图标
    //$(".box-btm-a").click(function () {
    //    $(".box-a").addClass("box-aa").removeClass("box-a");
    //    $(".box-b").removeClass("box-b").addClass("box-bb");
    //    $(".box-cc").removeClass("box-cc").addClass("box-c");
    //    $(".div-course-a").show();
    //    $(".div-course-b").hide();
    //    $(".div-course-c").hide();
    //});
    //$(".box-btm-b").click(function () {
    //    $(".box-bb").removeClass("box-bb").addClass("box-b");
    //    $(".box-aa").removeClass("box-aa").addClass("box-a");
    //    $(".box-cc").removeClass("box-cc").addClass("box-c");
    //    $(".div-course-b").show();
    //    $(".div-course-a").hide();
    //    $(".div-course-c").hide();
    //});
    //$(".box-btm-c").click(function () {
    //    $(".box-c").addClass("box-cc").removeClass("box-c");
    //    $(".box-b").removeClass("box-b").addClass("box-bb");
    //    $(".box-aa").removeClass("box-aa").addClass("box-a");
    //    $(".div-course-c").show();
    //    $(".div-course-a").hide();
    //    $(".div-course-b").hide();
    //});
    //改变背景色
    //$(".bgc-color-a:odd").css("backgroundColor","#eaf9ef");
    //$(".bgc-color-b:odd").css("backgroundColor","#fef7e5");
    //$(".bgc-color-b:even").css("backgroundColor","#fff");
    //$(".bgc-color-c:odd").css("backgroundColor","#ecf7ff");
    //$(".bgc-color-d:odd").css("backgroundColor","#fff1ec");
    //var item = $(".bgc-color-a");
    //for(var i=0;i<item.length;i++){
    //    if(i%2==1){
    //        item[i].style.backgroundColor="#eaf9ef";
    //    }
    //}

    var colors = ["#eaf9ef","#fef7e5","#ecf7ff","#fff1ec"]
    var colorindex = 0
    $(".show1 > div").each(function(){
        var _this = $(this)
        var classIndex = 1
        _this.children(".div-color-a-a").children(".main-box-c").children("div").each(function(){
            classIndex ++;
            var _this_div_color_a_a = $(this)
            if(classIndex % 2 != 0){
                _this_div_color_a_a.css({"backgroundColor":colors[colorindex]});
            }
        })
        colorindex ++;
    })

});
