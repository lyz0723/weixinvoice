<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx4ff19b6511cb0168", "ef0cc74d77ceb137e297efecfc0e9908");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>教师端直播间</title>
    <link rel="stylesheet" type="text/css" href="web_common/css/rem.css"/>
    <link rel="stylesheet" type="text/css" href="web_common/css/wap-common.css"/>
    <link rel="stylesheet" type="text/css" href="web_common/css/teacher-room.css"/>
    <script src="web_common/js/jquery-1.11.3.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="web_common/js/rem.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
<input type="hidden" class="addressUrl" value="http://liyanzhao.feisir.com/weixinvoice/"/>
<div class="page">
    <!--正在加载-->
    <span class="alert_loading">正在加载</span>
    <!--没有更多了-->
    <span class="alert_nomore">没有更多了</span>
    <!--顶部使用说明和讨论-->
    <div class="head">
        <div class="instructions">使用说明</div>
        <div class="head_right">
            <div class="icons">
                <ul class="all_tb">
                    <li class="jt" data-type ="r"></li>
                    <li class="peo_pic"></li>
                    <li class="peo_num"></li>
                    <li class="line"></li>
                    <li class="wri_pic"></li>
                </ul>
            </div>
            <div class="discuss_room">讨论</div>
        </div>
    </div>
    <div class="middle">
        本直播于2016-08-20 13:30 开始
    </div>
    <!--中间显示区域-->
    <div class="voice_show">

    </div>
    <div class="bottom_box">
        <!--底部语音和文字按钮-->
        <div class="voice_word">
            <div class="sounds" data-name="0">
                <img src="web_common/jzb2/images/voice.png"/>
                语音
            </div>
            <div class="character">
                <img src="web_common/jzb2/images/word.png"/>
                文字</div>
        </div>
        <!--录音框-->
        <div class="tape_box">
            <span class="djly">点击一下录音</span>
            <div class="big_cir">
                <div class="small_cir"></div>
            </div>
        </div>
    </div>
    <!--点击录音之后正在录音的弹出框-->
    <div class="recording_box">
        <div class="reminder_word">录满60s将自动发送，并启动下一条录音</div>
        <span class="record_time">0s/60s</span>
        <div class="send_cir" data-name="0">
            <span class="w_line"></span>
            <span class="w_line"></span>
        </div>
        <span class="record_cc">取消</span>
    </div>
    <!--点击取消之后的弹窗和浮层-->
    <div class="cc_float">
        <div class="alert_box">
            <div class="box_top">取消当条声音录制？</div>
            <div class="box_btm">
                <div class="alert_can">取消</div>
                <div class="alert_true">确定</div>
            </div>
        </div>
    </div>
    <!--弹幕输入框-->
    <div class="text_box">
        <div class="write_text">
            <span class="please">请提问：</span>
            <textarea name="" rows="" cols="" class="write" id="write"></textarea>
            <span class="cancel">取消</span>
            <span class="send">发送</span>
        </div>
        <div class="write_float"></div>
    </div>
    <!--文字输入框-->
    <div class="text_box_word">
        <div class="write_text_word">
            <textarea name="" rows="" cols="" class="write_word" id="write_word"></textarea>
            <span class="cancel_word">取消</span>
            <span class="send_word">发送</span>
        </div>
        <div class="write_float_word"></div>
    </div>
    <!--弹幕区-->
    <div class="bullet_screen">
        <ul class="scr_mes">
            <li class="mes_con"></li>
            <li class="sanj"></li>
            <li class="scr_pic"></li>
        </ul>
    </div>
    <!--使用说明-->
    <div class="use_ins">
        <img src="web_common/jzb2/images/teacher_shm.png"/>
    </div>
    <!--上墙回复弹框-->
    <div class="up_wall_float">
        <div class="upwall_alert">
            <textarea name="" rows="" class="replay_upwall" style="background: #f0eff4;" placeholder="点击发送后，内容会同步到直播主屏。回复内容可为空"></textarea>
            <div class="upwall_btm">
                <div class="upwall_cancel">取消</div>
                <div class="upwall_true">确认</div>
            </div>
        </div>
    </div>
    <!--最右侧底部按钮-->
    <div class="right_fixed">
        <img src="web_common/jzb2/images/close.png" class="close"/>
        <img src="web_common/jzb2/images/refresh.png" class="refresh"/>
        <img src="web_common/jzb2/images/more.png" class="more"/>
    </div>
    <!--关闭直播间弹窗-->
    <div class="close_float">
        <div class="alert_box">
            <div class="box_top">是否确认结束本次直播？</div>
            <div class="box_btm">
                <div class="close_can">取消</div>
                <div class="close_true">确定</div>
            </div>
        </div>
    </div>
    <!--禁言弹出框-->
    <div class="forbid_float">
        <div class="forbid_alert">
            <div class="forbid_reminder">
                <p class="w1">禁言后，此用户在直播间不能发表任何评论，同时会删除此评论</p>
                <p class="w2">确定禁言？</p>
            </div>
            <div class="box_forbid">
                <div class="forbid_can">取消</div>
                <div class="forbid_true">确定</div>
            </div>
        </div>
    </div>
    <!--撤销弹出框-->
    <div class="recall_float">
        <div class="recall_box">
            <div class="recall_top">确定撤销此条消息？</div>
            <div class="recall_btm">
                <div class="recall_can">取消</div>
                <div class="recall_true">确认</div>
            </div>
        </div>
    </div>
    <!--直播介绍-->
    <div class="introduce">
        <div class="intr_box">
            <div class="intr_box_top">
                <div class="teacher_pic"></div>
                <div class="teacher_info">
                    <p class="t_name">赤耳朵</p>
                    <p class="t_teach">讲师</p>
                </div>
            </div>
            <div class="intr_box_btm">
                <img src="web_common/jzb2/images/intro.png"/>
                <p>直播介绍</p>
            </div>
        </div>
    </div>
    <!--问题展示区-->
    <div class="discuss_box">
        <div class="opc"></div>
        <div class="return_room">回到直播</div>
        <div class="dis_area">
            <span class="no_question">没有留言或提问</span>
            <div class="dis_show">
                <div class="nomore">没有更多</div>
            </div>
        </div>
        <div class="dis_btm">
            <div class="dis_pj">
                <img src="web_common/jzb2/images/pencil2.png" class="pencil"/>
                来说点什么吧...
            </div>
        </div>
    </div>
