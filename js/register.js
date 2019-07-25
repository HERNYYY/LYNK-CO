$(function(){
    // 正则验证
    var $username = $(".username");
    var $codeText = $(".code_text");
    var $form = $(".reg_input");
    var nameState = false;
    var phoneState = false;
    $form.on("focus",".username,.code_text",function(){
        //console.log(123)
        var span = $(this).next();
        span.css("display","inline-block")
    })

    $username.blur(function(){
        var reg = /^[-_a-zA-Z0-9]{4,16}$/;
        var val = $(this).val();
        var span = $(this).next();
        if(reg.test(val)==true){
            span.removeClass("vali_fail");
            span.addClass("vali_success");
            nameState = true;
        }else{
            span.removeClass("vali_success");
            span.addClass("vali_fail")
        }
        checktext()
        //vail.call(this,reg);
    })
    $codeText.blur(function(){
        var reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        //vail.call(this,reg);
        var val = $(this).val();
        var span = $(this).next();
        if(reg.test(val)==true){
            span.removeClass("vali_fail");
            span.addClass("vali_success");
            phoneState = true;
        }else{
            span.removeClass("vali_success");
            span.addClass("vali_fail")
        }
        checktext()
    })

    function checktext(){
    if(nameState&&phoneState){
        $(".login_btn").attr("disabled",false);
        $(".login_btn").css("cursor","pointer")
    }else{
        $(".login_btn").attr("disabled",true);
    }
    }
    // function vail(reg){
    //     var val = $(this).val();
    //     var span = $(this).next();
    //     if(reg.test(val)==true){
    //         span.removeClass("vali_fail");
    //         span.addClass("vali_success");
    //         nameState = true;
    //     }else{
    //         span.removeClass("vali_success");
    //         span.addClass("vali_fail")
    //     }
    // }




    // 注册
    $(".login_btn").click(function(){
        var uname = $(".username").val();
        var phone = $(".code_text").val();
        var upwd = $(".upwd").val();
        //console.log(uname,phone,upwd)
        $.ajax({
            url:"http://localhost:3000/register",
            type:"post",
            data:{uname,phone,upwd},
            dataType:"json",
            success:function(result){
                if(result.code==1){
                    $(".reg_suc").css("display","block");
                    var time = $(".sec").html();
                    window.setInterval(
                        function(){
                            if(time==0){
                                window.location.href = "LK_login.html";
                            }else{
                                time = time-1;
                                $(".sec").html(time)
                            }
                        },1000)
                }else if(result.code==0){
                    alert("注册失败:用户名或手机号已存在")
                }
            }
        })
    })
})