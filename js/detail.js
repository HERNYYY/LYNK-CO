$(function(){

/*动态请求商品详情*/
var pid = location.search.split("=")[1]
//console.log(pid)
if(pid!==undefined){
    $.ajax({
        url:"http://localhost:3000/detail",
        type:"get",
        data:{pid},
        dataType:"json",
        success:function(result){
            //console.log(result)
            var title = result[0].title;
            var price = result[0].price;
            var dp1img = result[0].dp1img;
            var dp2img = result[0].dp2img;
            var dp3img = result[0].dp3img;
            var dp4img = result[0].dp4img;
            //console.log(title)
            //console.log($(".header_title"))
            $(".header_title").html(title)
            $(".p_price").html(price)
            $(".img_M>img").attr("src",`../image/product_detail/${dp1img}-m.jpg`)
            $(".img_L").css("background",`url(../image/product_detail/${dp1img}-l.jpg) no-repeat`)
            var html=`<img src="../image/product_detail/${dp1img}-s.jpg" data-md="../image/product_detail/${dp1img}-m.jpg" data-lg="../image/product_detail/${dp1img}-l.jpg">
            <img src="../image/product_detail/${dp2img}-s.jpg" data-md="../image/product_detail/${dp2img}-m.jpg" data-lg="../image/product_detail/${dp2img}-l.jpg">
            <img src="../image/product_detail/${dp3img}-s.jpg" data-md="../image/product_detail/${dp3img}-m.jpg" data-lg="../image/product_detail/${dp3img}-l.jpg">
            <img src="../image/product_detail/${dp4img}-s.jpg" data-md="../image/product_detail/${dp4img}-m.jpg" data-lg="../image/product_detail/${dp4img}-l.jpg">`
            $(".img_S").html(html)

        }
    })
}


    /* 添加购物车*/ 
    var uid = sessionStorage.uid
    //var count = $(".count").html()
    //console.log(count)
    //console.log(uid)
    var $b = $("body")
    $b.on("click","#addCart",function(){
        //console.log(123)
        if(uid){
            $.ajax({
                url:"http://localhost:3000/addcart",
                type:"get",
                data:{uid,pid,count},
                success:function(result){
                    //console.log(result.code)
                    if(result.code==1){
                        alert("添加成功")
                    }else{
                        alert:("添加失败")
                    }
                }
            })
        }else{
            alert("请先登录")
        }
        
    })





/*放大镜*/
var $imgS = $(".img_S");
var $imgM = $(".img_M>img");
var $imgL = $(".img_L");
var $mmask = $(".mmask");
var $mask = $(".mask");


// 图片切换
$imgS.on("mouseover","img",function(){
    $imgM.attr("src",this.dataset.md);
    $imgL.css("background-image",`url(${this.dataset.lg})`)
})

//遮罩层和大图显示隐藏
$mmask.mouseover(function(){
    $imgL.css("display","block");
    $mask.css("display","block");
})
$mmask.mouseout(function(){
    $imgL.css("display","none");
    $mask.css("display","none");
})

//移动遮罩层
$mmask.mousemove(function(e){
    //console.log(e.pageX,e.pageY)
    if(e.pageX<430){
        e.pageX=430;
    }else if(e.pageX>750){
        e.pageX=750;
    }
    if(e.pageY<170){
        e.pageY=170;
    }else if(e.pageY>490){
        e.pageY=490;
    }
    $mask.css("top",e.pageY-50-120);
    $mask.css("left",e.pageX-50-380);
    $imgL.css("background-position",`${-2*(e.pageX-50-380)}px ${-2*(e.pageY-50-120)}px`)
})



/*动态改变商品数量*/ 
var $btn = $(".count_btn");
//var $count = $(".count");
//var $html = $(".count").html()
// if($html>1){
//     $(".reduce").css("cursor","pointer")
// }else{
//    $(".reduce").css("cursor","not-allowed")
// }
//console.log($btn)
var count = 1;
$(".count").html(count)  
$btn.on("click",".add,.reduce",function(){
    if($(this).hasClass("add")){
        // var sum = $(this).prev().html();
        count++;
        $(this).prev().html(count);
    }else{
        // var sum = $(this).next().html();
        count--;
        if(count<=1){
            count=1;  
        }
        $(this).next().html(count);
    }
    if(count<=1){
        $(".reduce").css("cursor","not-allowed")
    }else{
        $(".reduce").css("cursor","pointer")
    }
})


})