import axios from 'axios';

const API_URL = 'https://livraison.hoag-target.com/api';

// Fonction pour récupérer toutes les informations du colis
const getColis = async (numColis) => {
  try {
    const response = await axios.get(`${API_URL}/colis/${numColis}`);
    console.log("informations du colis", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getColis;
