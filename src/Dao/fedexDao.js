import fetch from "node-fetch";
import { body, options, url } from "./dataFedex.js";

export const fedexPost = async () => {
  try {
    options.body = body;
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
