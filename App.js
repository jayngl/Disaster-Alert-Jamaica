import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import InitialScreen from './components/InitialScreen';
import UserAuthScreen from './components/UserAuthScreen';
import UserHomeScreen from './components/UserHomeScreen';
import ShelterMapScreen from './components/ShelterMapScreen';
import AlertsScreen from './components/AlertsScreen';
import ReportEmergencyScreen from './components/ReportEmergencyScreen';
import EmergencyResourcesScreen from './components/EmergencyResourcesScreen';
import { auth } from './firebaseConfig';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        {user ? (
          <>
            <Stack.Screen name="Home" component={UserHomeScreen} />
            <Stack.Screen name="ShelterMapScreen" component={ShelterMapScreen} options={{ title: 'Shelters Map' }} />
            <Stack.Screen name="AlertsScreen" component={AlertsScreen} options={{ title: 'Alerts' }} />
            <Stack.Screen name="ReportEmergencyScreen" component={ReportEmergencyScreen} options={{ title: 'Report Emergency' }} />
            <Stack.Screen name="EmergencyResourcesScreen" component={EmergencyResourcesScreen} options={{ title: 'Emergency Resources' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="InitialScreen" component={InitialScreen} options={{ title: "Disaster Alert Jamaica" }} />
            <Stack.Screen name="User" component={UserAuthScreen} options={{ title: "Disaster Alert Jamaica" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
