import axios from 'axios';
import { showAlert } from './alerts';

export const likeUnlikePost = async (postId, userId) => {
  try {
    // const url =
    //   type === 'password'
    //     ? 'http://127.0.0.1:5000/api/v1/users/updateMyPassword'
    //     : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:5000/api/v1/posts/${postId}/like`,
      userId,
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
