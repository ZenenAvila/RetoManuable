import fetch from "node-fetch";
import { body, options, url } from "./fedexData.js";

export const fedexPost = async (credentials, quote_params) => {
  try {
    options.body = body(credentials, quote_params);
    let responseApi = await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => console.log("error", error));

    return responseApi;
  } catch (error) {
    console.log("fedexDao: " + error);
  }
};
