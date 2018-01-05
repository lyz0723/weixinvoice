$(document).ready(function() {
    $('.footer li').on('click',function(){
        $('.footer li span').removeClass('footer-color');
        $('.footer li span:eq('+$(this).index()+')').addClass('footer-color');
        //图片切换
        var arr=['footer1','footer2','footer3','footer4'];
        for(var i=0;i<arr.length;i++){
            $('.footer li img:eq('+i+')').attr('src','images/footer'+(i+1)+'.png');
        }
        $('.footer li img:eq('+$(this).index()+')').attr('src','images/footer'+($(this).index()+1)+''+($(this).index()+1)+'.png');
    });
});
