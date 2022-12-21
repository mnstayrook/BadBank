const MongoClient   = require('mongodb').MongoClient;
const url           = 'mongodb://localhost:27017';
let db              = null;

// Connect to Mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to DB server.");

    // Connect to myproject database
    db = client.db('myproject');
});

// All Users
function all(){
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
};

function findUserByEmail(email){
    console.log("in findUserByEmail");
    
    return new Promise((resolve,reject) => {
        db.collection('users')
        .findOne({email:email},function(err,result){
            err ? reject(err) : resolve(result);
        })
    });
}

// Create User Account
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
};

// Deposit money into chosen account
function deposit(email, depositBalance){
    console.log("in deposit");
    return new Promise((resolve, reject) => {
        if (depositBalance <= 0){
            console.log('Deposit balance is less than 0')
            reject({
                message: "Error\: Please enter a value above zero."
            });
            return;
        }else{
            resolve(
                // let currentBalance;
                findUserByEmail(email)
                    .then((selectedUser)=>{console.table(selectedUser); 
                        let currentBalance = selectedUser.balance;
                        console.log("currentBalance = " + currentBalance);
                        console.table(currentBalance);
                        
                        let newBalance = Number(currentBalance) + Number(depositBalance);
                        console.log(`newBalance is ${newBalance}`);
                        const collection = db.collection('users');
                        collection.updateOne({
                            email: email},
                            {$set:{balance:newBalance}
                        });
                    
                    })
                    .catch((err)=>{console.log(err);})
            );
        }
        
    });
};

// Login to chosen account
function login(email, password){
    return new Promise((resolve, reject) => {

    })
}

// Withdraw from chosen account
        // if (balance > currentBalance){
        //     reject(alert("ERROR: Please fill in a number less than your balance."))
        // }





module.exports = {create, balance, deposit, findUserByEmail, all};
