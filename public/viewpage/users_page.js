import * as Elements from './elements.js'
import { routePathnames } from '../controller/route.js';
import * as Util from './util.js'
import { currentUser } from '../controller/firebase_auth.js';
import * as CloudFunctions from '../controller/cloud_functions.js'
import * as Constants from '../model/constants.js'


export function addEventListeners() {
    Elements.menuUsers.addEventListener('click', async () => {
        history.pushState(null, null, routePathnames.USERS);
        const label = Util.disableButton(Elements.menuUsers);
        await users_page();
        Util.enableButton(Elements.menuUsers, label);

        
    });
}

export async function users_page() {
    if (!currentUser) {
        Elements.root.innerHTML = '<h1>Protected Page</h1>'
        return;
    }
    let html = `
    <h1>Welcome to User Management Page</h1>
    `;
    let userList;
    try {
userList = await CloudFunctions.getUserList();
    } catch (e) {
if (Constants.DEV) console.log(e);
Util.info('Failed to get user list', JSON.stringify(e));
return;
    }
    html += `
  <table class="table table-striped">
  <thead>
      <tr>
      <th scope="col">Email</th>
      <th scope="col">Status</th>
      <th scope="col">Actions</th>
    
    </tr>
  </thead>
  <tbody>
    `;

    userList.forEach(user => {
        html += buildUserRow(user);
    });
    Elements.root.innerHTML = html;
    const manageForms = document.getElementsByClassName('form-manage-users');
    for (let i = 0; i < manageForms.length; i++) {
        manageForms[i].addEventListener('submit', async e => {
            e.preventDefault();
            const submitter = e.target.submitter;
            const buttons = e.target.getElementsByTagName('button');
            if (submitter == 'TOGGLE') {
const label = Util.disableButton(buttons[0]);
await toggleDisableUser(e.target);
Util.enableButton(buttons[0], label);
            } else if (submitter == 'DELETE') {
    const label = Util.disableButton(buttons[1]);
await deleteUser(e.target);
Util.enableButton(buttons[0], label);

            } else {
                if (Constants.DEV) console.log(e);
            }

            })
        
    }
}
async function toggleDisableUser(form) {
await Util.sleep(1000);
}
async function deleteUser(form) {
await Util.sleep(1000);
}
function buildUserRow(user) {
    return `
    <tr>
    <td>${user.email}</td>
    <td>${user.disables ? 'Disabled' : 'Active'}</td>
    <td>
    <form class="form-manage-users" method="post">
    <input type="hidden" name="uid" value="${user.uid}">
    <input type="hidden" name="disabled" value="${user.disabled}">
    <button type="submit" class="btn btn-outline-primary"
    onClick="this.form.submitter='TOGGLE'">Toggle Active</button>
    <button type="submit" class="btn btn-outline-danger"
    onClick="this.form.submitter='DELETE'">Delete</button>

    
    </form>
    </td>
    </tr>
    
    `;
}