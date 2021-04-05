export default {
  sendMessage(context, data) {
    const messData = {
      id: new Date().toISOString(),
      coachId: data.coachId,
      email: data.email,
      message: data.message,
    };

    context.commit('sendMessage', messData);
  },
};
