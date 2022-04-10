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
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'postBy',
    select: 'username photo',
  }).populate({
    path: 'likes',
    select: 'firstName photo',
  });
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
