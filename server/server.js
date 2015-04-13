//require
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");

var mongoose = require("mongoose");
mongoose.connect("mongodb://admin:password@ds061651.mongolab.com:61651/users");

var User = require("./usermodel");

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req,res,next) {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    next();
})

app.set('jwt_secret','allhailhermes')

/*
var request = require("request");
var cheerio = require("cheerio");
var auth_Exeter = function(uname, pword) {
    request.post({
        rejectUnauthorized: false,
        url: "https://csserver.exeter.edu/schedule/account.php",
        form: {
            username: uname,
            password: pword
        }
    }, function(err,httpres,body){
        if (err) {
            res.send(err);
        } else {
            $ = cheerio.load(body);
            var auth = $('#status').text()
            return ("You are logged in as ." === auth);
        }
    })
}
*/

app.post('/auth', function(req,res) { //log in
    User.findOne({
        username: req.body.username,
        password: req.body.password
    }, function(err,user){
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (user) {
                res.json({
                    type: true,
                    data: user,
                    token: user.token
                })
            } else {
                res.json({
                    type: false,
                    data: "Incorrect username/password"
                })
            }
        }
    })
})

app.post('/reg', function(req,res) { //sign up
    User.findOne({
        username: req.body.username,
        password: req.body.password
    }, function(err,user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists"
                })
            } else {
                User.findOne({
                    faction: req.body.faction
                }, function (err,user) {
                    if (err) {
                        res.json({
                            type: false,
                            data: "Error occured: " + err
                        })
                    } else {
                        if (user) {
                            res.json({
                                type: false,
                                data: "Faction already exists"
                            })
                        } else {
                            new User({
                                username: req.body.username,
                                password: req.body.password,
                                faction: req.body.faction
                            }).save(function(err,user) {
                                console.log(err)
                                user.token = jwt.sign(user, app.get('jwt_secret'));
                                user.save(function(err,user1) {
                                    res.json({
                                        type: true,
                                        data: user1,
                                        token: user1.token
                                    })
                                })
                            })
                        }
                    }
                })
            }
        }
    })
})

var tokenAuth = function(req,res,next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']
    if (token) {
        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.get('/me', tokenAuth, function(req,res) {
    User.findOne({
        token: req.token
    }, function(err,user){
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: user
            })
        }
    })
})

app.get('/faction', tokenAuth, function(req,res) {
    jwt.verify(req.token,app.get('jwt_secret'), function(err,decoded) {
        User.find({
            faction: decoded.faction
        }, function(err,data) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                })
            } else {
                res.json({
                    type: true,
                    data: data
                })
            }
        })
    });
})

app.use(function (req,res) {
    res.render('404',{url: req.url});
});

app.listen(3000);
