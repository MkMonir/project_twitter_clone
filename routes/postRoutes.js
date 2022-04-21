const express = require('express');
const postController = require('./../controllers/postController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.patch('/:id/like', postController.likeUnlikePost);
router.post('/:id/retweet', postController.retweetPost);

router.route('/').get(postController.getPosts).post(postController.createPost);

module.exports = router;
