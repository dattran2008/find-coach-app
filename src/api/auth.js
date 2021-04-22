import axios from 'axios';
import API_KEY from './constant';

export const login = (params) => {
  const data = {
    email: params.email,
    password: params.password,
    returnSecureToken: true,
  };
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    data,
  );
};

export const signup = (params) => {
  const data = {
    email: params.email,
    password: params.password,
    secureToken: true,
  };
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    data,
  );
};
