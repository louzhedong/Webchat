var db = require('../db/mysql');
var sio = require('socket.io');
var IO = function(server) {
	var io = sio.listen(server)
	var usocket = {};
	var xss = require('xss');
	var interval = null;



	io.on('connection', function(socket) {
		console.log('a user connected.');
		var username = "";
		socket.on('chat message', function(data) {
			var msg = data.msg
			data.user = xss(username || data.user);

			data.msg = xss(msg);
			data.time = +new Date();
			console.log(data)
			if (!data.to) {
				console.log('public')
			} else {
				data.type = 2; //点对点对话
				console.log("one")
				sendUserMsg(data);
                insertData(data);
			}

		});
		socket.on('user join', function(data) {
			username = xss(data.user);

			usocket[username] = socket;
			console.log('join:' + data.user);
		});
		socket.on('disconnect', function() {
			console.log('disconnect')
			if (username) {

				delete usocket[username];

			}
		});


	});

	function homeLeave(uname) {
		if (home.name && home.name == uname) {
			home = {};
			io.emit('home leave', uname);
		}
	}
    function formatTime(time) {
        var d = new Date(parseInt(time));
        var str = "";
        str += d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        return str;
    }
	//插入数据库
	function insertData(data) {
		var conn = db.connect();
		var post = {
			sender: data.user,
            receiver:data.to,
			send_time: formatTime(data.time),
			ifread:0,
            content: data.msg,
		};
		var query = conn.query('insert into message set ?', post, function(err, result) {
			console.log(err);
			console.log(result)
		})
		console.log(query.sql);
		conn.end();
	}



	function sendUserMsg(data) {
		if (data.to in usocket) {
			console.log('================')
			console.log('to' + data.to, data);
			usocket[data.to].emit('to' + data.to, data);
			usocket[data.user].emit('to' + data.user, data);
			console.log('================')
		}
        else{
            usocket[data.user].emit('to' + data.user, data);
        }
	}

}
module.exports = IO;