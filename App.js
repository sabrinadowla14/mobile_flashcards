import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Decks from "./components/Decks";
import DecksDetails from "./components/Decks";
import AddNewCard from "./components/AddNewCard";
import AddNewDeck from "./components/AddNewDeck";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import reducer from "./reducers/index";

import middleware from "./middleware";

import { createStore, applyMiddleware } from "redux";
import { setLocalNotification } from "./utils/helpers";
import thunk from "redux-thunk";
import { enableScreens } from "react-native-screens";

enableScreens();

/* create Redux Store */
//const store = createStore(reducer, middleware);
const rootReducer = (state = {}, action) => {
  return state;
};
const store = createStore(rootReducer, applyMiddleware(thunk));

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={Decks} />
      <Tab.Screen name="DecksDetails" component={DecksDetails} />
      <Tab.Screen name="AddNewCard" component={AddNewCard} />
      <Tab.Screen name="AddNewDeck" component={AddNewDeck} />
    </Tab.Navigator>
  );
}
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Decks" component={Decks} />
    <Stack.Screen name="DecksDetails" component={DecksDetails} />
    <Stack.Screen name="AddNewCard" component={AddNewCard} />
    <Stack.Screen name="AddNewDeck" component={AddNewDeck} />
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
            <StackNavigator />
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
