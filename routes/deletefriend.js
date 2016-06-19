/**
 * Created by DELL on 2016/6/17.
 */

var express = require('express');
var router = express.Router();
var dbconn = require('../db/mysql');
/* GET users listing. */

router.get('/', function(req, res, next) {
    var conn = dbconn.connect();
    var query1 = conn.query('delete from firendship where own_username = "'+req.query.user1+'" and other_username ="'+req.query.user2+'" ', function(err, result) {
        console.log(err);
        console.log(result)
    })
    var query2 = conn.query('delete from firendship where own_username = "'+req.query.user2+'" and other_username ="'+req.query.user1+'" ', function(err, result) {
        console.log(err);
        console.log(result)
    })

    console.log(query1.sql);
    console.log(query2.sql);
    conn.end();
});

module.exports = router;