const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    postBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    pinned: Boolean,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
