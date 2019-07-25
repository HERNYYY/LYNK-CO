$(function(){
    $(".login_btn").click(function(){
        var phone = $(".phone_num").val();
        var upwd = $(".code_text").val();
        // console.log(phone,upwd)
        $.ajax({
            url:"http://localhost:3000/login",
            type:"post",
            data:{phone,upwd},
            dataType:"json",
            success:function(data){
                
                //console.log(uname)
                //console.log(phone)
                
                //$.session.set("phone","phone")
                if(data.code==1){
                    var phone = data.result[0].phone;
                    var uid = data.result[0].id;
                    sessionStorage.phone = phone;
                    sessionStorage.uid = uid;
                    $(".login_suc").css("display","block");
                    var time = $(".sec").html();
                    window.setInterval(
                        function(){
                            if(time==0){
                                window.location.href=document.referrer;
                                //window.location.href = "LK_product_list.html";
                            }else{
                                time = time-1;
                                $(".sec").html(time)
                            }
                        },1000)
                }else{
                    $(".login_err").css("display","block") 
                    window.setTimeout(function(){
                        $(".login_err").css("display","none")
                    },2000)
                    
                }
            }
        })
    })
})