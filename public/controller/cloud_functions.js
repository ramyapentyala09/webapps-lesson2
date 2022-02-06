import {
    getFunctions, httpsCallable, connectFunctionsEmulator,
 } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-functions.js"

const functions = getFunctions();

//setup for emulator
const hostname = window.location.hostname;
if (hostname == 'localhost' || hostname == '127.0.0.1'){
    connectFunctionsEmulator(functions, hostname, 5001);
}

const cfn_addProduct = httpsCallable(functions, 'cfn_addProduct');
export async function addProduct(product){
    await cfn_addProduct(product);
}