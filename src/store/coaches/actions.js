/* eslint-disable no-restricted-syntax */
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

    if (!response.ok) {
      // TODO
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },

  async fetchCoaches(context) {
    const response = await fetch(
      'https://get-your-trainer-default-rtdb.firebaseio.com/coaches.json',
    );

    const responseData = await response.json();
    if (!response.ok) {
      const err = new Error(responseData.message || 'Failed to fetch!');
      throw err;
    }

    const coaches = [];
    // eslint-disable-next-line guard-for-in
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].desc,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
  },
};
