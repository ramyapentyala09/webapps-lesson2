import * as Elements from './elements.js'
import { routePathnames } from '../controller/route.js';
import { currentUser } from '../controller/firebase_auth.js';

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
function addNewProduct(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const summary = e.target.summary.value;
}