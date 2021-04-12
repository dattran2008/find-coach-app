import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      coaches: [],
      lastFetch: '',
    };
  },
  mutations,
  actions,
  getters,
};
