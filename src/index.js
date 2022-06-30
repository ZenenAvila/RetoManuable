//import { fedex } from "./Routes/fedexRoutes.js";
import { RatesFedex } from "./Class/fedexClass.js";

// const fedexs = async () => {
//   try {
//     class Rate {
//       constructor() {
//         this.nombre = "zenen";
//       }
//       get(Hola) {
//         console.log("get " + Hola);
//       }
//     }
//   } catch (error) {
//     console.log("index: " + error);
//   }
// };

// fedexs.Rate.get("hola");
// fedex.get();

// const fedexs = async () => {
//   try {
//     ra
//   } catch (error) {
//     console.log("fedex: " + error);
//   }
// };
export const fedex = {
  Rates: new RatesFedex(),
};

// const credentials = {
//   key: "bkjIgUhxdghtLw9L",
//   password: "6p8oOccHmDwuJZCyJs44wQ0Iw",
// };
// const quote_params = {
//   address_from: {
//     zip: "64000",
//     country: "MX",
//   },
//   address_to: {
//     zip: "64000",
//     country: "MX",
//   },
//   parcel: {
//     length: 25.0,
//     width: 28.0,
//     height: 46.0,
//     distance_unit: "cm",
//     weigth: 6.5,
//     mass_unit: "kg",
//   },
// };
// let rates = await fedex.Rates.get(credentials, quote_params);
// console.log(rates);
