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

import {
  MarialCommunityIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import color from "./utils/colors";

//import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { enableScreens } from "react-native-screens";

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

const StackNavigator = () => (
  <DecksStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "blue" },
      headerTintColor: "white"
    }}
  >
    <DecksStack.Screen name="Decks" component={DecksDetails} />
    <DecksStack.Screen name="DeckDetail" component={Decks} />
    <DecksStack.Screen name="DecksView" component={DecksView} />
    <DecksStack.Screen name="AddNewCard" component={AddNewCard} />
    <DecksStack.Screen name="Quiz" component={Quiz} />
    <DecksStack.Screen name="DeleteDeck" component={DeleteDeck} />
  </DecksStack.Navigator>
);

const AddDeckStackNavigator = () => (
  <AddDeckStack.Navigator>
    <AddDeckStack.Screen
      name="AddNewDeck"
      component={AddNewDeck}
      options={{
        headerStyle: {
          backgroundColor: "lightskyblue"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
    />
  </AddDeckStack.Navigator>
);

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
      name="Decks"
      component={StackNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        )
      }}
    />
    <Tab.Screen
      name="Add Deck"
      component={AddDeckStackNavigator}
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

class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
    store.dispatch(handleInitialData());
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

export default App;
