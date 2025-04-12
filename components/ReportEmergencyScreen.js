// components/ReportEmergencyScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import * as Location from "expo-location";

const ReportEmergencyScreen = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [emergencyType, setEmergencyType] = useState("");
  const [details, setDetails] = useState("");
  const [isRead, setisRead] = useState(false);

  const handleReport = async () => {
    if (!name || !contact || !emergencyType) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    // Request location permission and get the current location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Location permission is required to report your location."
      );
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    const location = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    };

    try {
      await addDoc(collection(db, "emergencyReport"), {
        name,
        contact,
        emergencyType,
        details,
        location,
        timestamp: new Date(),
        isRead,
      });

      Alert.alert("Success", "Emergency reported successfully!");
      setName("");
      setContact("");
      setEmergencyType("");
      setDetails("");
      setisRead;
    } catch (error) {
      Alert.alert("Error", "Failed to report emergency: " + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Report an Emergency</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#7f8c8d"
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
        placeholderTextColor="#7f8c8d"
      />
      <TextInput
        style={styles.input}
        placeholder="Type of Emergency"
        value={emergencyType}
        onChangeText={setEmergencyType}
        placeholderTextColor="#7f8c8d"
      />
      <TextInput
        style={styles.textArea}
        placeholder="Details of the Emergency"
        value={details}
        onChangeText={setDetails}
        multiline
        numberOfLines={4}
        placeholderTextColor="#7f8c8d"
      />

      <Button title="Submit Report" onPress={handleReport} color="#D32F2F" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#222431",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffff",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    height: 50,
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#333645",
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 120,
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#333645",
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },
});

export default ReportEmergencyScreen;
