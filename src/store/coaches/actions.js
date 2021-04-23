import * as Api from '@/api/coaches';

export default {
  async registerCoach(context, data) {
    const { userId } = context.rootGetters;
    const { token } = context.rootGetters;
    const coachData = {
      firstName: data.firstName,
      lastName: data.lastName,
      areas: data.type,
      hourlyRate: data.rate,
      description: data.description,
    };

    const response = await Api.register(data, { userId, token });

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
    return response;
  },

  async fetchCoaches(context, payload) {
    const { isRefresh } = payload || {};
    // caching data without load data everytime
    if (!isRefresh && !context.getters.shouldLoad) {
      return false;
    }

    const response = await Api.fetchCoaches();
    const responseData = response.data;
    const coaches = [];
    if (responseData) {
      Object.keys(responseData).map((key) => {
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
        };
        return coaches.push(coach);
      });
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimeStamp');
    return response;
  },
};
