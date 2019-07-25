$(function(){

//加载购物车
var uid = sessionStorage.uid;

$(document).ready(function(){
    $.ajax({
        url:"http://localhost:3000/cart",
        type:"get",
        dataType:"json",
        data:{uid},
        success:function(result){
            console.log(result.data)
            //console.log(result.data.pid)
            var html = ""
            for(var c of result.data){
                //console.log(c)
                var sum = c.price*c.count
                html += `<tr><td class="cart_check">
                <input type="checkbox" class="item_btn">
                <a href="javascript:;">
                    <img src="../image/product_list/${c.pimg}.jpg">
                </a>
            </td>
            <td id="item_title">
                <h3>${c.title}
                </h3>
                <img src="../image/cart/2.png">
                <img src="../image/cart/3.png">
                <img src="../image/cart/4.png">
            </td>
            <td class="tc" id="item_price">
                <h3 class="price">${c.price}</h3>
            </td>
            <td class="tc" id="item_count">
                <a href="javascript:;" class="reduce">-</a>
                <span class="count">${c.count}</span>
                <a href="javascript:;" class="add">+</a>
            </td>
            <td class="tc" id="item_sum">
                <h3 class="sum">${sum}</h3>
            </td>
            <td class="tc" id="item_del">
                <a href="javascript:;" class="remove" data-del="${c.pid}">×</a>
            </td><tr>`
            }
            $("#item_body").html(html)
        }
    })
})






    
var $tb = $("tbody");
//+ - 按钮
$tb.on("click",".reduce,.add",function(){
    if($(this).hasClass("add")){
        var sum = $(this).prev().html();
        sum++;
        $(this).prev().html(sum);
    }else{
        var sum = $(this).next().html();
        sum--;
        if(sum<=1){sum=1}
        $(this).next().html(sum);
    }
//小计
var count = $(this).parent().children(".count").html();
var price = $(this).parent().siblings("#item_price").children(".price").html();
//console.log($price)
var sumPrice = (count*price).toFixed(2);
//console.log(sumPrice)
$(this).parent().siblings("#item_sum").children(".sum").html(sumPrice);
loadCart();

    var a = $(this).parent().siblings("#item_del").children(".remove")
    var pid = a.attr("data-del")
    //console.log(pid)
    $.ajax({
        url:"http://localhost:3000/setcart",
        type:"get",
        data:{pid,count},
        success:function(result){
            if(result.code==1){
                console.log("ok")
            }else{
                console.log("err")
            }
        }
    })
})


//全选
var $allBtn = $(".all_btn");
var $itemBtn = $(".item_btn");
//console.log($allBtn)
//console.log($itemBtn)
$allBtn.click(function(){
    $itemBtn.prop("checked",this.checked);
    loadCart()
})

//单选
$tb.on("click",".item_btn",function(){
    loadCart()
})



//删除

$tb.on("click",".remove",function(){
    var $tr = $(this).parent().parent();
    var pid = $(this).attr("data-del")
    console.log(pid)
    // console.log($tr)
    if(confirm("是否删除?")){
        $.ajax({
            url:"http://localhost:3000/delcart",
            type:"get",
            data:{pid},
            success:function(result){
                if(result.code==1){
                    alert("删除成功")
                    window.location.reload()
                }else{
                    alert("删除失败")
                }
            }

        })
    }
    loadCart()
})





//定义loadCart
function loadCart(){
    var isChecked = true;
    $itemBtn.each((i,input)=>{
        if(!input.checked){
            isChecked = false;
        }
    })
    $allBtn.prop("checked",isChecked);
    
    // var count = $(".count");
    // console.log(count)
    // var n = 0
    // for(var i=0;i<count.length;i++){
    //     var num = $(count[i]).html();
    //     //console.log(num)
    // }
    // var $count = $(".count")
    // console.log($count)
    // var n = 0;
    // for(var i=0;i<$count.length;i++){
    //     var c = parseInt($(".count").html());
    //     n += c
    // }
    // console.log(n)


    var $checked = $(".item_btn:checked");
    //console.log($checked)
    var totalPrice = 0;
    var totalCount = 0;
    for(var i=0;i<$checked.length;i++){
        var price = parseInt($($checked[i]).parent().siblings("#item_sum").children(".sum").html());
        var count = parseInt($($checked[i]).parent().siblings("#item_count").children(".count").html());
        totalPrice += (price*count);
        totalCount += parseInt(count);
        //console.log(totalCount)
        //console.log(totalPrice)
    }
     $(".total").html(totalPrice.toFixed(2));
     $(".check_count").html(totalCount);
    
}

})