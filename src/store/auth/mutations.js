export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.tokenExpire = payload.tokenExpire;
    state.email = payload.email;
    state.displayName = payload.displayName;
  },
};
