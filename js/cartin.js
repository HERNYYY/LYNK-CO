$(function(){
    var uid = sessionStorage.uid;
    var phone = sessionStorage.phone;
    $(".cart_in").click(function(){
        console.log(123)
         if(uid){
            window.location.href = "LK_cart.html"
    }else{
         alert("请先登陆")
         }
    })
})