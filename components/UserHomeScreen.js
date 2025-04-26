import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { firebaseApp } from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

const UserHomeScreen = ({ navigation }) => {
  const db = getFirestore(firebaseApp);
  const [latestAlert, setLatestAlert] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  // Card Component
  const Card = ({ title, description, imageSource, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={imageSource} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      {description && <Text style={styles.cardDescription}>{description}</Text>}
    </TouchableOpacity>
  );

  useEffect(() => {
    Notifications.requestPermissionsAsync();

    const alertsCollection = collection(db, "EmergencyAlerts");
    const latestAlertQuery = query(
      alertsCollection,
      orderBy("Issued", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(latestAlertQuery, (snapshot) => {
      if (!snapshot.empty) {
        const alertData = snapshot.docs[0].data();
        const newAlert = {
          headline: alertData.Headline || "No Title",
          issued: alertData.Issued.toDate().toLocaleString(),
          description: alertData.description || "No description provided",
          location: alertData["Location "] || "Location not specified",
        };

        if (!latestAlert || newAlert.headline !== latestAlert.headline) {
          setLatestAlert(newAlert);
          setNotificationCount(1);
          sendLocalNotification(newAlert.headline, newAlert.description);
        }
      }
    });

    return unsubscribe;
  }, [latestAlert]);

  // Send local notification
  const sendLocalNotification = (title, body) => {
    Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: null,
    });
  };

  // Handle notification press
  const handleNotificationPress = () => {
    setNotificationCount(0);
    navigation.navigate("AlertsScreen");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/alarm.png")} // Add the path to your logo image here
          style={styles.logo}
        />

        <TouchableOpacity
          onPress={handleNotificationPress}
          style={styles.notificationBell}
        >
          <Ionicons name="alert-circle-outline" size={30} color="#ff4545" />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.welcome}> Welcome to Disaster Alert Jamaica</Text>
      <View style={styles.alertSection}>
        {latestAlert ? (
          <>
            <Text style={styles.alertTitle}>⚠️ {latestAlert.headline}</Text>
            <Text style={styles.alertDetails}>
              Location: {latestAlert.location}
            </Text>
            <Text style={styles.alertDetails}>{latestAlert.description}</Text>
            <Text style={styles.alertDetails}>
              Issued: {latestAlert.issued}
            </Text>
          </>
        ) : (
          <Text style={styles.alertDetails}>Loading latest alert...</Text>
        )}
      </View>

      {/* 2x2 Grid Layout */}
      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <Card
            title="View Alerts"
            description="Check active alerts in your area"
            imageSource={require("../assets/view-alerts-icon.png")}
            onPress={() => navigation.navigate("AlertsScreen")}
          />
          <Card
            title="Nearby Shelters"
            description="Find the closest shelters to you"
            imageSource={require("../assets/shelter-icon.png")}
            onPress={() => navigation.navigate("ShelterMapScreen")}
          />
        </View>

        <View style={styles.row}>
          <Card
            title="Report Emergency"
            description="Report flooding, fires, or other emergencies"
            imageSource={require("../assets/report-icon.png")}
            onPress={() => navigation.navigate("ReportEmergencyScreen")}
          />
          <Card
            title="Emergency Resources"
            description="Access emergency contacts and safety tips"
            imageSource={require("../assets/resources-icon.png")}
            onPress={() => navigation.navigate("EmergencyResourcesScreen")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#222431",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },

  logo: {
    width: 30,
    height: 30,
  },
  notificationBell: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 4,
    minWidth: 20,

    justifyContent: "center",
    alignItems: "center",
  },
  notificationCount: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },

  welcome: {
    color: "#ffff",
    marginBottom: 10,
    fontSize: 18,
  },
  alertSection: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#ff4545",
    borderRadius: 15,
    alignItems: "center",
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffff",
  },
  alertDetails: {
    fontSize: 15,
    color: "#ffff",
  },
  gridContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 15,
  },
  card: {
    width: "48%", // Adjusted to fit two cards in one row
    padding: 20,
    backgroundColor: "#333645",
    borderRadius: 15,
    alignItems: "center",
  },
  cardImage: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffff",
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 14,
    color: "#787f9b",
    marginTop: 8,
    textAlign: "center",
  },
});
