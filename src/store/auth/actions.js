import axios from 'axios';
import API_KEY from '@/api/constant';

export default {
  async signup(context, payload) {
    const data = {
      email: payload.email,
      password: payload.password,
      secureToken: true,
    };
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      data,
    );

    const responseData = await response.data;
    const status = response.status || {};
    if (status !== 200) {
      console.log('Res', response);
      const err = new Error(responseData.message || 'Failed to signup!');
      throw err;
    }

    console.log('here', response);
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpire: responseData.expiresIn,
    });
  },
};
