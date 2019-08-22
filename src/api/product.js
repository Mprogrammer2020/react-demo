import axios from "axios";
import config from "./endpoint.config";

const { client_id, client_secret } = config;

export const getProductAttributesById = id =>
  axios.get(`${config.erp}/productattribute/${id}`);
