const functions = require("firebase-functions");


var admin = require("firebase-admin");

var serviceAccount = require("./account_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const Constants = require('./constants.js');
