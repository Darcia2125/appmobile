import { RouteAxios } from "../url";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useFetchColisValidated() {
  const [dataColisValidated, setDataColisValidated] = useState();
  const [isLoadingColisValidated, setIsLoadingColisValidated] = useState(false);
  const [errorColisValidated, setErrorColisValidated] = useState(false);

  useEffect(() => {
    async function FetchColisValidated() {
      setIsLoadingColisValidated(true);
      try {
        const response = await RouteAxios.get(`/colis/livreur/validated`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        });
        setDataColisValidated(response.data);
        setIsLoadingColisValidated(false);
      } catch (e) {
        setErrorColisValidated(true);
        console.error(e);
      } finally {
        setIsLoadingColisValidated(false);
      }
    }
    FetchColisValidated();
  }, []);
  return {
    dataColisValidated,
    isLoadingColisValidated,
    errorColisValidated,
  };
}
