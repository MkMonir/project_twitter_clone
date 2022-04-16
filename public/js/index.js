import '@babel/polyfill';

import { register } from './register';
import { signin, signout } from './signin';
import { post } from './post';
import { likeUnlikePost } from './postFeature';

const registerForm = document.getElementById('registerForm');
const signinForm = document.getElementById('signinForm');
const signoutBtn = document.getElementById('signout');
const postBtn = document.getElementById('submitPostButton');
const postLikeBtns = document.querySelectorAll('#likeButton');

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

if (postBtn)
  postBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const content = document.getElementById('postTextarea').value;
    const userId = document.querySelector('.post').dataset.user;

    post(content, userId);
  });

postLikeBtns.forEach((postLikeBtn) => {
  if (postLikeBtn)
    postLikeBtn.addEventListener('click', (e) => {
      const postId = e.target.closest('.post').dataset.postid;
      const userId = e.target.closest('.post').dataset.user;
      const likes = e.target.children[1];

      if (!postId || !userId) return;

      likeUnlikePost(postId, userId);

      likeUnlikePost(postId, userId).then((data) => {
        likes.textContent = data.data.data.likes.length || '';

        if (data.data.data.likes.some((like) => like.id === userId)) {
          postLikeBtn.classList.add('active');
        } else {
          postLikeBtn.classList.remove('active');
        }
      });
    });
});
