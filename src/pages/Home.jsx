import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";
import Modal from "react-native-modal";
import Scanner from "./Scanner";

// Import Hook pour récupérer les colis
import { useFetchColis } from "../services/hooks/use_fetch_colis";

export default function Home(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentScan, setCurrentScan] = useState(null);
  const [scannedItems, setScannedItems] = useState([]);
  const [data, setData] = useState([]);

  // Hook pour récupérer les colis
  const { dataColis, isLoadingColis, errorColis } = useFetchColis();

  useEffect(() => {
    if (!isLoadingColis && dataColis) {
      setData(dataColis);
    }
  }, [isLoadingColis, dataColis]);

  function handleScan(itemId) {
    // Ajouter l'ID de l'article scanné à l'ensemble des articles scannés
    // si le colis scanné est valide
    let copyColisScanned = [...scannedItems];
    if (copyColisScanned.includes(itemId)) {
      return;
    } else {
      copyColisScanned.push(itemId);
    }
    return setScannedItems(copyColisScanned);
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          paddingTop: 40,
        }}
      >
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.title}>Liste de livraison à faire</Text>
        </View>

        {!isLoadingColis && data ? (
          data.length > 0 ? (
            data.map((item) => (
              <View key={item.id} style={styles.item}>
                <View style={styles.itemLeft}>
                  <View
                    style={[
                      styles.square,
                      scannedItems.includes(item.id) && styles.squareScanned,
                    ]}
                  ></View>
                  <Text
                    style={[
                      styles.itemText,
                      scannedItems.includes(item.id) && styles.itemTextBold,
                    ]}
                  >
                    colis: {item.num_commande}
                  </Text>
                </View>
                {scannedItems.includes(item.id) ? (
                  <Text style={styles.scanner}>Colis {item.id} scanné</Text>
                ) : (
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      setModalVisible(true);
                      setCurrentScan(item.id);
                    }}
                  >
                    <Text style={styles.text}>
                      {isModalVisible && currentScan === item.id
                        ? "Scanning..."
                        : `Scan colis ${item.id}`}
                    </Text>
                  </Pressable>
                )}
              </View>
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
          <Text style={styles.text}>Chargement...</Text>
        )}
        <Modal isVisible={isModalVisible} size="lg">
          <View style={{ flex: 1 }}>
            <Scanner
              closeModal={() => setModalVisible(false)}
              handleScan={handleScan}
              idColis={currentScan}
            />
          </View>
        </Modal>
      </View>
      {data.length > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "50%",
            height: 50,
            borderRadius: 50,
          }}
        >
          <Button
            style={{
              color: "primary",
            }}
            id="valider"
            disabled={!(scannedItems.length === data.length)}
            title="Validez liste colis"
            onPress={() => {
              setScannedItems([]); // pour renouvéler le state si toute l'action sont faite.
              setData([]);
              props.navigation.navigate("Information");
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    width: 120,
    height: 30,
    elevation: 3,
    backgroundColor: "blue",
  },
  scanner: {
    textAlign: "center",
    paddingVertical: 8,
    backgroundColor: "green",
    width: 120,
    borderRadius: 4,
    fontSize: 12,
    lineHeight: 44,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  tracking: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
    marginTop: -42,
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#F0F0F2",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  squareScanned: {
    width: 24,
    height: 24,
    backgroundColor: "green",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
  valider: {
    width: 6,
  },
  itemTextBold: {
    color: "green",
    fontWeight: "bold",
  },
});
