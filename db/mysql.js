/**
 * Created by DELL on 2016/6/6.
 */
var mysql=require('mysql');

function connectServer(){

    var client=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'webchat'
    })

    return client;
}


function loginFun(client,username,callback){
    //client为一个mysql连接对象
    client.query('select password from user where username="'+username+'"',function(err,results,fields){
        if(err){
            throw err;
        }

        callback(results);
    });
}


function registerFun(client , username , password,nickname,email,callback){
    client.query('insert into user value(?,?,?,?)', [username, password,nickname,email], function(err,result){
        if( err ){
            console.log( "error:" + err.message);
            return err;
        }
        callback(err);
    });
}




exports.connect = connectServer;
exports.loginFun = loginFun;
exports.registerFun = registerFun;
