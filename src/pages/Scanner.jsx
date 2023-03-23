import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, Button, Linking, ToastAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function Scanner(props) {
  const [hasPermission, setHasPermission] = useState(null);
  //const [permission, requestPermission] = Camera.useCameraPermissions();
  const  [permissionResponse, requestPermission] =  MediaLibrary.usePermissions();
  const [camera, setCamera] =useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if(permissionResponse === null){
    requestPermission();
  }

  const takePicture = async () => {
    if(camera){
      const data = await camera.takePictureAsync();
      props.setSrcImg(data.uri)
      await MediaLibrary.saveToLibraryAsync(data.uri);
      if (data.uri) {
       ToastAndroid.show(
          `Image télecharger dans la galérie.`,
          ToastAndroid.SHORT
       );
    }
      props.closeModal();
    }
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    ToastAndroid.show("Produit scanné et va être ensuite photographié, veuillez vous positionner et la photo se fera apres 3s", ToastAndroid.LONG);
    setTimeout(() => {
     takePicture();
    }, 4000)
  };

  const handleCancelScan = () => {
    props.closeModal();
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
      <View style={styles.container}>
          {/*<BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
    />*/}
          <Camera ref={ref => setCamera(ref)} 
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
            }}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[StyleSheet.absoluteFillObject, {flex: 1, aspectRatio: 1}]} type={CameraType.back} ratio={'1:1'} />
        <View style={styles.cancelButtonContainer}>
          <Button
              id="annuler"
              title="Annuler le scan"
              onPress={handleCancelScan}
            />
        </View>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tracking: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: -42,
  },
  item: {
    marginTop: 30,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',

  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  valider: {
    width: 6,
  },
});