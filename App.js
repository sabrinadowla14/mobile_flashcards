import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Decks from "./components/Decks";
import DecksDetails from "./components/DecksDetails";
import AddNewCard from "./components/AddNewCard";
import AddNewDeck from "./components/AddNewDeck";
import Quiz from "./components/Quiz";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import reducer from "./reducers/index";

import {
  MarialCommunityIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import middleware from "./middleware";
import color from "./utils/colors";

import { createStore, applyMiddleware } from "redux";
import { setLocalNotification } from "./utils/helpers";
import thunk from "redux-thunk";
import { enableScreens } from "react-native-screens";
import DeleteDeck from "./components/DeleteDeck";
import DecksView from "./components/DecksView";

enableScreens();

/* create Redux Store */
//const store = createStore(reducer, middleware);
const rootReducer = (state = {}, action) => {
  return state;
};
const store = createStore(rootReducer, applyMiddleware(thunk));

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: "orange",
      activeTintColor: "white",
      inactiveBackgroundColor: "#eee",
      inactiveTintColor: "red"
    }}
  >
    <Tab.Screen
      name="Home"
      component={StackNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        )
      }}
    />
    <Tab.Screen
      name="AddDeck"
      component={AddNewDeck}
      options={{
        tabBarIcon: ({ size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            size={size}
            color={color}
          />
        )
      }}
    />
  </Tab.Navigator>
);
const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "blue" },
      headerTintColor: "white"
    }}
  >
    <Stack.Screen name="DecksView" component={DecksView} />
    <Stack.Screen name="Decks" component={Decks} options={{ title: "Deck" }} />
    <Stack.Screen name="DecksDetails" component={DecksDetails} />

    <Stack.Screen name="AddNewCard" component={AddNewCard} />
    <Stack.Screen name="AddNewDeck" component={AddNewDeck} />
    <Stack.Screen name="Quiz" component={Quiz} />
    <Stack.Screen name="DeleteDeck" component={DeleteDeck} />
  </Stack.Navigator>
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
