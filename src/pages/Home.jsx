import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image, ToastAndroid,  Linking, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import Scanner from './Scanner';
import { BarCodeScanner } from 'expo-barcode-scanner';
import getColis from '../services/ApiColis';

export default function Home(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentScan, setCurrentScan] = useState(null);
  const [scannedItems, setScannedItems] = useState([]);

  const [colis, setColis] = useState([
    { id: "colis1", label: "1" },
    { id: "colis2", label: "2" },
    { id: "colis3", label: "3" }
  ]);



  function handleScan(itemId) {
    // Ajouter l'ID de l'article scanné à l'ensemble des articles scannés
    let copyColisScanned = [...scannedItems];
    if(copyColisScanned.includes(itemId)) {
      return;
    }else{
      copyColisScanned.push(itemId);
    }
    return setScannedItems(copyColisScanned);
  }
  return (
    <View style={styles.container}>
      <View style={styles.tracking}>
        <Text style={styles.title}>Liste de livraison à faire</Text>
        {colis.map(({ id, label }) => (
          <View key={id} style={styles.item}>
            <View style={styles.itemLeft}>
              <View style={[styles.square, scannedItems.includes(id) && styles.squareScanned]}></View>
              <Text style={[styles.itemText, scannedItems.includes(id) && styles.itemTextBold]}>colis: {label}</Text>
            </View>
            { scannedItems.includes(id) ? (
              <Text style={styles.scanner}>
                Colis { label } scanné
              </Text>
            ) : (
              <Pressable
              style={styles.button}
              onPress={() => {
                setModalVisible(true);
                setCurrentScan(id);
              }}
            >
              <Text style={styles.text}>
                {isModalVisible && currentScan === id ? "Scanning..." : `Scan colis ${label}`}
              </Text>
            </Pressable>
            )

            }
            
          </View>
        ))}
        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1 }}>
            <Scanner
              closeModal={() => setModalVisible(false)}
              handleScan={handleScan}
              idColis={currentScan}
            />
          </View>
        </Modal>
      </View>
      <View style={[{ width: "50%", marginLeft: 90 }]}>
        <Button
          id="valider"
          disabled={!(scannedItems.length === colis.length)}
          title="Validez liste colis"
          onPress={() =>{ 
            props.navigation.navigate("Information");
            //setScannedItems([]); //à activer pour renouvéler le state si toute l'action sont faite.
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: 120,
    height: 30,
    elevation: 3,
    backgroundColor: 'blue',
  },
  scanner: {
    textAlign: 'center',
    paddingVertical: 8,
    backgroundColor: 'green',
    width: 120,
    borderRadius: 4,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },  
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    backgroundColor: '#F0F0F2',
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
  squareScanned: {
    width: 24,
    height: 24,
    backgroundColor: 'green',
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
  itemTextBold: {
    color: "green",
    fontWeight: "bold",
  }
});