// start of using mongoose.
// not working as of now.

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    balance: { type: Number },
    token: { type: String },
});

// uncomment to export this feature
// module.exports = mongoose.model("user", userSchema);

// For root index.js:
/* 
https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
*/
