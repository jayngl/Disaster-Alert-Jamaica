// components/InitialScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import alarmImage from '../assets/alarm.png'; 

const InitialScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'User' }],
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={alarmImage} 
        style={styles.icon}
      />
      <Text style={styles.appName}>Disaster Alert Jamaica</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    width: 100,  
    height: 100, 
    resizeMode: 'contain', 
    marginBottom: 20, 
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50', 
    textAlign: 'center',
  },
});

export default InitialScreen;
