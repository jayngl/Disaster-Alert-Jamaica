import "react-native-get-random-values";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "./components/InitialScreen";
import UserHomeScreen from "./components/UserHomeScreen";
import ShelterMapScreen from "./components/ShelterMapScreen";
import AlertsScreen from "./components/AlertsScreen";
import ReportEmergencyScreen from "./components/ReportEmergencyScreen";
import EmergencyResourcesScreen from "./components/EmergencyResourcesScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialScreen">
        <Stack.Screen
          name="InitialScreen"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={UserHomeScreen}
          options={{
            headerStyle: {
              backgroundColor: "#333645",
              elevation: 0,
              shadowOpacity: 0,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 0,
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="ShelterMapScreen"
          component={ShelterMapScreen}
          options={{
            title: "Shelters Map",
            headerStyle: {
              backgroundColor: "#333645",
              elevation: 0,
              shadowOpacity: 0,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 0,
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="AlertsScreen"
          component={AlertsScreen}
          options={{
            title: "Alerts",
            headerStyle: {
              backgroundColor: "#333645",
              elevation: 0,
              shadowOpacity: 0,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 0,
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="ReportEmergencyScreen"
          component={ReportEmergencyScreen}
          options={{
            title: "Report Emergency",
            headerStyle: {
              backgroundColor: "#333645",
              elevation: 0,
              shadowOpacity: 0,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 0,
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="EmergencyResourcesScreen"
          component={EmergencyResourcesScreen}
          options={{
            title: "Emergency Resources",
            headerStyle: {
              backgroundColor: "#333645",
              elevation: 0,
              shadowOpacity: 0,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 0,
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
