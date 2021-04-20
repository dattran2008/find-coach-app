import axios from 'axios';
import API_KEY from '@/api/constant';

let timer;

export default {
  async login(context, payload) {
    const data = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
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
    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.userId);
    localStorage.setItem('tokenExpiration', expirationDate);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      email: responseData.email,
      displayName: responseData.displayName,
    });
  },

  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
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
    });
  },

  logout(context) {
    localStorage.clear();

    clearTimeout(timer);

    const data = {
      userId: null,
      token: null,
      email: null,
      displayName: null,
    };
    context.commit('setUser', data);
  },

  autoLogout(context) {
    context.dispatch('logout');
  },
};
