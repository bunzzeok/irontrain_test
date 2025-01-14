import axios, { ResponseType } from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  withCredentials: false,
});

service.interceptors.request.use(
  (config) => {
    // header setting
    return config;
  },
  (error) => {
    console.error("error");
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface requestType {
  url: string;
  method: string;
  data?: any;
  params?: any;
  responseType?: ResponseType;
}

/**
 * @param url
 * @param method
 * @param data
 * @param responseType
 */
const request = (
  url: string,
  method: string,
  data: object,
  responseType?: ResponseType
) => {
  let res: requestType = {
    url,
    method,
  };
  if (method == "get") {
    res.params = data;
  } else {
    res.data = data;
  }

  if (responseType) {
    res.responseType = responseType;
  }
  return service(res);
};

export default request;
