/**
 * Created by DELL on 2016/6/20.
 */
;
$(function(){

    $('#password1').blur(function (e) {
        var enteruser = $("#username").attr("value");

        $.get('/getusername', function(result) {
            for(var i=result.length-1;i>=0;i--){
                if(enteruser == result[i].username){
                    $("#myusername").html('用户名已存在');
                }else {
                    $("#myusername").html(' ');
                }
            }
        }, 'json');
    });




    $('#password1').keyup(function(e) {
        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
        var enoughRegex = new RegExp("(?=.{6,}).*", "g");
        if (false == enoughRegex.test($(this).val())) {
            $('#passstrength').html('密码过短！');
        } else if (strongRegex.test($(this).val())) {
            $('#passstrength').className = 'ok';
            $('#passstrength').html('密码强!');
        } else if (mediumRegex.test($(this).val())) {
            $('#passstrength').className = 'alert';
            $('#passstrength').html('密码中等!');
        } else {
            $('#passstrength').className = 'error';
            $('#passstrength').html('密码过弱!');
        }
        return true;
    });


    $('#password2').keyup(function(e){
       if($('#password1').val()!=$('#password2').val()){
           $('#doublepass').html('两次密码不一致！');
       }else {
           $('#doublepass').html('');
       }

    });

    $("#email").keyup(function (e) {
        if ($(this).val() == '') {
            $("#checkemail").html("邮箱不能为空");

        }
        else {
            if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($(this).val()) == false) {
                $("#checkemail").html("邮箱格式不正确，请重新填写");

            }
            else {
                $("#checkemail").html('');


            }
        }
    });

});