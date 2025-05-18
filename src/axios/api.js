import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout:3000
});
// REQUEST INTERCEPTOR to modify payload
// api.interceptors.request.use((config) => {
//   console.log("url >>>",config.baseURL+config.url)
//   console.log("payload Before  >>>",config.data)
//   if (config.data) {
//     // Modify the payload before sending (example: trimming strings)
//     const modifiedData = { ...config.data };
//     if (modifiedData.name) {
//       modifiedData.name = modifiedData.name.trim();
//     }
//     if (modifiedData.email) {
//       modifiedData.email = modifiedData.email.toLowerCase().trim();
//     }
//   config.data = modifiedData;
//   console.log("payload After modified >>>",config.data)
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });
export default api;