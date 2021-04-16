import axios from 'axios';
import API_KEY from '@/api/constant';

export default {
  async login(context, payload) {
    const data = {
      email: payload.email,
      password: payload.password,
      secureToken: true,
    };
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      data,
    );

    const responseData = response.data;
    const status = response.status || {};
    console.log('here', response);
    if (status !== 200) {
      const err = new Error(response.message || 'Failed to authenticate!');
      throw err;
    }

    // console.log('here', response);
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpire: responseData.expiresIn,
    });
  },

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
      const err = new Error(responseData.message || 'Failed to signup!');
      throw err;
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpire: responseData.expiresIn,
    });
  },
};
