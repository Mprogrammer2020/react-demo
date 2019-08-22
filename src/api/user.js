import axios from "axios";
import config from "./endpoint.config";

const { client_id, client_secret } = config;

export const signUp = data =>
  axios.post(`${config.oauth}/v1/register`, {
    customer_info: data,
    client_id,
    client_secret
  });

export const fbSignUp = (data, facebook_token) =>
  axios.post(`${config.oauth}/v1/register`, {
    customer_info: data,
    facebook_token,
    client_id,
    client_secret
  });

export const googleSignUp = (data, google_token) =>
  axios.post(`${config.oauth}/v1/register`, {
    customer_info: data,
    google_token,
    client_id,
    client_secret
  });

export const signIn = (email, password) =>
  axios.post(`${config.oauth}/auth`, {
    grant_type: "password",
    client_id,
    client_secret,
    username: email,
    password: password
  });

export const refreshToken = token =>
  axios.post(`${config.oauth}/v1/refreshtoken`, {
    client_id,
    client_secret,
    access_token: token
  });

  export const getProductAll = offset =>
  axios.get("https://api.taradtoryoddev.com/erp/v1/products?limit=1", { 
    
  })

  export const searchProduct = (serachkeyWo) =>
  axios.post(`${config.oauth}/v1/register`, {
    serachkeyWord
  });


  
