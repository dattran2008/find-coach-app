import axios from 'axios';

export const send = (params, payload) => {
  const messData = {
    email: params.email,
    message: params.message,
  };
  return axios.post(
    `https://get-your-trainer-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
    messData,
  );
};

export const fetchMessage = () => {
  // TODO
};
