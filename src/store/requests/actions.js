import * as Api from '@/api/requests';

export default {
  async sendMessage(context, payload) {
    const messData = {
      email: payload.email,
      message: payload.message,
    };
    const response = await Api.send(payload, { coachId: payload.coachId });
    const responseData = response.data;
    console.log('payload: ', response);

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
    const { token } = context.rootGetters;
    console.log('token: ', coachId);
    const response = await fetch(
      `https://get-your-trainer-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`,
    );
    console.log('res: ', response);
    const responseData = await response.data;

    if (response.statusText !== 200) {
      const err = new Error(responseData.message || 'Failed to fetch!');
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
