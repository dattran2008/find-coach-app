export default {
  registerCoach(context, data) {
    const coachData = {
      id: context.rootGetters.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.type,
    };

    context.commit('registerCoach', coachData);
  },
};
