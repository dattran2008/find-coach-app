import * as Api from '@/api/auth';

let timer;

export default {
  async login(context, payload) {
    const response = await Api.login(payload);

    const responseData = response.data;
    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);
    localStorage.setItem('email', responseData.email);

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
    const email = localStorage.getItem('email');
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
        email,
      });
    }
  },

  async signup(context, payload) {
    const response = await Api.signup(payload);
    const responseData = response.data;

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
