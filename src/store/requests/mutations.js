export default {
  sendMessage(state, payload) {
    state.requests.push(payload);
  },
  setMessage(state, payload) {
    state.requests = payload;
  },
};
