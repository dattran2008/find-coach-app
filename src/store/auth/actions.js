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
    if (status !== 200) {
      const err = new Error(response.message || 'Failed to authenticate!');
      throw err;
    }

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.userId);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
      email: responseData.email,
      displayName: responseData.displayName,
    });
  },

  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        tokenExpiration: null,
      });
    }
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
      tokenExpiration: responseData.expiresIn,
    });
  },

  logout(context) {
    localStorage.clear();

    const data = {
      userId: null,
      token: null,
      tokenExpiration: null,
      email: null,
      displayName: null,
    };
    context.commit('setUser', data);
  },
};
