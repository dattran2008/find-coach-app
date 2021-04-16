import axios from 'axios';

// let localData;
// let token;
// if (localStorage.getItem('data') === null) {
//   token = 'null';
// } else {
//   localData = JSON.parse(localStorage.getItem('data'));
//   token = localData.token;
// }

const instance = axios.create({
  baseURL: 'https://get-your-trainer-default-rtdb.firebaseio.com',
  timeout: 5000,
});

instance.defaults.headers['Content-Type'] = 'application/json';
// instance.defaults.headers.common.Authorization = `Bearer ${token}`;
// instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// instance.interceptors.request.use(
//   (request) => {
//     console.log(request, 'here');
//     const newReq = {
//       ...request,
//       headers: {
//         ...request.headers,
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     return newReq;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   },
// );

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   },
// );

export default instance;
