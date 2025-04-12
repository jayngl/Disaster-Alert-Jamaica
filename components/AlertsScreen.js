// components/ViewAlertsScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { firebaseApp } from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const ViewAlertsScreen = () => {
  const db = getFirestore(firebaseApp);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const alertsCollection = collection(db, "EmergencyAlerts");
    const alertsQuery = query(alertsCollection, orderBy("Issued", "desc"));

    const unsubscribe = onSnapshot(alertsQuery, (snapshot) => {
      const fetchedAlerts = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.Headline || "No Title",
          description: data.description || "No description provided",
          location: data["Location "] || "Location not specified",
          date: data.Issued
            ? data.Issued.toDate().toLocaleString()
            : "Date not available",
        };
      });
      setAlerts(fetchedAlerts);
    });

    return () => unsubscribe();
  }, []);

  const renderAlertItem = ({ item }) => (
    <TouchableOpacity
      style={styles.alertItem}
      onPress={() => Alert.alert(item.title, item.description)}
    >
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertDate}>{item.date}</Text>
      <Text style={styles.alertDescription}>{item.description}</Text>
      <Text style={styles.alertLocation}>Location: {item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Alerts</Text>
      <FlatList
        data={alerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default ViewAlertsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#222431",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
    color: "#ffff",
  },
  listContainer: {
    paddingBottom: 20,
  },
  alertItem: {
    backgroundColor: "#333645",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#D32F2F",
    marginBottom: 8,
  },
  alertDate: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 8,
  },
  alertDescription: {
    fontSize: 16,
    color: "#ffff",
    marginBottom: 10,
  },
  alertLocation: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "500",
  },
});
