import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
//import SafeAreaView from "react-native-safe-area-view";
import React from "react";
import { connect } from "react-redux";
import store from "./store";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Decks from "./components/Decks";
import DecksDetails from "./components/DecksDetails";
import AddNewCard from "./components/AddNewCard";
import AddNewDeck from "./components/AddNewDeck";
import DeleteDeck from "./components/DeleteDeck";
import DecksView from "./components/DecksView";
import Quiz from "./components/Quiz";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import reducer from "./reducers/index";
//import rootReducer from "./reducers/index";
import middleware from "./middleware/index";
import { clearLocalNotification, setLocalNotification } from "./utils/helpers";
import { Icon } from "react-native-elements";
import { handleInitialData } from "./actions";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  MarialCommunityIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import color from "./utils/colors";

//import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { enableScreens } from "react-native-screens";
import { white, blue, red, green, purple } from "./utils/colors";

enableScreens();

/* create Redux Store */
//const store = createStore(reducer, middleware);
/*const rootReducer = (state = {}, action) => {
  return state;
}; */
//const store = createStore(rootReducer, applyMiddleware(thunk));

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// Stack navigator
const DecksStack = createStackNavigator();
const AddDeckStack = createStackNavigator();

const Tabs = createMaterialTopTabNavigator();

const TabNav = () => (
  <Tabs.Navigator
    initialRouteName="DecksDetails"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        if (route.name === "Decks") {
          <Ionicons name="ios-bookmarks" size={size} color={color} />;
        } else if (route.name === "Add Deck") {
          <FontAwesome name="plus-square" size={size} color={color} />;
        }
      }
    })}
    tabBarOptions={{
      activeTintColor: white,
      //showIcon: true,
      style: {
        height: 50,
        backgroundColor: purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }}
  >
    <Tabs.Screen name="Decks" component={DecksDetails} />
    <Tabs.Screen name="Add Deck" component={AddNewDeck} />
  </Tabs.Navigator>
);

//const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name="Home"
      component={TabNav}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Decks"
      component={Decks}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddCard"
      component={AddNewCard}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Quiz"
      component={Quiz}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

class App extends React.Component {
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

export default App;
