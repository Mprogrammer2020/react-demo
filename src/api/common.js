import axios from "axios";

export const setAxiosToken = token => {
  axios.defaults.headers.common["Authorization"] = token;
};

export const setAcceptLanguage = language => {
  axios.defaults.headers.common["Accept-Language"] = language || "en";
};
