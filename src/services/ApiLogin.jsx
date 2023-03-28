import { RouteAxios } from "./url";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fonction pour effectuer la requête POST
const login = async (matricule, password) => {
  return RouteAxios.post("livreur/login", {
    matricule: matricule,
    password: password,
  })
    .then((response) => {
      const token = response.data.token;
      AsyncStorage.setItem("token", token);
      return true;
    })
    .catch((err) => {
      return err.response.data.error;
    });
};

export default login;
