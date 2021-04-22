/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

export const register = (params, payload) => {
  const data = {
    firstName: params.firstName,
    lastName: params.lastName,
    areas: params.type,
    hourlyRate: params.rate,
    description: params.description,
  };

  return axios.put(
    `https://get-your-trainer-default-rtdb.firebaseio.com/coaches/${payload.userId}.json`,
    data,
  );
};

export const fetchCoaches = () =>
  axios.get(
    'https://get-your-trainer-default-rtdb.firebaseio.com/coaches.json',
  );
