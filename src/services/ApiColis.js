import { RouteAxios } from "./url";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function verifiedQrCode(info) {
  return await RouteAxios.post(
    `/colis/verif/${info}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    }
  )
    .then((response) => {
      return response.data.exist;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function updateColis(id, data) {
  return RouteAxios.put(`/colis/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
    },
  });
}
export { verifiedQrCode, updateColis };
