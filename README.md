# node-js-getting-started

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone https://github.com/louzhedong/Webchat.git
$ cd Webchat
$ npm install
$ node .
```

Your app should now be running on [localhost:3000](http://localhost:3000/).


##Mysql配置

Mysql 账号密码为root:root

数据库命令

create database webchat;
create table user(
	username varchar(20) not null primary key,
	password varchar(20) not null,
	nickname varchar(50) not null,
	email varchar(50) not null 
	);


create table firendship(
	own_username varchar(20) not null,
	other_username varchar(20) not null,
	index(own_username),
	foreign key(own_username) references user(username)	
	);


create table message(
	messageid int not null primary key auto_increment,
	sender varchar(20) not null,
	receiver varchar(20) not null,
	send_time datetime not null,
	ifread boolean not null default '0',
	content varchar(255) not null,
	index(sender),
	foreign key(sender) references user(username),
	index(receiver),
	foreign key(receiver) references user(username) 
	);