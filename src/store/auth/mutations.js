export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.email = payload.email;
    state.displayName = payload.displayName;
  },
  show(state, payload) {
    state.show = payload;
  },
};
