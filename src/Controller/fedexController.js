import { DOMParser } from "@xmldom/xmldom";
import { fedexPost } from "../Dao/fedexDao.js";

export const paramsUser = async (credentials, quote_params) => {
  try {
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
    "price": ${price * 20.19},
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
    console.log("fedexController: " + error);
  }
};
