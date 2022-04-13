import '@babel/polyfill';

import { register } from './register';
import { signin, signout } from './signin';

const registerForm = document.querySelector('#registerForm');
const signinForm = document.querySelector('#signinForm');
const signoutBtn = document.querySelector('#signout');

if (registerForm)
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    register(firstName, lastName, username, email, password, passwordConfirm);
  });

if (signinForm)
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signin(email, password);
  });

if (signoutBtn)
  signoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signout();
  });
