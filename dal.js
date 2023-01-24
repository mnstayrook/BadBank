const MongoClient = require("mongodb").MongoClient;
// Windows: 'mongodb://127.0.0.1:27017';
// Mac:     'mongodb://localhost:27017';
const url = "mongodb://127.0.0.1:27017";
let db = null;

// Connect to Mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log("DAL: Connected successfully to DB server.");

  // Connect to myproject database
  db = client.db("myproject");
});

// alldata.js
function all() {
  console.log("DAL: in All Data");
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({})
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

function deleteUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.collection("users").deleteOne({ email: email }, function (err, result) {
      err ? reject(err) : resolve(result);
    });
  });
}

// Finds user by email for functions below
function findUserByEmail(email) {
  console.log("DAL: in findUserByEmail");

  return new Promise((resolve, reject) => {
    db.collection("users").findOne({ email: email }, function (err, result) {
      err ? reject(err) : resolve(result);
    });
  });
}

// Finds user by password for functions below
function findUserByPassword(password) {
  console.log("DAL: in findUserByPassword");

  return new Promise((resolve, reject) => {
    db.collection("users").findOne(
      { password: password },
      function (err, result) {
        err ? reject(err) : resolve(result);
      }
    );
  });
}

// createaccount.js
function create(name, email, password) {
  console.log("DAL: in create account");
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = { name, email, password, balance: 0 };
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc);
    });
  });
}

// deposit.js
function deposit(email, depositBalance) {
  console.log("DAL: in deposit");

  return new Promise((resolve, reject) => {
    if (depositBalance <= 0) {
      console.log("Deposit balance is less than 0");
      reject({
        message: "Error: Please enter a value above zero.",
      });
      return;
    } else {
        findUserByEmail(email)
          .then((selectedUser) => {
            console.table(selectedUser);
            let currentBalance = selectedUser.balance;
            console.log("currentBalance = " + currentBalance);
            console.table(currentBalance);

            let newBalance = Number(currentBalance) + Number(depositBalance);
        
            console.log(`new Balance is ${newBalance}`);
            try{
                const collection = db.collection("users");
                collection.updateOne(
                    { email: email },
                    { $set: { balance: Number(newBalance) } }
                );
                selectedUser.balance = newBalance;
                resolve(selectedUser);
                return;
          }catch(e){
            reject({message: "Something went wrong while updating User Balance." + e});
          }})
          .catch((err) => {
            console.log(err);
          });
    }
  });
}

// login.js
function login(email, password) {
  console.log("DAL: in login");

  return new Promise((resolve, reject) => {
    findUserByEmail(email)
      .then((selectedUser) => {
        console.log("DAL: selectedUser.password: " + selectedUser.password);
        console.log("DAL: password: " + password);

        if (selectedUser.password !== password) {
          console.log("Password does not equal user");

          // Shows on Card that invalid password had been entered but email was correct
          reject(Error("Invalid Password"));
          return;
        }
        console.log("DAL: Logged in successfully");
        console.table(selectedUser);
        resolve(selectedUser);
      })
      .catch(() => {
        reject({ message: "User Not Found In Database" });
      });
  });
}

// withdraw.js
function withdraw(email, withdrawBalance) {
  console.log("DAL: in withdraw");

  return new Promise((resolve, reject) => {
    //verify that the balance sent is positive
    if (Number(withdrawBalance) <= 0) {
      console.log("Withdraw balance is less than 0");
      reject({
        message: "Error: Please enter a value above zero.",
      });
      return;
    } else {
      findUserByEmail(email)
        .then((selectedUser) => {
          console.table(selectedUser);
          let currentBalance = selectedUser.balance;
          console.log("DAL: currentBalance = " + currentBalance);
          console.table(currentBalance);

          let newBalance = Number(currentBalance) - Number(withdrawBalance);
          if (newBalance < 0) {
            reject({ message: "User Balance cannot be below 0" });
            return;
          }
          console.log(`new Balance is ${newBalance}`);
            try{
                //update the user
                db.collection("users").updateOne({ email: email }, { $set: { balance: Number(newBalance) } });

                //resolve and return the selected user if collection.updateOne does not fail
                selectedUser.balance = newBalance;
                resolve(
                    selectedUser
                );
                return;
            }catch(e){
                reject({message: "Something went wrong while updating user balance " + e});
            }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}

module.exports = {
  create,
  login,
  withdraw,
  deposit,
  findUserByEmail,
  findUserByPassword,
  all,
  deleteUserByEmail,
};
