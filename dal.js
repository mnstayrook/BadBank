const MongoClient   = require('mongodb').MongoClient;
// Windows: 'mongodb://127.0.0.1:27017';
// Mac:     'mongodb://localhost:27017';
const url           = 'mongodb://127.0.0.1:27017';
let db              = null;

// Connect to Mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("DAL: Connected successfully to DB server.");

    // Connect to myproject database
    db = client.db('myproject');
});

// alldata.js
function all(){
    console.log("DAL: in All Data");
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
};

// Finds user by email for functions below
function findUserByEmail(email){
    console.log("DAL: in findUserByEmail");
    
    return new Promise((resolve,reject) => {
        db.collection('users')
        .findOne({email:email},function(err,result){
            err ? reject(err) : resolve(result);
        });
    });
};

// Finds user by password for functions below
function findUserByPassword(password){
    console.log('DAL: in findUserByPassword');

    return new Promise((resolve, reject) => {
        db.collection('users')
            .findOne({password:password}, function(err, result){
                err ? reject(err) : resolve(result);
            });
    });
};

// createaccount.js
function create(name, email, password){
    console.log("DAL: in create account");
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
};

// deposit.js
function deposit(email, depositBalance){
    console.log("DAL: in deposit");

    return new Promise((resolve, reject) => {
        if (depositBalance <= 0){
            console.log('Deposit balance is less than 0')
            reject({
                message: "Error\: Please enter a value above zero."
            });
            return;
        }else{
            resolve(
                findUserByEmail(email)
                    .then((selectedUser)=>{console.table(selectedUser); 
                        let currentBalance = selectedUser.balance;
                        console.log("currentBalance = " + currentBalance);
                        console.table(currentBalance);
                        
                        let newBalance = Number(currentBalance) + Number(depositBalance);
                        console.log(`newBalance is ${newBalance}`);
                        const collection = db.collection('users');
                        collection.updateOne(
                            {email: email},
                            {$set:{balance: newBalance}}
                        );
                    
                    })
                    .catch((err)=>{console.log(err);})
            );
        }
        
    });
};

// login.js
function login(email, password){
    console.log('DAL: in login');
    
    return new Promise ((resolve, reject) => {
        findUserByEmail(email).then((selectedUser)=>{
                console.log("DAL: selectedUser.password: " + selectedUser.password);
                console.log("DAL: password: " + password);

                let user = db.collection('users').user;
                
                if (selectedUser !== user){
                    console.log("DAL: Error: user does not exist.")
                    reject({
                        message: "DAL: Error\: Email or password was incorrect. Try again."
                    });
                    return;
                }

            if (selectedUser.password !== password){
                reject(Error("DAL: Invalid Password"));
            }
            console.log("DAL: Logged in successfully");
            resolve(selectedUser);
        });

        //console.table(user);
        // return new Promise((resolve, reject) => {


        //     if (/* user does not exist */){
        //         // error message to create an account;
        //         return;
        //     }else{
        //         resolve(
        //             // find the user by email to confirm;
        //             findUserByEmail(email)
        //                 // .then login with data from user
        //                 // show account details and put name in upper corner
        //                 // must sustain across all pages
        //                 .then((selectedUser)=>{console.table(selectedUser); 

        //                 })
        //                 .catch((err)=>{console.log(err);})
        //         );
        //     }
            
        // });
        
};

// withdraw.js
function withdraw(email, withdrawBalance){
    console.log("DAL: in withdraw");

    return new Promise((resolve, reject) => {
        if (withdrawBalance <= 0){
            console.log('DAL: Withdraw balance is less than 0')
            reject({
                message: "DAL: Error\: Please enter a value above zero."
            });
            return;
        }else{
            resolve(
                findUserByEmail(email) // && findUserByPassword(password)
                    .then((selectedUser)=>{console.table(selectedUser); 
                        let currentBalance = selectedUser.balance;
                        console.log("DAL: currentBalance = " + currentBalance);
                        console.table(currentBalance);
                        
                        let newBalance = Number(currentBalance) - Number(withdrawBalance);
                        console.log(`DAL: newBalance is ${newBalance}`);
                        db.collection('users').updateOne(
                            {email:email},
                            {$set:{balance: newBalance}}
                        );
                    })
                    .catch((err)=>{console.log(err);})
            );        
        };
    });
};

module.exports = {create, login, withdraw, deposit, findUserByEmail, findUserByPassword, all};
