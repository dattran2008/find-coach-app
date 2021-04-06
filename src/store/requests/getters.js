export default {
  requests(state, _, _2, rootGetters) {
    const { requests } = state;
    const id = rootGetters.userId;
    return requests.filter((request) => request.coachId === id);
  },
};
