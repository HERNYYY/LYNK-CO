$(function(){
   //$(window).ready(function(){
     loadList();  
    var phone = sessionStorage.phone;
    
    //console.log(123)
    if(phone){
        // console.log(result)
        //console.log($("#myState"))
        $("#myState").css("display","none");
        $("#onState").css("display","inline-block")
    }
    //})
    
    function loadList(){
        var page = 0;
        $.ajax({
            url:"http://localhost:3000/list",
            type:"get",
            data:{page},
            dataType:"json",
            success:function(result){
                //console.log(result)
                var html="";
                for(var p of result){
                    //console.log(p)
                    html += `<div class="p_list_one">
                    <div>
                        <a href="LK_product_detail.html?pid=${p.pid}">
                            <img src="../image/product_list/${p.pimg}.jpg">
                        </a>
                    </div>
                    <div class="p_text">
                        <h4 class="p_title">${p.title}</h4>
                        <p class="p_price">￥ ${p.price.toFixed(2)} <span><img src="../image/product_list/coMoney.png"></span></p>
                    </div>
                </div>`
                }
                $(".list_floor").append(html)
            }
        })
    }

    var page = 1;
    // var html = "";
    $(".loadMore").click(function(){
        page += 1; 
        $.ajax({
            url:"http://localhost:3000/list",
            type:"get",
            data:{page},
            dataType:"json",
            success:function(result){
                console.log(result.length)
                if(result.length<12){
                    $(".loadMore").hide()
                    $(".loadMore_text").css("display","block");
                }
                var html="";
                for(var p of result){
                    //console.log(p)
                    html += `<div class="p_list_one">
                    <div>
                        <a href="LK_product_detail.html?pid=${p.pid}">
                            <img src="../image/product_list/${p.pimg}.jpg">
                        </a>
                    </div>
                    <div class="p_text">
                        <h4 class="p_title">${p.title}</h4>
                        <p class="p_price">￥ ${p.price.toFixed(2)} <span><img src="../image/product_list/coMoney.png"></span></p>
                    </div>
                </div>`
                }
                $(".list_floor").append(html)
            }
        })
    })
})


