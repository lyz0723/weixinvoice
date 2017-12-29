<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx4ff19b6511cb0168", "ef0cc74d77ceb137e297efecfc0e9908");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta HTTP-EQUIV="pragma" CONTENT="no-cache">
    <meta HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
    <meta HTTP-EQUIV="expires" CONTENT="0">
    <meta name="apple-touch-fullscreen" content="yes" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=no" media="screen" />
    <title>聊天demo</title>
    <style type="text/css">
        body{background:url(images/yuyin_bg.png) no-repeat;background-size:100%;}
        @media all and (min-width: 640px) {
            body,html,.wenwen-footer,.speak_window{width:640px!important;margin:0 auto}
            .speak_window,.wenwen-footer{left:50%!important;margin-left:-320px}
        }
        input,button{outline:none;}
        .wenwen-footer{width:100%;position:fixed;bottom:-5px;left:0;background:#fff;padding:3%;border-top:solid 1px #ddd;box-sizing:border-box;}
        .wenwen_btn,.wenwen_help{width:15%;text-align:center;}
        .wenwen_btn img,.wenwen_help img{height:40px;}
        .wenwen_text{height:40px;border-radius:5px;border:solid 1px #636162;box-sizing:border-box;width:66%;text-align:center;overflow:hidden;margin-left:2%;}
        .circle-button{padding:0 5px;}
        .wenwen_text .circle-button{font-size:14px;color:#666;line-height:38px;}
        .write_box{background:#fff;width:100%;height:40px;line-height:40px;display:none;}
        .write_box input{height:40px;padding:0 5px;line-height:40px;width:100%;box-sizing:border-box;border:0;}
        .wenwen_help button{width:95%;background:#42929d;color:#fff;border-radius:5px;border:0;height:40px;display:none;}
        #wenwen{height:100%;}
        .speak_window{overflow-y:scroll;height:100%;width:100%;position:fixed;top:0;left:0;}
        .speak_box{margin-bottom:70px;padding:10px;}
        .question,.answer{margin-bottom:1rem;}
        .question{text-align:right;}
        .question>div{display:inline-block;}
        .left{float:left;}
        .right{float:right;}
        .clear{clear:both;}
        .heard_img{height:60px;width:60px;border-radius:5px;overflow:hidden;background:#ddd;}
        .heard_img img{width:100%;height:100%}
        .question_text,.answer_text{box-sizing:border-box;position:relative;display:table-cell;min-height:60px;}
        .question_text{padding-right:20px;}
        .answer_text{padding-left:20px;}
        .question_text p,.answer_text p{border-radius:10px;padding:.5rem;margin:0;font-size:14px;line-height:28px;box-sizing:border-box;vertical-align:middle;display:table-cell;height:60px;word-wrap:break-word;}
        .answer_text p{background:#fff;}
        .question_text p{background:#42929d;color:#fff;text-align:left;}
        .question_text i,.answer_text i{width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;position:absolute;top:25px;}
        .answer_text i{border-right:10px solid #fff;left:10px;}
        .question_text i{border-left:10px solid #42929d;right:10px;}
        .answer_text p a{color:#42929d;display:inline-block;}
        audio{display:none;}
        .saying{position:fixed;bottom:30%;left:50%;width:120px;margin-left:-60px;display:none;}
        .saying img{width:100%;}
        .write_list{position:absolute;left:0;width:100%;background:#fff;border-top:solid 1px #ddd;padding:5px;line-height:30px;}
    </style>
</head>
<body>
<div class="speak_window">
    <div class="speak_box">
        <div class="answer">
            <div class="heard_img left"><img src="images/dglvyou.jpg"></div>
            <div class="answer_text">
                <p>Hey，您的专属导游在此！您可以向我提问哦！有时微信会跟我闹点小脾气，试试关闭当前页面重新进入就ok啦!</p>
                <i></i>
            </div>
        </div>
    </div>
</div>
<div class="saying">
    <img src="images/saying.gif"/>
</div>
<div class="wenwen-footer">
    <div class="wenwen_btn left" onClick="to_write()"><img src="images/jp_btn.png"></div>
    <div class="wenwen_text left">
        <div class="write_box">
            <input type="text" class="left" onKeyUp="keyup()" placeholder="请输入关键字" />
        </div>
        <div class="circle-button" id="wenwen">
            按住 说话
        </div>
    </div>
    <div class="wenwen_help right">
        <a href="http://www.dgtour.com.cn/yuyin/index.html">
            <img src="images/help_btn.png">
        </a>
        <button onClick="up_say()" class="right">发送</button>
    </div>
    <div style="opacity:0;" class="clear"></div>
</div>
<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>

<div style="text-align:center;">
</div>

</body>
<script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
  /*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */
  wx.config({
    debug: true,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
      // 所有要调用的 API 都要加到这个列表中
        'onMenuShareTimeline',

        'onMenuShareAppMessage',

        'onMenuShareQQ',

        'onMenuShareWeibo',

        'onMenuShareQZone',

        'startRecord',

        'stopRecord',

        'onVoiceRecordEnd',

        'playVoice',

        'pauseVoice',

        'stopVoice',

        'onVoicePlayEnd',

        'uploadVoice',

        'downloadVoice',

        'translateVoice',

    ]
  });

  wx.ready(function () {
      wx.onMenuShareAppMessage({

          title: '分享标题', // 分享标题

          desc: '分享描述', // 分享描述

          link: 'http://liyanzhao.feisir.com/weixinvoice/sample.php', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

          imgUrl: 'http://liyanzhao.feisir.com/logo.png', // 分享图标

          type: '', // 分享类型,music、video或link，不填默认为link

          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空

          success: function () {
                alert(333)
              // 用户确认分享后执行的回调函数
          },

          cancel: function () {
                alert(222)
              // 用户取消分享后执行的回调函数
          }
      });


          wx.startRecord();


  });
</script>
</html>
