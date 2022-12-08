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

// Retrieve Balance of chosen account


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
function deposit(email, balance){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {email, balance};
        collection.update(doc, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
};

// Login to chosen account
function login(email, password){
    return new Promise((resolve, reject) => {

    })
}

// Withdraw from chosen account




module.exports = {create, deposit, all};
