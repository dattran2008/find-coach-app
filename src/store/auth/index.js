import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  state() {
    return {
      userId: null,
      email: null,
      displayName: null,
      token: null,
    };
  },
  getters,
  actions,
  mutations,
};
