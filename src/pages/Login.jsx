import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import login from "../services/ApiLogin";
import { CompteContext } from "../utils/contexte/CompteContext";

export default function Login(props) {
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setIsLogged } = useContext(CompteContext);

  const handleLogin = async () => {
    setIsLoading(true);
    login(matricule, password)
      .then((response) => {
        if (response === true) {
          setIsLogged(true);
        } else {
          setIsLoading(false);
          setErrorMessage(response);
          setIsModalVisible(true);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err);
        setIsModalVisible(true);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://odoo.hoag-target.com/web/image/website/1/logo?unique=9c0a392",
        }}
        style={{ width: 175, height: 80, marginTop: -450 }}
      />
      <Text
        style={{
          marginTop: -4,
          marginBottom: 32,
          marginRight: -14,
          color: "blue",
          fontSize: 28,
        }}
      >
        e-Magnatitry
      </Text>
      <View>
        <Text style={{ color: "blue", fontSize: 18 }}>Se connecter</Text>
        <StatusBar style="auto" />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Matricule"
          placeholderTextColor="yellow"
          value={matricule}
          onChangeText={(text) => setMatricule(text)}
        />
      </View>
      <View style={styles.View2}>
        <TextInput
          style={styles.Input2}
          placeholder="Mot de passe"
          placeholderTextColor="yellow"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {errorMessage ? (
        <View style={styles.alertView}>
          <Text style={styles.alertText}>{errorMessage}</Text>
        </View>
      ) : null}
      {isLoading ? (
        <Text style={styles.loading}>Chargement...</Text>
      ) : (
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Se connecter</Text>
        </TouchableOpacity>
      )}
      <Modal visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Erreur</Text>
          <Text style={styles.modalText}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "blue",
    borderRadius: 30,
    width: "50%",
    height: 45,
    marginBottom: -62,
    marginTop: 8,

    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: "white",
  },
  View2: {
    backgroundColor: "blue",
    borderRadius: 30,
    width: "50%",
    height: 45,
    marginBottom: -402,
    marginTop: 102,

    alignItems: "center",
  },
  Input2: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: "white",
  },
  loginText: {
    color: "blue",
    fontWeight: "bold",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 475,
    marginBottom: -502,
    backgroundColor: "yellow",
  },
  alertView: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  alertText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "40%",
    marginHorizontal: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
