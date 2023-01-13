const express       = require("express");
const app           = express();
const cors          = require("cors");
const dal           = require("./dal.js");
// const session       = require("express-session");
// const MongoStore    = require("connect-mongo");
// const crypto        = require('crypto');

const port          = 3000;

// // used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// /* --- Session Authentication (NOT IN USE) --- */
// //for secretString
// function randomString(length, chars) {
//   if (!chars) {
//     throw new Error('chars is undefined');
//   };
//   const charsLength = chars.length;
//   if (charsLength > 100) {
//     throw new Error('Argument \'chars\' should not have more than 100 characters'
//       + ', otherwise unpredictability will be broken');
//   };

//   const randomBytes = crypto.randomBytes(length);
//   let result = new Array(length);

//   let cursor = 0;
//   for (let i = 0; i < length; i++) {
//     cursor += randomBytes[i];
//     result[i] = chars[cursor % charsLength];
//   };
//   return result.join('');
// };

// // for secret in session
// function secretString(length) {
//   return randomString(length,
//     'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
// };
// const oneDay = 1000 * 60 * 60 * 24;

// // to authenticate sessions on browsers
// app.use(session({
//     secret: secretString(25),
//     saveUninitialized: true,
//     cookie: { maxAge: oneDay },
//     resave: false,
//     store: MongoStore.create({
//         mongoUrl: 'mongodb://localhost:27017',
//         ttl: 14 * 24 * 60 * 60,
//         autoRemove: 'native'
//     })
// }));

// // Terminates session; link to "logout" button... somehow
// // does it need an entry on DAL.JS?
// app.get('/account/logout', (req,res) => {
//     req.session.destroy(err => {
//         if(err){
//             console.log(err);
//         } else {
//             res.send('Session is destroyed')
//         }
//     });
// });

// Home page; if user is logged in, it will display logout link
// NOTE: NOT WORKING
// app.get('/',(req,res) => {
//     session=req.session;
//     console.log(req.session);
//     if(session.userid){
//         res.send("Welcome User <a href=\'/logout'>click to logout</a>");
//     }else {
//         res.send('session is live');
//     }
// });

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
    // checks if the email and password match db
    //myemail and mypassword do not connect to anything, though
    /*
    if(req.body.email == myemail && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.email;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
    */

    dal.login(req.params.email, req.params.password)
        .then((user) => {
            console.log(user + " is logged in");
            res.send({message:"Success",user:user});
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

app.listen(port);
console.log('Running on port ' + port);