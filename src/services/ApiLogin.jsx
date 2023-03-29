import { RouteAxios } from "./url";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fonction pour effectuer la requête POST
const login = (matricule, password) => {
  return RouteAxios.post("livreur/login", {
    matricule: matricule,
    password: password,
  })
    .then(async (response) => {
      const token = response.data.token;
      await AsyncStorage.setItem("token", token);
      return true;
    })
    .catch((err) => {
      return err.response.data.error;
    });
};

export default login;
