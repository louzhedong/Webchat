/**
 * Created by DELL on 2016/6/17.
 */

var express = require('express');
var router = express.Router();
var dbconn = require('../db/mysql');
/* GET users listing. */

router.get('/', function(req, res, next) {
    var conn = dbconn.connect();
    var query1 = conn.query('insert into firendship values("'+req.query.user1+'","'+req.query.user2+'")', function(err, result) {
        console.log(err);
        console.log(result)
    })
    var query1 = conn.query('insert into firendship values("'+req.query.user2+'","'+req.query.user1+'")', function(err, result) {
        console.log(err);
        console.log(result)
    })

    console.log(query1.sql);

    conn.end();
});

module.exports = router;