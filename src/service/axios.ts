import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import https from "https";

const LCU_API_TOKEN = "51LFwCCW8WzDsL2TkOJCBQ";

export const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

const AxiosInstance = axios.create({});

AxiosInstance.defaults.baseURL = "https://127.0.0.1:8403";
AxiosInstance.defaults.withCredentials = true;
AxiosInstance.interceptors.request.use(
  config => {
    config.headers = {
      authorization: "Basic cmlvdDpUX3ViOE9WOXIxeld1dkdvcEFTbmtR",
      "Content-Type": "application/json"
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  res => {
    if (res.status == 200) {
      return res;
    } else {
      return res;
    }
  },
  error => {}
);

export const Get = async <T>(url: string, config?: AxiosRequestConfig) => {
  try {
    return (await AxiosInstance.get<T>(url, config)).data;
  } catch (error) {
    console.log(`Get请求 - ${url}异常：${error}`);
  }
};

export const Post = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
  try {
    return (await AxiosInstance.post<T>(url, config)).data;
  } catch (error) {
    console.log(`Post请求 - ${url}异常：${error}`);
  }
};
export const Patch = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
  try {
    return (await AxiosInstance.patch(url, data, config)).data;
  } catch (error) {
    console.log(`Patch请求 - ${url}异常：${error}`);
  }
};
export const Delete = async <T>(url: string, config?: AxiosRequestConfig) => {
  try {
    return (await AxiosInstance.delete(url, config)).data;
  } catch (error) {
    console.log(`Delete请求 - ${url}异常：${error}`);
  }
};
