import * as Elements from './elements.js'
import { routePathnames } from '../controller/route.js';
import { currentUser } from '../controller/firebase_auth.js';
import { Product } from '../model/product.js';
import * as CloudFunctions from '../controller/cloud_functions.js'
import * as Util from './util.js'
import * as Constants from '../model/constants.js'


let imageFile2Upload = null;

export function addEventListeners() {
    Elements.menuHome.addEventListener('click', () => {
        history.pushState(null, null, routePathnames.HOME);
        home_page();
    });
    Elements.formAddProduct.imageButton.addEventListener('change', e => {
        imageFile2Upload = e.target.files[0];
        if (!imageFile2Upload) {
            Elements.formAddProduct.imageTag.removeAttribute('src');
            return;
            
        }
        const reader = new FileReader();
        reader.readAsDataURL(imageFile2Upload);
        reader.onload = () => Elements.formAddProduct.imageTag.src = reader.result;
    });
    Elements.formAddProduct.form.addEventListener('submit', addNewProduct);
}

export function home_page() {
    if (!currentUser) {
        Elements.root.innerHTML = '<h1>Protected Page</h1>'
        return;
    }
    let html = `
    <div>
    <button class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#modal-add-product">
    +Add Product
    </button>
    </div>
    `;

    Elements.root.innerHTML = html;
}
async function addNewProduct(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const summary = e.target.summary.value;

    const product = new Product({name, price, summary});

    try {
        //upload the product image => imageName, imageURL
        product.imageName = 'n/a';
        product.imageURL = 'n/a';
        await CloudFunctions.addProduct(product.toFirestore());
        Util.info('Sucsess!', `${product.name} added!`, Elements.modalAddProduct);

    }catch (e){
        if(Constants.DEV) console.log(e);
        Util.info('Add product failed', `${e.code}: ${e.name} - ${e.message}`)
        

    }
}