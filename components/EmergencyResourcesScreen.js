// components/EmergencyResourcesScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

const EmergencyResourcesScreen = () => {
  const emergencyContacts = [
    { title: "Police", number: "119" },
    { title: "Fire Department", number: "112" },
    { title: "Ambulance", number: "110" },
    { title: "ODPEM ", number: "(876) 906-9674" },
    { title: "CARPIN", number: "(876) 927-1680-8" },
  ];

  const safetyTips = [
    {
      disaster: "Earthquake",
      tips: [
        "Drop, Cover, and Hold On.",
        "Stay indoors if you are in a building.",
        "If you are outside, find an open area away from buildings and trees.",
      ],
    },
    {
      disaster: "Flood",
      tips: [
        "Move to higher ground and stay there.",
        "Avoid walking or driving through floodwaters.",
        "Listen to emergency alerts and evacuate if instructed.",
      ],
    },
    {
      disaster: "Hurricane",
      tips: [
        "Have an emergency kit ready.",
        "Evacuate if advised by authorities.",
        "Stay indoors and away from windows during the storm.",
      ],
    },
  ];

  const handleContactPress = (contact) => {
    Alert.alert(`Call ${contact.title}`, `Dial ${contact.number}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Call", onPress: () => console.log(`Calling ${contact.number}`) },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Emergency Resources</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        {emergencyContacts.map((contact, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactButton}
            onPress={() => handleContactPress(contact)}
          >
            <Text style={styles.contactText}>
              {contact.title}: {contact.number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Safety Tips</Text>
        {safetyTips.map((disaster, index) => (
          <View key={index} style={styles.tipsContainer}>
            <Text style={styles.disasterTitle}>{disaster.disaster}</Text>
            {disaster.tips.map((tip, tipIndex) => (
              <Text key={tipIndex} style={styles.tipText}>
                - {tip}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#222431",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
    color: "#ffff",
  },
  section: {
    marginBottom: 30,
    backgroundColor: "#333645",
    padding: 18,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 15,
    color: "#D32F2F",
  },
  contactButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  contactText: {
    fontSize: 18,
    color: "#ffff",
  },
  tipsContainer: {
    marginBottom: 20,
  },
  disasterTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3498DB",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 16,
    color: "#ffff",
  },
});

export default EmergencyResourcesScreen;
