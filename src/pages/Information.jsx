import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
} from "react-native";
import Checkbox from "expo-checkbox";
import { DataTable } from "react-native-paper";
import Modal from "react-native-modal";
import MapView, { Marker } from "react-native-maps";
import { Geolocation } from "react-native";
import axios from "axios";
import data from "./data";

// Import Hook pour récupérer les colis validé
import { getInfoMap } from "../services/extras";
import { useFetchColisValidated } from "../services/hooks/use_fetch_validateColis";

const { width } = Dimensions.get("window");

export default function Information(props) {
  const [agree, setAgree] = useState(false);
  const [ModalVisible, setModalVisible] = useState(false);
  const [selectedCheckboxId, setSelectedCheckboxId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  const [data, setData] = useState([]);

  // Hook pour récupérer les colis validé
  const { dataColisValidated, isLoadingColisValidated } =
    useFetchColisValidated();

  useEffect(() => {
    if (!isLoadingColisValidated && dataColisValidated) {
      setData(dataColisValidated);
    }
  }, [isLoadingColisValidated, dataColisValidated]);

  const handleClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const clearSelectedItemId = () => {
    setSelectedItemId(null);
  };

  const handleCheckboxChange = (id) => {
    if (id === selectedCheckboxId) {
      setSelectedCheckboxId(null);
      clearSelectedItemId();
    } else {
      setSelectedCheckboxId(id);
    }
  };

  const itemsPerPage = 2;

  const items = [
    {
      key: 1,
      name: "Page 1",
    },
    {
      key: 2,
      name: "Page 2",
    },
    {
      key: 3,
      name: "Page 3",
    },
  ];

  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <View style={styles.tracking}>
        <Text style={styles.title}>Choix possible pour la course</Text>
      </View>

      <DataTable
        style={[styles.table, { width: width - 10, marginLeft: "1.5%" }]}
      >
        <DataTable.Header style={[styles.head, { flexWrap: "wrap" }]}>
          <DataTable.Title
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
                color: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Listes Colis
            </Text>
          </DataTable.Title>
        </DataTable.Header>

        {!isLoadingColisValidated && data ? (
          data.length > 0 ? (
            data.map((item) => (
              <DataTable.Row
                key={item.id}
                style={[styles.row, { flexWrap: "wrap" }]}
              >
                <DataTable.Cell
                  style={{
                    alignItems: "center",
                    width: "10%",
                    height: "100%",
                  }}
                >
                  <Checkbox
                    value={selectedCheckboxId === item.id}
                    onValueChange={() => handleCheckboxChange(item.id)}
                    color={
                      selectedCheckboxId === item.id ? "#4630EB" : undefined
                    }
                  />
                </DataTable.Cell>
                <DataTable.Cell
                  style={{
                    alignItems: "center",
                    width: "50%",
                    height: "100%",
                    marginRight: "0%",
                  }}
                >
                  colis: {item.num_commande}
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <Button
                    title="voir plus"
                    onPress={() => setSelectedItemId(item.id)}
                  />
                </DataTable.Cell>
                <Modal isVisible={selectedItemId === item.id}>
                  <View style={{ backgroundColor: "#fff", padding: 20 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      Détails de la livraison
                    </Text>
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                      <Text style={{ fontWeight: "bold", flex: 1 }}>
                        Adresse :
                      </Text>
                      <Text style={{ flex: 2 }}>
                        {JSON.parse(item.destinataire_info).adresse}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                      <Text style={{ fontWeight: "bold", flex: 1 }}>
                        Durée :
                      </Text>
                      <Text style={{ flex: 2 }}>
                        {JSON.parse(item.livraison_info).duree}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                      <Text style={{ fontWeight: "bold", flex: 1 }}>
                        Distance :
                      </Text>
                      <Text style={{ flex: 2 }}>
                        {JSON.parse(item.destinataire_info).distance} km
                      </Text>
                    </View>
                    <View style={{ height: 200 }}>
                      <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                          ...getInfoMap(
                            JSON.parse(item.destinataire_info).lien_gps
                          ),
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                      >
                        <Marker
                          coordinate={getInfoMap(
                            JSON.parse(item.destinataire_info).lien_gps
                          )}
                          title={`${
                            JSON.parse(item.destinataire_info).adresse
                          } ${JSON.parse(item.destinataire_info).ville}`}
                        />
                      </MapView>
                    </View>
                    <View style={{ marginTop: 20 }}>
                      <Button
                        title="Fermer"
                        onPress={() => setSelectedItemId(null)}
                      />
                    </View>
                  </View>
                </Modal>
              </DataTable.Row>
            ))
          ) : (
            <>
              <View
                style={{
                  marginTop: 70,

                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 200, height: 200 }}
                  source={{
                    uri: "https://sesame.iteam-s.mg/static/media/nodata.65fa7a4e1e624a5e97a4.png",
                  }}
                />
              </View>

              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Aucun colis à livrer
                </Text>
              </View>
            </>
          )
        ) : (
          <Text> Chargement en cours... </Text>
        )}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.floor(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}`}
        />
      </DataTable>
      {data.length > 0 && selectedCheckboxId && (
        <View style={[{ width: "50%", marginLeft: 90, marginTop: 20 }]}>
          <Button
            title={`Validez votre course pour le colis ${selectedCheckboxId}`}
            disabled={selectedCheckboxId === null}
            onPress={() =>
              props.navigation.navigate("Course", {
                courseId: selectedCheckboxId,
              })
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
    marginTop: -42,
  },
  tracking: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  head: {
    height: 50,
    backgroundColor: "#235A8C",
    fontWeight: "bold",
    tableLayout: "auto",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
  row: {
    height: 70,
    padding: 25,
    display: "flex",
    flexWrap: "wrap",
  },
  title1: {
    color: "white",
    fontSize: 20,
  },
  cell: {
    fontSize: 20,
  },
});
