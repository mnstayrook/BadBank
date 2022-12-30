const express   = require("express");
const app       = express();
const cors      = require("cors");
var dal         = require("./dal.js");

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// alldata.js
app.get('/account/all', function (req, res) {
    dal.all().then((docs) => {
        console.log(docs);
        res.send(docs);
    });
});

// createaccount.js
app.get('/account/create/:name/:email/:password', function (req, res) {
    // create user
    dal.create(req.params.name, req.params.email, req.params.password)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

// deposit.js
app.get('/account/deposit/:email/:balance', function (req, res){
    dal.deposit(req.params.email, req.params.balance)
        .then((user) => {
            console.log(user);
            res.send({message:"Success"});
        }).catch((err) => {
            console.log("root index.js " + err.message);
            res.send({message:err.message});
        });
});

// login.js
app.get('/account/login/:email/:password', function (req, res){
    dal.login(req.params.email, req.params.password)
        .then((user) => {
            console.log(user);
            res.send({message:"Success"});
        }).catch((err) => {
            console.log("root index.js " + err.message);
            res.send({message:err.message});
        });
});

// withdraw.js
app.get('/account/withdraw/:email/:balance', function (req, res){
    dal.withdraw(req.params.email, req.params.balance)
        .then((user) => {
            console.log("From root index:" + user);
            res.send({message:"Success"});
            res.send(user);
        }).catch((err) => {
            console.log("root index.js " + err.message);
            res.send({message:err.message});
        });
});

var port = 3000;
app.listen(port);
console.log('Running on port ' + port);