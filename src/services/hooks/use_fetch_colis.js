import { RouteAxios } from "../url";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useFetchColis() {
  const [dataColis, setDataColis] = useState();
  const [isLoadingColis, setIsLoadingColis] = useState(false);
  const [errorColis, setErrorColis] = useState(false);

  useEffect(() => {
    async function FetchColis() {
      setIsLoadingColis(true);
      try {
        const response = await RouteAxios.get(`/colis/livreur`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        });
        setDataColis(response.data);
        setIsLoadingColis(false);
      } catch (e) {
        setErrorColis(true);
        console.error(e);
      } finally {
        setIsLoadingColis(false);
      }
    }
    FetchColis();
  }, []);
  return {
    dataColis,
    isLoadingColis,
    errorColis,
  };
}
