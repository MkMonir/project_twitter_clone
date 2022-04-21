import axios from 'axios';
import { showAlert } from './alerts';

export const likeUnlikePost = async (postId, userId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:5000/api/v1/posts/${postId}/like`,
      userId,
    });

    return res;
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const retweetPost = async (postId, userId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:5000/api/v1/posts/${postId}/retweet`,
      userId,
    });

    return res;
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
