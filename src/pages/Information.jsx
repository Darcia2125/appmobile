import React, { useState } from "react";
import { StatusBar, Dimensions } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, Button, Linking, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';
import { DataTable } from 'react-native-paper';
import Modal from 'react-native-modal';
import MapView, { Marker } from 'react-native-maps';


const { width } = Dimensions.get('window');

export default function Information(props) {
    const [agree, setAgree] = useState(false);
    const [ModalVisible, setModalVisible] = useState(false);
    const [selectedCheckboxId, setSelectedCheckboxId] = useState(null);
    const [distance, setDistance] = useState(null);

    const handleClick = () => {
      setModalVisible(true);
    };

    const handleCloseModal = () => {
      setModalVisible(false);
    };

    const handleCheckboxChange = (id) => {
      if (id === selectedCheckboxId) {
          setSelectedCheckboxId(null);
      } else {
          setSelectedCheckboxId(id);
      }
  };
    
    const itemsPerPage = 2;

    const items = [
      {
        key: 1,
        name: 'Page 1',
      },
      {
        key: 2,
        name: 'Page 2',
      },
      {
        key: 3,
        name: 'Page 3',
      },
    ];

    const [page, setPage] = React.useState(0);
    const from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage;

    const mapRegion = {
      latitude: 48.8566,
      longitude: 2.3522,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    const markerPosition = {
      latitude: 48.8566,
      longitude: 2.3522,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  return (
    <View style={[styles.container, {flex: 1}]}>
        <View style={styles.tracking}>
            <Text style={styles.title}>Choix possible pour la course 1</Text>
        </View>

        <DataTable style={[styles.table, { width: width - 10, marginLeft:"1.5%" }]}>
            <DataTable.Header style={[styles.head, {flexWrap: 'wrap'}]}>
                <DataTable.Title ></DataTable.Title>
                <DataTable.Title ><Text style={styles.title1}>Listes Colis</Text></DataTable.Title>
            </DataTable.Header>
            <DataTable.Row style={[styles.row, {flexWrap: 'wrap'}]}>
            <DataTable.Cell style={styles.cell}>
            <Checkbox
                value={selectedCheckboxId === 1}
                onValueChange={() => handleCheckboxChange(1)}
                color={selectedCheckboxId === 1 ? "#4630EB" : undefined}
            />
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>Colis 1</DataTable.Cell>
            <DataTable.Cell style={styles.cell}><Button title="voir plus" onPress={() => {
              setModalVisible(true);}}/></DataTable.Cell>
              <Modal isVisible={ModalVisible}>
                <View style={{ backgroundColor: "#fff", padding: 20 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                    Détails de la livraison
                  </Text>
                  <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>Adresse :</Text>
                    <Text style={{ flex: 2 }}>123 Rue de la Livraison, 75001 Paris</Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>Durée :</Text>
                    <Text style={{ flex: 2 }}>30 minutes</Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>Distance :</Text>
                    <Text style={{ flex: 2 }}>22 km</Text>
                  </View>
                  <View style={{ height: 200 }}>
                    <MapView
                      style={{ flex: 1 }}
                      initialRegion={mapRegion}
                      showsUserLocation={true}
                      showsMyLocationButton={true}
                    >
                      <Marker coordinate={markerPosition} title="Adresse de la livraison" />
                    </MapView>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <Button title="Fermer" onPress={() => setModalVisible(false)} />
                  </View>
                </View>
              </Modal>

        </DataTable.Row>

            <DataTable.Row style={[styles.row, {flexWrap: 'wrap'}]}>
                <DataTable.Cell style={styles.cell}>
                <Checkbox
                    value={selectedCheckboxId === 2}
                    onValueChange={() => handleCheckboxChange(2)}
                    color={selectedCheckboxId === 2 ? "#4630EB" : undefined}
                />
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>Colis 2</DataTable.Cell>
                <DataTable.Cell style={styles.cell}><Button title="voir plus"/></DataTable.Cell>
            </DataTable.Row>


            <DataTable.Row style={[styles.row, {flexWrap: 'wrap'}]}>
                <DataTable.Cell style={styles.cell}>
                <Checkbox
                    value={selectedCheckboxId === 3}
                    onValueChange={() => handleCheckboxChange(3)}
                    color={selectedCheckboxId === 3 ? "#4630EB" : undefined}
                />
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>Colis 5</DataTable.Cell>
                <DataTable.Cell style={styles.cell}><Button title="voir plus"/></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Pagination
            page={page}
            numberOfPages={Math.floor(items.length / itemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}`}
          />
        </DataTable>

        <View style={[{ width: "50%", marginLeft: 90, marginTop: 20 }]}>
        <Button
            title={`Validez votre course ${selectedCheckboxId}`}
            disabled={selectedCheckboxId === null}
            onPress={() =>
                props.navigation.navigate("Course", { courseId: selectedCheckboxId })
            }
        />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor:'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: -42,
  },
  tracking: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  head: {
    height: 50, 
    backgroundColor: '#235A8C',
    fontWeight: 'bold',
    tableLayout: 'auto',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap'

  },
  row: {
    height: 70,
    padding: 25,
    display: 'flex',
    flexWrap: 'wrap'
  },
  title1:{
    color: 'white',
    fontSize: 20
  },
});