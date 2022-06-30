import { DOMParser } from "@xmldom/xmldom";
import { fedexPost } from "../Dao/fedexDao.js";

export const paramsUser = async () => {
  try {
    const result = await fedexPost();
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(result, "text/xml");
    let services = xmlDoc.getElementsByTagName("RateReplyDetails");
    for (let i = 3; i < services.length; i++) {
      let token =
        services[i].getElementsByTagName("ServiceType")[0].childNodes[0].data;
      console.log(token);
      let price = services[i]
        .getElementsByTagName("RatedShipmentDetails")[0]
        .getElementsByTagName("ShipmentRateDetail")[0]
        .getElementsByTagName("TotalNetChargeWithDutiesAndTaxes")[0].lastChild
        .childNodes[0].data;
      console.log(price);
      let coin = services[i]
        .getElementsByTagName("RatedShipmentDetails")[0]
        .getElementsByTagName("ShipmentRateDetail")[0]
        .getElementsByTagName("TotalNetChargeWithDutiesAndTaxes")[0].firstChild
        .childNodes[0].data;
      console.log(coin);
    }
  } catch (error) {
    console.log("fedexController: " + error);
  }
};
