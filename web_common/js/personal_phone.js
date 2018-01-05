/**
 * Created by Ideal on 2016/9/28.
 */
$(document).ready(function() {

    /*$(".xiugai1-btn").on("click",function(){
        $(".xiugai1").hide();
        $(".xiugai2").show();
    })*/
    $("#ifmt-form-btn").click(function () {
        if (!$('#ifmt-form-phone').val()||!$('#ifmt-form-phone2').val()) {
            alert('请输入您的手机号');
            return;
        }
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if (!reg.test($('#ifmt-form-phone').val())||!reg.test($('#ifmt-form-phone2').val())) {
            alert("请正确输入手机号码");
            return;
        }
        if (!$('#ifmt-form-code').val()) {
            alert('请您获取验证码');
            return;
        }
        /*$.ajax({
         type: "get",
         url: "{:U('course/isTrueCodeAjax')}",
         data: {tel: $('#ifmt-form-phone').val(),code:$('#ifmt-form-code').val()},
         success: function(data){
         if(data == 1){
         alert('请重新请求');
         }else if(data == 2){
         $('#personalform').submit();
         }else{
         alert('验证码输入有误');
         }
         }
         });*/
    });
    //改变完成按钮颜色
    $(".ifmt-form-input").keyup(function(){
        if ($(".ifmt-form-input").val().length>=6) {
            $(".con-main-button input").css({"background":"#67d0f1"});
            $(".tips").text("提示：修改后，下次将以新手机号为登录帐号")
        }else{
            $(".con-main-button input").css({"background":"#bdbdbd"});
            $(".tips").text("")
        }
    });
    //改变短信验证颜色
    $("#ifmt-form-phone").keyup(function () {
        var _this = $(this);
        var phoneNum = _this.val();
        phoneNum = phoneNum.substring(0,11);
        _this.val(phoneNum);
        if(phoneNum.length==11 && !phoneNum.match(/^1[35678]\d{9}$/)){
            alert("手机格式错误");
        }
        if(phoneNum.length==11 && phoneNum.match(/^1[35678]\d{9}$/)){
            //alert("输入正确");
            //输入正确，按钮可点击
            $(".ifmt-form-code").css({"color":"#b3e8f8"});
            input_msg = 0;
        }
    });


    $('#get_code').click(function () {
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if (!reg.test($('#ifmt-form-phone').val())) {
            alert("请正确输入手机号码");
            return;
        }
        settime();
        /*$.ajax({
         type: "get",
         url: "{:U('course/setCodeAjax')}",
         data: {tel: $('#ifmt-form-phone').val()},
         success: function(data){

         }
         });*/
    });
    //短信验证倒计时
    var countdown=60;
    function settime() {
        $(".ifmt-form-code").addClass("ifmt-form-code-t");
        if (countdown == 0) {
            $(".ifmt-form-code").removeAttr("disabled");
            $(".ifmt-form-code").val("获取验证码");
            countdown = 60;
            $(".ifmt-form-code").removeClass("ifmt-form-code-t");
            return;
        } else {
            countdown--;
            $(".ifmt-form-code").attr("disabled", true);
            $(".ifmt-form-code").val(countdown);
        }
        setTimeout(function() {
                settime() }
            ,1000)
    }
});