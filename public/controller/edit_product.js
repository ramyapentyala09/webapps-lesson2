import * as CloudFunctions from '../controller/cloud_functions.js'
import * as CloudStorage from '../controller/cloud_storage.js'
import * as Util from '../viewpage/util.js'
import * as Constants from '../model/constants.js'

export async function edit_product(docId) {
    let product;
    try {
        product = await CloudFunctions.getProductById(docId);
        if(!product) {
            Util.info('getProductById error', 'No product found by id');
            return;
        }
    } catch (e) {
        if(Constants.DEV) console.log(e);
        Util.info('getProductById error', JSON.stringify(e));
        return;
        
    }
}
export async function delete_product(docId, imageName) {
    // 1. delete doc, 2. delete image
    const r = confirm('Press OK to delete');
    if (!r) return;
    try {
        await CloudFunctions.deleteProductDoc(docId);
        await CloudStorage.deleteProductImage(imageName);
        document.getElementById(`card-${docId}`).remove();
        Util.info('Deleted', `${docId} has been deleted`);
    } catch (e) {
        if (Constants.DEV) console.log(e);
        Util.info('Delete product error', JSON.stringify(e));

    }

}