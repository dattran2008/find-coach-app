import axios from '@/utils/axios';

export default {
  async registerCoach(context, data) {
    const { userId } = context.rootGetters;
    const coachData = {
      firstName: data.firstName,
      lastName: data.lastName,
      areas: data.type,
      hourlyRate: data.rate,
      description: data.description,
    };
    const response = await fetch(
      `https://get-your-trainer-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      },
    );

    // const response = await axios.post(`/${userId}.json`, coachData);

    if (!response.ok) {
      // TODO
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },

  async fetchCoaches(context, payload) {
    const { isRefresh } = payload || {};
    // caching data without load data everytime
    if (!isRefresh && !context.getters.shouldLoad) {
      return false;
    }

    const response = await axios.get('/coaches.json');
    const responseData = await response.data;
    if (response.statusText !== 'OK') {
      const err = new Error(responseData.message || 'Failed to fetch!');
      throw err;
    }

    const coaches = [];
    Object.keys(responseData).map((key) => {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].desc,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      return coaches.push(coach);
    });

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimeStamp');
    return response;
  },
};
