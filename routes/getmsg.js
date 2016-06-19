var express = require('express');
var router = express.Router();
var dbconn = require('../db/mysql');
/* GET users listing. */

router.get('/', function(req, res, next) {
	var conn = dbconn.connect();
	var query = conn.query('select * from message  where (sender="'+req.query.name1+'" and receiver="'+req.query.name2+'") or (sender="'+req.query.name2+'" and receiver="'+req.query.name1+'") order by send_time desc limit 0,20 ', function(err, result) {
		console.log('err:' + err);
		console.log(result)
		if (!err) {
			res.send(result)
		} else {
			res.send('[]');
		}
	});
	console.log(query.sql);
	conn.end();
});

module.exports = router;