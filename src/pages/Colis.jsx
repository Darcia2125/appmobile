import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Linking,
  Pressable,
} from "react-native";

export default function Home(props) {
  const { livrerId } = props.route.params;

  return (
    <View style={styles.container}>
      <View style={styles.tracking}>
        <Text style={styles.title}>Listes des colis livrer</Text>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.square} />
            <TouchableOpacity style={styles.itemText}>
              <Text style={{ fontWeight: "bold" }}>Colis {livrerId}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Pressable style={styles.button}>
              <Text style={styles.text}>colis {livrerId} livré</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={[{ width: "50%", marginLeft: 90 }]}>
        <Button
          title="Validez fin livraisons"
          onPress={() =>
            props.navigation.navigate("Information", { infoId: id })
          }
        />
      </View>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
    marginTop: -42,
  },
  item: {
    marginTop: 30,
    backgroundColor: "#F0F0F2",
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
