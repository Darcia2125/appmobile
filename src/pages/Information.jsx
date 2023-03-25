import React, { useState, useEffect } from "react";
import { StatusBar, Dimensions } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, Button, Linking, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';
import { DataTable } from 'react-native-paper';
import Modal from 'react-native-modal';
import MapView, { Marker } from 'react-native-maps';
import { Geolocation } from 'react-native';
import axios from 'axios';
import data from './data';


const { width } = Dimensions.get('window');

export default function Information(props) {
    const { infoId } = props.route.params;
    const [agree, setAgree] = useState(false);
    const [ModalVisible, setModalVisible] = useState(false);
    const [selectedCheckboxId, setSelectedCheckboxId] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [distance, setDistance] = useState(null);

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
    
    

    
  return (
    <View style={[styles.container, {flex: 1}]}>
        <View style={styles.tracking}>
            <Text style={styles.title}>Choix possible pour la course</Text>
        </View>
        
        <DataTable style={[styles.table, { width: width - 10, marginLeft:"1.5%" }]}>
            <DataTable.Header style={[styles.head, {flexWrap: 'wrap'}]}>
                <DataTable.Title ></DataTable.Title>
                <DataTable.Title ><Text style={styles.title1}>Listes Colis</Text></DataTable.Title>
            </DataTable.Header>

            {data.map((item) => (
              <DataTable.Row key={item.infoId} style={[styles.row, { flexWrap: 'wrap' }]}>
                <DataTable.Cell style={styles.cell}>
                  <Checkbox
                    value={selectedCheckboxId === item.id}
                    onValueChange={() => handleCheckboxChange(item.id)}
                    color={selectedCheckboxId === item.id ? '#4630EB' : undefined}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell}>{item.name}</DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <Button title="voir plus" onPress={() => setSelectedItemId(item.id)} />
                </DataTable.Cell>
                <Modal isVisible={selectedItemId === item.id}>
                  <View style={{ backgroundColor: '#fff', padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                      Détails de la livraison
                    </Text>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                      <Text style={{ fontWeight: 'bold', flex: 1 }}>Adresse :</Text>
                      <Text style={{ flex: 2 }}>{item.address}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                      <Text style={{ fontWeight: 'bold', flex: 1 }}>Durée :</Text>
                      <Text style={{ flex: 2 }}>{item.duration}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                      <Text style={{ fontWeight: 'bold', flex: 1 }}>Distance :</Text>
                      <Text style={{ flex: 2 }}>{item.distance}</Text>
                    </View>
                    <View style={{ height: 200 }}>
                      <MapView
                        style={{ flex: 1 }}
                        initialRegion={item.mapRegion}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                      >
                        <Marker coordinate={item.markerPosition} title="Adresse de la livraison" />
                      </MapView>
                    </View>
                    <View style={{ marginTop: 20 }}>
                      <Button title="Fermer" onPress={() => setSelectedItemId(null)} />
                    </View>
                  </View>
                </Modal>

              </DataTable.Row>
            ))}
           
            <DataTable.Pagination
            page={page}
            numberOfPages={Math.floor(items.length / itemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}`}
          />
        </DataTable>
    <View style={[{ width: "50%", marginLeft: 90, marginTop: 20 }]}>
        <Button
            title={`Validez votre course 1 pour le colis ${selectedCheckboxId}`}
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