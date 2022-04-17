const Post = require('./../models/postModel');
const User = require('./../models/userModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

exports.getPosts = factory.getAll(Post);
// exports.createPost = factory.createOne(Post);

exports.createPost = catchAsync(async (req, res, next) => {
  const doc = await Post.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.likeUnlikePost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user.id;

  const likedPost = await Post.findById(postId);

  const isLiked = likedPost.likes.some((like) => like.id === userId);

  const option = isLiked ? '$pull' : '$addToSet';

  // Insert post like
  const post = await Post.findByIdAndUpdate(postId, { [option]: { likes: userId } }, { new: true });

  res.status(200).json({
    status: 'success',
    data: post,
  });
});

exports.retweetPost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user.id;

  const deletedPost = await Post.findOneAndDelete({ postBy: userId, retweetData: postId });

  const option = deletedPost !== null ? '$pull' : '$addToSet';

  let repost = deletedPost;

  if (repost === null) {
    repost = await Post.create({ postBy: userId, retweetData: postId });
  }

  // Insert post like
  const post = await Post.findByIdAndUpdate(
    postId,
    { [option]: { retweetUsers: userId } },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    data: post,
  });
});
