import * as Elements from './elements.js'
import { routePathnames } from '../controller/route.js';
import { currentUser } from '../controller/firebase_auth.js';
export function addEventListeners() {
    Elements.menuHome.addEventListener('click', () => {
        history.pushState(null, null, routePathnames.HOME);
        home_page();
    });
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