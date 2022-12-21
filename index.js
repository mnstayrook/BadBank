const express   = require("express");
const app       = express();
const cors      = require("cors");
var dal         = require("./dal.js");

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// read all accounts
app.get('/account/all', function (req, res) {
    dal.all().then((docs) => {
        console.log(docs);
        res.send(docs);
    });
});

// retrieve balance

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    // else create user
    dal.create(req.params.name, req.params.email, req.params.password)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

// deposit monies
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

// login to account
app.get('/account/login/:email/:password', function (req, res){
    dal.login(req.params.email, req.params.password)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

// withdraw monies


var port = 4000;
app.listen(port);
console.log('Running on port ' + port);