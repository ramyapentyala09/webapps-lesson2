const functions = require("firebase-functions");


var admin = require("firebase-admin");

var serviceAccount = require("./account_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const Constants = require('./constants.js');

function authorised(email) {
  return Constants.adminEmails.includes(email);
}

exports.cfn_addProduct = functions.https.onCall(addProduct);
async function addProduct(data, context) {

  if (!authorised(context.auth.token.email)) {
    if (Constants.DEV) console.log(e);
    throw new functions.https.HttpsError('permission-denied', 'Only admin may invoke addProduct function');

  }
  try {
    const ref = await admin.firestore().collection(Constants.COLLECTION_NAMES.PRODUCTS).add(data);
    return ref.id; // doc id
  } catch (e) {
    if (Constants.DEV) console.log(e);
    throw new functions.https.HttpsError('internal', `add product failed: ${JSON.stringify(e)}`);

  }
}

exports.cfn_getProductList = functions.https.onCall(async (data, context) => {
  if (!authorised(context.auth.token.email)) {
    if (Constants.DEV) console.log(e);
    throw new functions.https.HttpsError('permission-denied', 'Only admin may invoke getProductList function');
  }
  try {
    let products = [];
    const snapshot = await admin.firestore().collection(Constants.COLLECTION_NAMES.PRODUCTS)
      .orderBy('name')
      .get();
    snapshot.forEach(doc => {
      const { name, price, summary, imageName, imageURL } = doc.data();
      const p = { name, price, summary, imageName, imageURL };
      p.docId = doc.id;
      products.push(p);
    })
    return products;
  } catch (e) {
    if (Constants.DEV) console.log(e);
    throw new functions.https.HttpsError('internal', `getProductList failed: ${JSON.stringify(e)}`);

  }

});
exports.cfn_deleteProductDoc = functions.https.onCall(async (docId, context) => {
  if (!authorised(context.auth.token.email)) {
    if (Constants.DEV) console.log(e);
    throw new functions.https.HttpsError('permission-denied', 'Only admin may invoke getProductList function');
  }
  try {
    await admin.firestore().collection(Constants.COLLECTION_NAMES.PRODUCTS)
      .doc(docId).delete();
  } catch (e) {
    if (Constants.DEV) console.log(e);
    throw new functions.https.HttpsError('internal', `deleteProductDoc failed: ${JSON.stringify(e)}`);

  }
});

exports.cfn_getProductById = functions.https.onCall(async (docId, context) => {
  if (!authorised(context.auth.token.email)) {
    if (Constants.DEV) console.log(e);
    throw new functions.https.HttpsError('permission-denied', 'Only admin may invoke getProductList function');
  }
  try {
    const doc = await admin.firestore().collection(Constants.COLLECTION_NAMES.PRODUCTS)
    .doc(docId).get();
    if(doc.exists){
      const {name, summary, price, imageName, imageURL} = doc.data();
      const p = {name, summary, price, imageName, imageURL};
      p.docId = docId;
      return p;
    } else {
      return null;
    }

  }catch (e) {
    if (Constants.DEV) console.log(e);
    throw new functions.https.HttpsError('internal', `getProductByID failed: ${JSON.stringify(e)}`);


  }

});