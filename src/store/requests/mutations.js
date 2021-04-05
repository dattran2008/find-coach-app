export default {
  sendMessage(state, payload) {
    state.requests.push(payload);
  },
};
