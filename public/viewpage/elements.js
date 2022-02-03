export const root = document.getElementById('root');

// menu
export const menuSignout = document.getElementById('menu-signout');
export const menuHome = document.getElementById('menu-home')
export const menuUsers = document.getElementById('menu-users')
// form
export const formSignin = document.getElementById('form-signin');

// modal

export const modalInfobox = {
    modal: new bootstrap.Modal(document.getElementById('modal-infobox'), {backdrop: 'static'}),
    title: document.getElementById('modal-infobox-title'),
    body: document.getElementById('modal-infobox-body'),
}
export const modalSignin = new bootstrap.Modal(document.getElementById('modal-signin'), {backdrop: 'static'});