/**
 * Created by DELL on 2016/6/15.
 */

var express = require('express');
var router = express.Router();
var dbconn = require('../db/mysql');
/* GET users listing. */

router.get('/', function(req, res, next) {
    var conn = dbconn.connect();
    var query = conn.query('select other_username from firendship where own_username ="' + req.query.name + '"  order by other_username', function(err, result) {
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