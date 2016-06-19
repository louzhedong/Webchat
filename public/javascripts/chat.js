;
$(function() {
    var user = "";
    var socket = null;

    //建立socket连接
    user =$("#currentuser").text();
    socket = io();
    socket.emit('user join', {
        user: user
    });
    socket.on('chat message', function(data) {
        formatMsg(data);
    });


    //私聊
    // console.log('to'+user)
    socket.on('to' + user, function(data) {
        //console.log(data);
        formatMsg(data);
    })

    $.get('/getuser', {
            name: user
        }, function(result) {
            var html = '';
            for (var i = result.length - 1; i >= 0; i--) {
                var data = result[i];
                html += '<li class="'+data.other_username+'">' + data.other_username + '</li>'
            }
            $("#userlist").html(html);
            $("#userlist").scrollTop(99999);
        }, 'json');

    $('#users').on('click', 'li', function() {
        var v = $(this).html();
        if ($('#sel_obj option[value="' + v + '"]').size()) {
            $('#sel_obj').val(v)
        } else {
            $('#sel_obj').append('<option value="' + v + '">' + v + '</option>');
            $('#sel_obj').val(v);
        }
        $("#messages").empty();

        $.get('/getmsg', {
            name1: user,
            name2: v
        }, function(result) {
            var html = '';
            for (var i = result.length - 1; i >= 0; i--) {
                var data = result[i];
                var cls = '';
                if (data.sender == user) {
                    cls = ' mine ';
                }
                html += '<li class="msg ' + cls + '"><p><b>' + data.sender + '</b>：<span>(' + data.send_time + ')</span></p><div>' + data.content + '</div></li>';
            }
            $('#messages').prepend(html);
            $('#messages').scrollTop(99999);
        }, 'json');
    });
    $('form').submit(function() {

        if ($("#m").val().length == 0) {
            alert('内容不能为空!');
            return false;
        }
        socket.emit('chat message', {
            msg: $('#m').val(),
            user: user,
            to: $('#sel_obj').val()
        });
        $('#m').val('');
        return false;
    });

    function formatMsg(data) {
        if (data.type === 0) {
        } else {
            var cls = '',
                type = "";
            if (data.user == user) {
                cls += ' mine ';
            }
            if (data.type === 2) {
                cls += " private ";
                type = "（悄悄话）"
            }
            $('#messages').append($('<li class="msg ' + cls + '"><p><b>' + data.user + '</b>：<span>(' + formatTime(data.time) + ')</span></p><div>' + data.msg + '</div></li>'))
        };
        $('#messages').scrollTop(99999);
    }

    function formatTime(time) {
        var d = new Date(parseInt(time));
        var str = "";
        str += d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        return str;
    }



    //添加好友
    $("#addfriend").click(function(){
        friendid = $.trim($("#friendid").val());
        if(friendid.length == 0){
            alert("好友ID不能为空！");
            $("#friendid").focus();
            return false;
        }

        $("#userlist").append($('<li class="'+friendid+'">' + friendid + '</li>'));
        $.get('/addfriend', {
            user1: user,
            user2: friendid
        }, function(result) {

        });
    })

    //删除好友
    $("#deletefriend").click(function(){
        friendid = $.trim($("#friendid").val());
        if(friendid.length == 0){
            alert("请输入要删除的好友！");
            $("#friendid").focus();
            return false;
        }

        $.get('/deletefriend',{
            user1:user,
            user2:friendid
        },function(result){

        });

        $("#userlist").empty();
        $.get('/getuser', {
            name: user
        }, function(result) {
            var html = '';
            for (var i = result.length - 1; i >= 0; i--) {
                var data = result[i];
                html += '<li class="'+data.other_username+'">' + data.other_username + '</li>'
            }
            $("#userlist").html(html);
            $("#userlist").scrollTop(99999);
        }, 'json');
    })

});