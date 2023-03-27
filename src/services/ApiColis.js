import { RouteAxios } from "./url";
const getColis = async (numColis) => {
  try {
    const response = await axios.get(`${API_URL}/colis/${numColis}`);
    console.log("informations du colis", response.data);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export { getColis };
