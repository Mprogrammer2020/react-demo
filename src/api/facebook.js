import axios from "axios";

export const getMe = token =>
  axios(
    `https://graph.facebook.com/v3.2/me?fields=id,first_name,last_name,email&access_token=${token}`
  );