</div>
<div data-nick-name= "{$signPackage.nick_name}" data-head-img-url = "{$signPackage.head_img_url}" data-status = "{$signPackage.lesson_status}"
     class="pic-nick-name" style=""></div>
</body>
</html>
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
    $(function(){
        //直播结束
        var lesson_status=$(".pic-nick-name").attr("data-status");
        // alert(lesson_status)
        if(lesson_status==3){
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
            $(".middle").html("本直播已结束");
        }else if(lesson_status==1){
            $(".middle").html("课程正在直播");
        }else if(lesson_status==0){
            $(".middle").html("课程还未开始");
        }

        //微信配置
        wx.config({
            //debug:true,
            appId: '<?php echo $signPackage["appId"];?>',
            timestamp: <?php echo $signPackage["timestamp"];?>,
            nonceStr: '<?php echo $signPackage["nonceStr"];?>',
            signature: '<?php echo $signPackage["signature"];?>',
            jsApiList: [
                'startRecord',      //开始录音
                'stopRecord',       //停止录音
                'playVoice',        //播放语音
                'pauseVoice',       //暂停播放
                'stopVoice',        //停止播放
                'chooseImage',
                'downloadVoice',
                'onVoiceRecordEnd',
                'uploadVoice'       //上传语音
            ]
        });
        wx.ready(function () {
            // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
            wx.checkJsApi({
                jsApiList:[
                    'startRecord',      //开始录音
                    'stopRecord',       //停止录音
                    'playVoice',        //播放语音
                    'pauseVoice',       //暂停播放
                    'stopVoice',        //停止播放
                    'uploadVoice',       //上传语音
                    'onVoiceRecordEnd',
                    'downloadVoice'
                ]
            });
            wx.onVoiceRecordEnd({
                // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                complete: function (res) {
                    wx.startRecord();
                    var localId = res.localId;
                    upLoadVoice(localId,60);
                }
            });
        })
    })
</script>
<script src="web_common/js/teacher-room.js"></script>
<script>
    var urlval = "web_common/";
</script>
