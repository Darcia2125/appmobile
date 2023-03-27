import { RouteAxios } from "./url";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fonction pour effectuer la requête POST
const login = async (matricule, password) => {
  return RouteAxios.post("livreur/login", {
    matricule: matricule,
    password: password,
  })
    .then((response) => {
      // On récupère le token
      const token = response.data.token;
      // On stocke le token dans le AsyncStorage
      AsyncStorage.setItem("token", token);
      return true;
    })
    .catch((err) => {
      return err.response.data.error;
    });
};

export default login;
