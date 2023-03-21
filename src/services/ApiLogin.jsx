import axios from 'axios';

const API_URL = 'https://livraison.hoag-target.com/api/livreur/login';

// Fonction pour effectuer la requête POST
const login = async (matricule, password) => {
  // try {
  //   const response = await axios.post(API_URL, {
  //     matricule: matricule,
  //     password: password
  //   });
  //   console.log("token", response.data.token)
  //   // Récupérer le token dans la réponse
  //   const token = response.data.token;
  //   return token;
  // } catch (error) {
  //   console.error(error);
  //   return null;
  // }

  return axios.post(API_URL, {
        matricule: matricule,
        password: password
      });
}

export default login;
