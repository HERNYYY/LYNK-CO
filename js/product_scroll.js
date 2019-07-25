/* 一键置顶 */ 
var $topBtn = $(".right_btn_top");
var $nav = $(".detail_nav_none");
//console.log($nav)
//console.log($topBtn)
$(window).scroll(()=>{
    var toTop = $(window).scrollTop();
    if(toTop>200){
        $topBtn.css("display","block");
    }else{
        $topBtn.css("display","none");
    }
    if(toTop>700){
        $nav.show()
    }else{
        $nav.hide()
    }
})

$topBtn.on("click",".toTop",function(){
    $("html").stop(true).animate({scrollTop:0},1000)
})

/* 菜单栏切换 */
$(window).scroll(()=>{
    var toTop = $(window).scrollTop();//获取滑动高度
    if(toTop<=4174){//如果 高度
        $(".scroll1>a").addClass("active");
        $(".scroll2>a").removeClass("active");
        $(".scroll3>a").removeClass("active");
    }else if(toTop<=4750){// 如果高度 小于等于4750
        $(".scroll2>a").addClass("active");//添加class
        $(".scroll1>a").removeClass("active");//移除
        $(".scroll3>a").removeClass("active");
    }else{
        $(".scroll3>a").addClass("active");
        $(".scroll1>a").removeClass("active");
        $(".scroll2>a").removeClass("active");
    }
})

var $a = $(".nav_ul>li>a");
//console.log($li)
$(document).ready(function(){
    $a.each(function(index){
        $(this).click(function(){
            $(this).parent().siblings().children().removeClass("active");
            $(this).addClass("active");
        })
    })    
})

$(".scroll1").click(function(){//点击
    $("html").stop(true).animate({scrollTop:700-176},1000);//动画 624高度
    
})
$(".scroll2").click(function(){
    $("html").stop(true).animate({scrollTop:4350},1000);
    
})
$(".scroll3").click(function(){
    $("html").stop(true).animate({scrollTop:4950-176},1000);
    
})

