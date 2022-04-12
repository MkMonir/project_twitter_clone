const Post = require('./../models/postModel');
const User = require('./../models/userModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

exports.getPosts = factory.getAll(Post);
exports.createPost = factory.createOne(Post);

exports.likeUnlikePost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user.id;

  const likedPost = await Post.findById(postId);

  // const isLiked =

  const option = likedPost.likes.some((like) => like.id === userId) ? '$pull' : '$addToSet';

  // Insert user like
  req.user = await User.findByIdAndUpdate(userId, { [option]: { likes: postId } }, { new: true });

  // Insert post like
  const post = await Post.findByIdAndUpdate(postId, { [option]: { likes: userId } }, { new: true });

  res.status(200).json({
    status: 'success',
    data: post,
  });
});
