import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Decks from "./components/Decks";
import DecksDetails from "./components/DecksDetails";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
//import reducer from "./reducers/index";

//import middleware from "./middleware";

import { createStore } from "redux";

/* create Redux Store */
//const store = createStore(reducer, middleware);
const rootReducer = (state = {}, action) => {
  return state;
};
const store = createStore(rootReducer);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={Decks} />
      <Tab.Screen name="DecksDetails" component={DecksDetails} />
    </Tab.Navigator>
  );
}
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Decks" component={Decks} />
    <Stack.Screen name="DecksDetails" component={DecksDetails} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
