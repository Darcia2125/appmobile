import { Camera, CameraType } from "expo-camera";
import React, { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import { BarCodeScanner } from "expo-barcode-scanner";
import { View, Text, StyleSheet, Button, ToastAndroid } from "react-native";

import { verifiedQrCode, updateColis } from "../services/ApiColis";

export default function Scanner(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [camera, setCamera] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (permissionResponse === null) {
    requestPermission();
  }

  const takePicture = async () => {
    if (camera) {
      await MediaLibrary.saveToLibraryAsync(data.uri);
      const data = await camera.takePictureAsync();
      if (data.uri) {
        ToastAndroid.show(
          `Image télecharger dans la galérie.`,
          ToastAndroid.SHORT
        );
        props.handleScan(props.idColis);
      }
      props.closeModal();
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    if (parseInt(data.split("_")[0]) !== props.idColis) {
      ToastAndroid.show(
        "Code Qr et information du colis ne correspondent pas",
        ToastAndroid.LONG
      );
      setScanned(false);
      return;
    }

    await verifiedQrCode(data).then((res) => {
      if (res) {
        ToastAndroid.show(
          "Le code scanné est valide, veuillez patienter",
          ToastAndroid.LONG
        );

        // setTimeout(() => {
        //   takePicture();
        // }, 4000);

        updateColis(props.idColis, { valide_qr: "Y" })
          .then((res) => {
            props.handleScan(props.idColis);
            props.closeModal();
          })
          .catch((err) => {
            ToastAndroid.show(
              "Erreur lors de la mise à jour du colis",
              ToastAndroid.LONG
            );
          });
        setScanned(false);
      } else {
        ToastAndroid.show(
          "Colis n'existe pas ou déjà scanné",
          ToastAndroid.LONG
        );
        setScanned(false);
      }
    });
  };

  const handleCancelScan = () => {
    props.closeModal();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => setCamera(ref)}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, { flex: 1, aspectRatio: 1 }]}
        type={CameraType.back}
        ratio={"1:1"}
      />
      <View style={styles.cancelButtonContainer}>
        <Button
          id="annuler"
          title="Annuler le scan"
          onPress={handleCancelScan}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tracking: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
    marginTop: -42,
  },
  item: {
    marginTop: 30,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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
});
