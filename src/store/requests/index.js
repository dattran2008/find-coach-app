import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
  namespaced: true,
  state() {
    return {
      requests: [
        {
          id: '1',
          coachId: 'c3',
          email: 'abc@gmail.com',
          message:
            'Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;',
        },
      ],
    };
  },
  actions,
  getters,
  mutations,
};
