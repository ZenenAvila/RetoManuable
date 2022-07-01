import { DOMParser } from "@xmldom/xmldom";
import { fedexPost } from "../Dao/fedexDao.js";

export const paramsUser = async (credentials, quote_params) => {
  try {
    const check = paramsCheck(credentials, quote_params);
    if (check) {
      return check;
    }
    let jsonResult = "[";
    const result = await fedexPost(credentials, quote_params);
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(result, "text/xml");
    let services = xmlDoc.getElementsByTagName("RateReplyDetails");
    let banServices = true;
    for (let i = services.length - 1; i >= 0; i--) {
      let token =
        services[i].getElementsByTagName("ServiceType")[0].childNodes[0].data;
      let price = services[i]
        .getElementsByTagName("RatedShipmentDetails")[0]
        .getElementsByTagName("ShipmentRateDetail")[0]
        .getElementsByTagName("TotalNetChargeWithDutiesAndTaxes")[0].lastChild
        .childNodes[0].data;
      let coin = services[i]
        .getElementsByTagName("RatedShipmentDetails")[0]
        .getElementsByTagName("ShipmentRateDetail")[0]
        .getElementsByTagName("TotalNetChargeWithDutiesAndTaxes")[0].firstChild
        .childNodes[0].data;

      let name = "";
      let listName = String(token).split("_");
      for (let j = 0; j < listName.length; j++) {
        const n = listName[j];
        name += n[0] + n.slice(1).toLowerCase() + " ";
      }
      //   console.log(name);
      //   console.log(token);
      //   console.log(price);
      //   console.log(coin);

      jsonResult += `
 {
    "price": ${(price * 20.19).toFixed(2)},
    "currency": "${banServices ? "mxn" : "MXN"}",
    "service_level": {
        "name": "${name.substring(0, name.length)}",
        "token": "${token}"
    }
 }${banServices ? "," : ""}`;
      banServices = false;
      i--;
    }
    jsonResult += `
]`;
    //console.log(jsonResult);
    return jsonResult;
  } catch (error) {
    console.log("paramsUser(fedexController): " + error);
  }
};

function paramsCheck(credentials, quote_params) {
  try {
    let error = false;
    if ((credentials == null) | (quote_params == null)) {
      error = `[{"error":"Parametros vacios"}]`;
    } else if (!isString(credentials.key) | !isString(credentials.password)) {
      error = `[{"error":"(credentials) Los parametros deben ser string"}]`;
    } else if (
      (quote_params.address_from.zip.length != 5) |
      !isString(quote_params.address_from.country, 2)
    ) {
      error = `[{"error":"(const quote_params.address_from) Error de parametros"}]`;
    } else if (
      (quote_params.address_to.zip.length != 5) |
      !isString(quote_params.address_to.country, 2)
    ) {
      error = `[{"error":"(const quote_params.address_to) Error de parametros"}]`;
    } else if (
      !isNumber(quote_params.parcel.length) |
      !isNumber(quote_params.parcel.width) |
      !isNumber(quote_params.parcel.height) |
      !isString(quote_params.parcel.distance_unit) |
      !isNumber(quote_params.parcel.weigth, false) |
      !isString(quote_params.parcel.mass_unit)
    ) {
      error = `[{"error":"(const quote_params.parcel) Error de parametros"}]`;
    }
    return error;
  } catch (error) {
    console.log("paramsCheck(fedexController): " + error);
    return `[{"error":"Validacion"}]`;
  }
}

function isString(inputText, length = 0) {
  if (typeof inputText === "string" || inputText instanceof String) {
    return length != 0 ? inputText.length == length : true;
  } else {
    return false;
  }
}

function isNumber(inputText, isInteger = true) {
  if (isNaN(inputText) | isString(inputText)) {
    return false;
  } else {
    return isInteger ? Number.isInteger(inputText) : true;
  }
}
