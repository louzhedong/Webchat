var express = require('express');
var router = express.Router();
var dbconn=require('../db/mysql');
/* GET users listing. */

router.get('/', function(req, res, next) {
    res.render('index',{title:"webchat"});
});


router.route('/login')
    .get(function(req,res){
        res.render('login',{title:'登录'});
    })
    .post(function(req,res) {
        client = dbconn.connect();
        result = null;
        dbconn.loginFun(client,req.body.u, function (result) {
            if(result[0]===undefined){
                res.send('没有该用户');
            }else{
                if(result[0].password===req.body.p){
                    req.session.islogin=req.body.u;
                    res.locals.islogin=req.session.islogin;
                    res.redirect('/home');
                }else
                {
                    res.render('login',{mess:'密码错误，请重试'});
                }
            }
        });
    });

router.get('/logout', function(req, res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});

router.get('/home', function(req, res, next) {
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    res.render('home', { title: '主页', user: res.locals.islogin });
});


router.route('/register')
    .get(function(req,res){
        res.render('register',{title:"注册"});
    })
    .post(function(req,res){
        client = dbconn.connect();
        result = null;
        dbconn.registerFun(client,req.body.username ,req.body.password1,req.body.nickname,req.body.email, function (err) {
            if(err) throw err;
            req.session.islogin=req.body.username;
            res.locals.islogin=req.session.islogin;
            res.redirect('/home');
        });
    });

module.exports = router;