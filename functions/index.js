const functions = require("firebase-functions");


var admin = require("firebase-admin");

var serviceAccount = require("./account_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const Constants = require('./constants.js');

function authorised(email){
  return Constants.adminEmails.includes(email);
}

exports.cfn_addProduct = functions.https.onCall(addProduct);
async function addProduct(data, context){

  if (!authorised(context.auth.token.email)){
    if (Constants.DEV) console.log(e);
    throw new functions.https.HttpsError('permission-denied', 'Only admin may invoke addProduct function');
      
  }
  try{
    await admin.firestore().collection(Constants.COLLECTION_NAMES.PRODUCTS).add(data);
  }catch (e) {
    if(Constants.DEV) console.log(e);
    throw new functions.https.HttpsError('internal',`add product failed: ${JSON.stringify(e)}`);

  }
}