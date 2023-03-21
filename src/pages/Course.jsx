import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function Course(props) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
      (async () => {
        const  cameraStatus  = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
        const  galleryStatus  = await   ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
  })();
    }, []);
  const takePicture = async () => {
      if(camera){
        const data = await camera.takePictureAsync(null);
        //console.log(data.uri)
        setImage(data.uri)
        alert('Photo prise avec succès !');
      }
    }
  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Image,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
  });
  console.log(result);
  if (!result.cancelled) {
        setImage(result.uri);
      }
  };
  if (hasCameraPermission === null || hasGalleryPermission === false) {
      return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
      return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
        
        <View style={styles.tracking}>
            <Text style={styles.title}>Fin de la course</Text>
        </View>

        <View style={styles.image}>
          <Camera 
            ref={ref => setCamera(ref)} 
            style={styles.camera} 
            type={type} 
            ratio={'1:1'} 
          />
        </View>

        <View style={styles.infoContainer}>
            <Text style={styles.name}>Colis 1</Text>
            <View style={[{ margin: 30 }]}>
              <View style={[{ marginBottom: 10 }]}>
                <Button
                  title="Prendre photo colis"
                  mode="contained"
                  icon="camera"
                  onPress={() => takePicture()}
                />
                  
              </View>
              <View style={[{ marginBottom: 10 }]}>
                <Button
                  title="Prendre photo lieu ou adresse"
                  mode="contained"
                  icon="map-marker"
                  onPress={() => takePicture()}
                />
              </View>
            </View>
            
            <View style={[{ width: "50%", marginLeft: 90 }]}>
            <Button
                mode="contained"
                title="Validez fin Course 1"
                onPress={() =>
                props.navigation.navigate("Colis")}
            />
            </View>
        </View>
    </View>
  );
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
  image: {
    height: 250,
    width: '100%',
    marginLeft: 75,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    flex: 1,
  },
});