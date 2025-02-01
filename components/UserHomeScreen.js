import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../firebaseConfig';
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

const UserHomeScreen = ({ navigation }) => {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const [latestAlert, setLatestAlert] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('InitialScreen');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const Card = ({ title, description, imageSource, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={imageSource} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      {description && <Text style={styles.cardDescription}>{description}</Text>}
    </TouchableOpacity>
  );

  useEffect(() => {
    Notifications.requestPermissionsAsync();

    const alertsCollection = collection(db, 'EmergencyAlerts');
    const latestAlertQuery = query(alertsCollection, orderBy('Issued', 'desc'), limit(1));

    const unsubscribe = onSnapshot(latestAlertQuery, (snapshot) => {
      if (!snapshot.empty) {
        const alertData = snapshot.docs[0].data();
        const newAlert = {
          headline: alertData.Headline || 'No Title',
          issued: alertData.Issued.toDate().toLocaleString(),
          description: alertData.description || 'No description provided',
          location: alertData['Location '] || 'Location not specified',
        };

        // Check if this alert is different from the last stored alert
        if (!latestAlert || newAlert.headline !== latestAlert.headline) {
          setLatestAlert(newAlert);
          setNotificationCount(1); // Set count to 1 for the latest alert only
          sendLocalNotification(newAlert.headline, newAlert.description);
        }
      }
    });

    return unsubscribe;
  }, [latestAlert]); // Depend on `latestAlert` to avoid duplicate notifications

  const sendLocalNotification = (title, body) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: null,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Disaster Alert Jamaica</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AlertsScreen')} style={styles.notificationBell}>
          <Ionicons name="alert-circle-outline" size={24} color="red" />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.alertSection}>
        {latestAlert ? (
          <>
            <Text style={styles.alertTitle}>⚠️ {latestAlert.headline}</Text>
            <Text style={styles.alertDetails}>Location: {latestAlert.location}</Text>
            <Text style={styles.alertDetails}>{latestAlert.description}</Text>
            <Text style={styles.alertDetails}>Issued: {latestAlert.issued}</Text>
          </>
        ) : (
          <Text style={styles.alertDetails}>Loading latest alert...</Text>
        )}
      </View>

      <View style={styles.cardContainer}>
        <Card
          title="View Alerts"
          description="Check active alerts in your area"
          imageSource={require('../assets/view-alerts-icon.png')}
          onPress={() => navigation.navigate('AlertsScreen')}
        />
        <Card
          title="Nearby Shelters"
          description="Find the closest shelters to you"
          imageSource={require('../assets/shelter-icon.png')}
          onPress={() => navigation.navigate('ShelterMapScreen')}
        />
        <Card
          title="Report Emergency"
          description="Report flooding, fires, or other emergencies"
          imageSource={require('../assets/report-icon.png')}
          onPress={() => navigation.navigate('ReportEmergencyScreen')}
        />
        <Card
          title="Emergency Resources"
          description="Access emergency contacts and safety tips"
          imageSource={require('../assets/resources-icon.png')}
          onPress={() => navigation.navigate('EmergencyResourcesScreen')}
        />
      </View>

      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={handleLogout} color="#FF6B6B" />
      </View>
    </ScrollView>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2F3640',
    textAlign: 'center',
  },
  notificationBell: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 4,
    minWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  alertSection: {
    width: '100%',
    padding: 15,
    marginBottom: 30,
    backgroundColor: '#FFEBEE',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#C62828',
  },
  alertDetails: {
    fontSize: 15,
    color: '#616161',
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    width: '90%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3B3B3B',
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#7B8D9E',
    marginTop: 8,
    textAlign: 'center',
  },
  logoutButtonContainer: {
    width: '90%',
    marginTop: 30,
  },
});
