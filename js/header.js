$(function(){
    // $.ajax({
    //     url:"header.html",
    //     type:"get",
    //     success:function(html){
    //         $(html).replaceAll("#header");
    //         $(`<link rel="stylesheet" href="css/header.css"/>`).appendTo("head");
    //     }
    // })

    $(document).ready(function(){
    // var uid = sessionStorage.uid;
    // var phone = sessionStorage.phone;
    if(sessionStorage.uid==null){
        console.log(123)
        $("#myState").css("display","inline-block");
        $("#onState").css("display","none")
    }else if(sessionStorage.uid!==null){
        console.log(321)
        $("#myState").css("display","none");
        $("#onState").css("display","inline-block")
    }
    })
    // var exti_btn = $(".exti_btn");
     //console.log($(".exti_btn"))
    $(".exti_btn").click(function(){
        //console.log(123)
        // sessionStorage.uid = null
        // sessionStorage.phone = null
        sessionStorage.clear()
        $("#myState").css("display","inline-block");
        $("#onState").css("display","none")
        window.location.reload()
    })

})