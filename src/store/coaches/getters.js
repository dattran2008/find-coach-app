/* eslint-disable implicit-arrow-linebreak */
export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const { coaches } = getters;
    const { userId } = rootGetters;
    return coaches.some((coach) => coach.id === userId);
  },
  shouldLoad(state) {
    const lastTime = state.lastFetch;
    const current = new Date().getTime();
    return (current - lastTime) / 1000 > 300; // greater than 5 minute -> auto update
  },
  getCoachById: (state) => (id) =>
    state.coaches.find((coach) => coach.id === id),
};
