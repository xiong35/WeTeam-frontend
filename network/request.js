import axios from "axios";
import { MY_BASE_URL } from "~/assets/data";

export function request(config) {
  const instance = axios.create({
    baseURL: MY_BASE_URL,
    timeout: 5000,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {}
  );

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (err) => {}
  );

  // return a Promise
  return instance(config);
}
