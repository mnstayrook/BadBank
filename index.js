const express       = require("express");
const app           = express();
const cors          = require("cors");
const dal           = require("./dal.js");

// const port          = 3000;

// // used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

app.get('/account/all', function (req, res) {
    dal.all().then((docs) => {
        console.log(docs);
        res.send(docs);
    });
});

app.get('/account/delete/:email', function (req, res) {
    dal.deleteUserByEmail(req.params.email)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log("Root Index: " + err.message);
            res.send({message:err.message});
        });
})

// createaccount.js
app.get('/account/create/:name/:email/:password', function (req, res) {
    // create user
    dal.create(req.params.name, req.params.email, req.params.password)
        .then((user) => {
            console.log(user);
            res.send({user:user, message:"Success"});
        }).catch((err) => {
            console.log("Root Index: " + err.message);
            res.send({message:err.message});
        });
});

// deposit.js
app.get('/account/deposit/:email/:balance', function (req, res){
    dal.deposit(req.params.email, req.params.balance)
        .then((user) => {
            console.log(user);
            res.send({message:"Success", isSuccess:true, user:user});
        }).catch((err) => {
            console.log("Root Index: " + err.message);
            res.send({message:err.message, isSuccess:false});
        });
});

// login.js
app.get('/account/login/:email/:password', function (req, res){
    dal.login(req.params.email, req.params.password)
        .then((user) => {
            console.log("Root Index: " + user + " is logged in");
            
            // Shows success after successful login
            res.send({message:"Success",user:user});
        }).catch((err) => {
            console.log("Root Index:" + err.message);
            res.send({message:err.message, user:{name:"Null"}});
        });
});

// withdraw.js
app.get('/account/withdraw/:email/:balance', function (req, res){
    dal.withdraw(req.params.email, req.params.balance)
        .then((user) => {
            console.log("Root Index: " + user);
            console.table(user);
            res.send({message:"Success",isSuccess:true,user:user});
        }).catch((err) => {
            console.log("Root Index: " + err.message);
            res.send({message:err.message,isSuccess:false});
        });
});

//app.listen(port);
//console.log('Root Index: Running on port ' + port);