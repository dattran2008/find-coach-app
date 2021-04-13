import axios from '@/utils/axios';

export default {
  async sendMessage(context, payload) {
    const messData = {
      email: payload.email,
      message: payload.message,
    };
    const response = await axios.post(
      `/requests/${payload.coachId}.json`,
      messData,
    );
    const responseData = await response.data;

    if (response.statusText !== 'OK') {
      const err = new Error(responseData.message || 'Failed to send!');
      throw err;
    }
    messData.id = responseData.name;
    messData.coachId = payload.coachId;

    context.commit('sendMessage', messData);
  },

  async fetchMessage(context) {
    const coachId = context.rootGetters.userId;
    const response = await axios.get(`/requests/${coachId}.json`);
    const responseData = await response.data;

    if (response.statusText !== 'OK') {
      const err = new Error(responseData.message || 'Failed to send!');
      throw err;
    }

    const messages = [];
    if (responseData) {
      Object.keys(responseData).map((key) => {
        const request = {
          id: key,
          coachId,
          email: responseData[key].email,
          message: responseData[key].message,
        };
        return messages.push(request);
      });
    }

    context.commit('setMessage', messages);
    return response;
  },
};
