import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: " https://easy-mock.com/mock/5f1fc20267b7b33927fe2bf8",
    timeout: 5000
  });

  instance.interceptors.request.use(
    config => {
      return config;
    },
    err => { }
  );

  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    err => { }
  );

  // return a Promise
  return instance(config);
}
