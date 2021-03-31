import { createStore } from 'vuex';

import coachesModule from './coaches/index';

export default createStore({
  modules: {
    coaches: coachesModule,
  },
});
