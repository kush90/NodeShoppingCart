$(document).ready(function(){

    $('#product_create').on('click',function(){
        $.ajax({
            type: "POST",
            url: "/admin",
            data:$('#product_form').serialize(),
            success:function(data){
                window.location.reload();
            }
        });
        
    });

    $('.product_delete').on('click',function(){
       
        $.ajax({
            type:"DELETE",
            url:"/admin/" + $(this).val(),
            success:function(data){
                if(data){
                    alert(data.msg);
                window.location.reload();
                }

            }
        });
    });

    $('.add_cart').on('click',function(){
        $.ajax({
            type:"GET",
            url:"/?product_name="+$(this).val(),
            success:function(data){
               window.location.reload();
            }
        });
    });

    // $('.form-cart').on('click',function(){
    //     $.ajax({
    //         type:"GET",
    //         url:"/cart",
    //         success:function(data){
    //             if(data){
    //             window.location.href = "http://localhost:3001/";
    //             }
    //         }
    //     });
    // });

});