$(function(){
    $.ajax({
        url:"LK_footer.html",
        dateTpye:"get",
        success:function(html){
            $(html).replaceAll("#footer");
            $(`<link rel="stylesheet" href="css/LK_footer.css"/>`)
        }
    })
})