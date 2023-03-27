import Axios from "axios";

const uRI = "https://livraison.hoag-target.com/api";

const RouteAxios = Axios.create({
  baseURL: uRI,
});

export { RouteAxios, uRI };
