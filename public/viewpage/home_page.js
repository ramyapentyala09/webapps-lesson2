import * as Elements from './elements.js'
import { routePathnames } from '../controller/route.js';

export function addEventListeners() {
    Elements.menuHome.addEventListener('click', () => {
        history.pushState(null, null, routePathnames.HOME);
        home_page();
    });
}

export function home_page() {
    Elements.root.innerHTML = '<h1>Home Page</h1>'
}