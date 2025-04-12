import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "../firebaseConfig";

const GOOGLE_MAPS_API_KEY = "AIzaSyDcB3yWLfGqH7ly7Xq91eJKLD-HSOrTlck";

const NearbySheltersScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [closestShelter, setClosestShelter] = useState(null);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [shelters, setShelters] = useState([]);

  const db = getFirestore(firebaseApp);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const shelterCollection = collection(db, "shelter3");
        const shelterSnapshot = await getDocs(shelterCollection);
        const shelterData = shelterSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          latitude: parseFloat(doc.data().latitude),
          longitude: parseFloat(doc.data().longitude),
        }));

        // Filter shelters outside Jamaica
        const sheltersInJamaica = shelterData.filter(
          (shelter) =>
            shelter.latitude >= 17.7 &&
            shelter.latitude <= 18.5 &&
            shelter.longitude >= -78.4 &&
            shelter.longitude <= -76.3
        );

        setShelters(sheltersInJamaica);
      } catch (error) {
        console.error("Error fetching shelters:", error);
      }
    };

    fetchShelters();

    // Request location permission
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access location was denied"
        );
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  const findClosestShelter = () => {
    if (userLocation) {
      let closest = null;
      let minDistance = Infinity;
      shelters.forEach((shelter) => {
        const distance = Math.sqrt(
          Math.pow(shelter.latitude - userLocation.latitude, 2) +
            Math.pow(shelter.longitude - userLocation.longitude, 2)
        );
        if (distance < minDistance) {
          closest = shelter;
          minDistance = distance;
        }
      });
      setClosestShelter(closest);
      setSelectedShelter(closest);
    }
  };

  const handleSearch = (data, details) => {
    console.log("Search data:", data);
    console.log("Details:", details); // Log details to check the structure

    if (details && details.geometry) {
      const { lat, lng } = details.geometry.location;
      setUserLocation({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } else {
      Alert.alert("Error", "Location details not found. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          style={styles.map}
          region={userLocation}
          showsUserLocation
          onPress={() => setSelectedShelter(null)}
        >
          {shelters.map((shelter) => (
            <Marker
              key={shelter.id}
              coordinate={{
                latitude: shelter.latitude,
                longitude: shelter.longitude,
              }}
              pinColor="red"
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>
                    {shelter.shelterAddress}
                  </Text>
                  <Text>Status: {shelter.shelterStatus}</Text>
                  <Text>Type: {shelter.shelterType}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
          {selectedShelter && (
            <MapViewDirections
              origin={userLocation}
              destination={{
                latitude: selectedShelter.latitude,
                longitude: selectedShelter.longitude,
              }}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={3}
              strokeColor="blue"
            />
          )}
        </MapView>
      )}

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search Parish"
          minLength={2}
          fetchDetails
          onPress={handleSearch}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
            components: "country:JM",
          }}
          styles={{ textInput: styles.searchInput }}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title="Find Closest Shelter"
          onPress={findClosestShelter}
          color="#34495e"
        />
        {selectedShelter && (
          <Text style={styles.shelterText}>
            Directions to {selectedShelter.shelterAddress} Shelter
          </Text>
        )}
      </View>
    </View>
  );
};

export default NearbySheltersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 10,
    width: "90%",
    alignSelf: "center",
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 20,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  shelterText: {
    fontSize: 16,
    color: "#34495e",
    marginTop: 10,
  },
  calloutContainer: {
    width: 200,
    padding: 5,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
